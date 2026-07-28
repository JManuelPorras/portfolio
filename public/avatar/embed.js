import { TalkingHead } from "talkinghead";
import { LipsyncEs } from "./vendor/talkinghead/lipsync-es.mjs";
import { LipsyncEn } from "./vendor/talkinghead/lipsync-en.mjs";

/**
 * Puente entre la página React y TalkingHead. Este archivo NO decide nada de producto:
 * solo carga el avatar, reproduce el audio que le mandan y avisa palabra a palabra.
 *
 * Padre -> iframe            iframe -> padre
 *   load                       progress {pct}
 *   speak {audioUrl, words,    ready
 *          wtimes, wdurations, word {i, word}   <- acciona el karaoke
 *          lang}               ended
 *   stop                       error {message}
 */

const AVATAR_URL = "./josed.v1.glb";
const PARENT_ORIGIN = window.location.origin; // el iframe es same-origin con la página

// Encuadre. Los valores por defecto de TalkingHead están pensados para un contenedor
// apaisado; aquí el contenedor es vertical. Overridables por query para tantear.
const params = new URLSearchParams(location.search);
const num = (key, fallback) =>
  params.has(key) ? Number(params.get(key)) : fallback;
const CAM = { x: num("camX", 0.06), y: num("camY", 0.02), d: num("camD", -0.15) };

let head = null;
let loading = null;
let speakToken = 0; // invalida los eventos de una locución abortada

function send(type, payload = {}) {
  // Si se abre suelto para depurar no hay padre distinto de uno mismo; no pasa nada.
  window.parent.postMessage({ source: "avatar-embed", type, ...payload }, PARENT_ORIGIN);
}

function isMobile() {
  return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
}

// --- carga -------------------------------------------------------------------

async function load() {
  if (loading) return loading;

  loading = (async () => {
    head = new TalkingHead(document.getElementById("avatar"), {
      // Sin esto TalkingHead haría import() dinámico de módulos de lipsync remotos.
      // Los inyectamos a mano justo debajo.
      lipsyncModules: [],
      cameraView: "upper",
      // Encuadre ajustado para un contenedor vertical (3:4). Con los defaults el avatar
      // queda descentrado a la derecha y con demasiado aire encima. Se puede tantear con
      // ?camX=&camY=&camD= sobre index.html?selftest=1 y luego fijar aquí.
      cameraX: CAM.x,
      cameraY: CAM.y,
      cameraDistance: CAM.d,
      cameraRotateEnable: true,
      lightAmbientIntensity: 2,
      lightDirectIntensity: 22,
      avatarMood: "neutral",
      // En un móvil con devicePixelRatio 3 el default renderiza a 3x resolución y se
      // arrastra. TalkingHead multiplica esta opción por el devicePixelRatio real.
      modelPixelRatio: isMobile() ? 0.5 : 1,
    });

    head.lipsync["es"] = new LipsyncEs();
    head.lipsync["en"] = new LipsyncEn();

    await head.showAvatar(
      { url: AVATAR_URL, body: "M", avatarMood: "neutral", lipsyncLang: "es" },
      (ev) => {
        if (ev && ev.lengthComputable && ev.total > 0) {
          send("progress", { pct: Math.round((ev.loaded / ev.total) * 100) });
        }
      }
    );

    head.start?.();
    send("ready");
  })().catch((e) => {
    loading = null; // permite reintentar
    send("error", { message: String(e && e.message ? e.message : e) });
    throw e;
  });

  return loading;
}

// --- reproducción ------------------------------------------------------------

const audioCache = new Map();

async function fetchAudio(url) {
  if (audioCache.has(url)) return audioCache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No pude descargar el audio (${res.status})`);
  const bytes = await res.arrayBuffer();
  // decodeAudioData remuestrea al sample rate del AudioContext de TalkingHead, así que
  // un MP3 a 24 kHz suena a su tono y duración correctos aunque el contexto vaya a 48 kHz.
  const buffer = await head.audioCtx.decodeAudioData(bytes);
  audioCache.set(url, buffer);
  return buffer;
}

async function speak({ audioUrl, words, wtimes, wdurations, lang }) {
  await load();
  const token = ++speakToken;

  const audio = await fetchAudio(audioUrl);
  if (token !== speakToken) return; // llegó un stop o otra pregunta mientras descargaba

  // El AudioContext arranca suspendido hasta que hay gesto de usuario. El clic ocurre en la
  // página padre; siendo same-origin la activación se propaga (verificado en Chromium sin
  // --autoplay-policy relajada). El resume defensivo se queda porque la propagación no está
  // garantizada en todos los navegadores: si sigue suspendido lo decimos en vez de quedarnos
  // mudos sin explicación.
  if (head.audioCtx.state === "suspended") {
    try { await head.audioCtx.resume(); } catch { /* lo reportamos abajo */ }
  }
  if (head.audioCtx.state === "suspended") {
    send("error", { message: "audio-blocked" });
    return;
  }

  let i = 0;
  head.speakAudio(
    { audio, words, wtimes, wdurations },
    { lipsyncLang: lang === "en" ? "en" : "es" },
    (word) => {
      if (token !== speakToken) return;
      send("word", { i: i++, word: String(word).trim() });
    }
  );

  // TalkingHead no expone un "terminó esta locución", así que se deriva de la duración real
  // del audio decodificado (no de la estimación de timings, que puede desviarse).
  const ms = audio.duration * 1000;
  window.setTimeout(() => {
    if (token === speakToken) send("ended");
  }, ms + 120);
}

function stop() {
  speakToken++;
  try {
    head?.stopSpeaking?.();
  } catch { /* si no hay nada sonando, no hay nada que parar */ }
}

// --- mensajes ----------------------------------------------------------------

window.addEventListener("message", (ev) => {
  if (ev.origin !== PARENT_ORIGIN) return;
  const msg = ev.data;
  if (!msg || typeof msg !== "object" || msg.source !== "avatar-page") return;

  if (msg.type === "load") {
    load().catch(() => { /* ya se notificó con error */ });
  } else if (msg.type === "speak") {
    speak(msg).catch((e) =>
      send("error", { message: String(e && e.message ? e.message : e) })
    );
  } else if (msg.type === "stop") {
    stop();
  }
});

// Depuración suelta: abrir index.html?selftest=1 carga el avatar sin página padre y expone
// los internos para inspeccionarlos desde la consola. Fuera de selftest no se expone nada.
if (new URLSearchParams(location.search).has("selftest")) {
  document.body.style.background = "#0b1a2d";
  window.__avatarDebug = {
    get head() { return head; },
    get audioCache() { return audioCache; },
    fetchAudio,
  };
  load().then(() => console.log("[avatar] selftest: avatar cargado y listo"));
}

send("boot"); // le dice al padre que el iframe ya ejecuta scripts
