/**
* @class Spanish lip-sync processor
*
* Módulo de lipsync en español para TalkingHead, que no trae soporte del idioma.
* Las reglas fonéticas (dígrafos, seseo, sílabas) son propias; la ESTRUCTURA del módulo
* —la forma de `visemeDurations`, `preProcessText` y `wordsToVisemes`— deriva de
* lipsync-fi.mjs del proyecto TalkingHead:
*
*   Based on lipsync-fi.mjs from met4citizen/TalkingHead
*   Copyright (c) 2023-2024 Mika Suominen — MIT License
*   https://github.com/met4citizen/TalkingHead
*   Texto completo de la licencia en ATTRIBUTIONS.md
*
* Español con seseo (c/z suave → SS), pensado para voces es_ES/es_MX/es_CU.
* Set de visemas Oculus: aa, E, I, O, U, PP, FF, TH, DD, kk, CH, SS, nn, RR, sil
*/

class LipsyncEs {

  constructor() {
    // Dígrafos y contextos primero (se procesan antes que letras sueltas)
    this.rules = [
      { rx: /^ch/, viseme: 'CH', len: 2 },
      { rx: /^ll/, viseme: 'I',  len: 2 },
      { rx: /^rr/, viseme: 'RR', len: 2 },
      { rx: /^qu(?=[ei])/, viseme: 'kk', len: 2 },   // "que", "qui": u muda
      { rx: /^gu(?=[ei])/, viseme: 'kk', len: 2 },   // "gue", "gui": u muda
      { rx: /^gü/, viseme: 'kk', len: 2 },           // "güe": kk + U (la ü se procesa aparte… simplificado a kk)
      { rx: /^c(?=[eiéí])/, viseme: 'SS', len: 1 },  // ce, ci → seseo
      { rx: /^g(?=[eiéí])/, viseme: 'kk', len: 1 },  // ge, gi → jota
    ];

    // Letras sueltas a visemas
    this.visemes = {
      'a': 'aa', 'á': 'aa',
      'e': 'E',  'é': 'E',
      'i': 'I',  'í': 'I',  'y': 'I',
      'o': 'O',  'ó': 'O',
      'u': 'U',  'ú': 'U',  'ü': 'U', 'w': 'U',
      'b': 'PP', 'v': 'PP', 'm': 'PP', 'p': 'PP',
      'c': 'kk', 'k': 'kk', 'q': 'kk', 'g': 'kk', 'j': 'kk',
      'd': 'DD', 't': 'DD',
      'f': 'FF',
      'l': 'nn', 'n': 'nn', 'ñ': 'nn',
      'r': 'RR',
      's': 'SS', 'z': 'SS', 'x': 'SS',
      // 'h' es muda: no genera visema
    };

    // Duraciones relativas por visema (1 = promedio)
    this.visemeDurations = {
      'aa': 0.95, 'E': 0.90, 'I': 0.92, 'O': 0.96, 'U': 0.95, 'PP': 1.08,
      'SS': 1.23, 'DD': 1.05, 'FF': 1.00, 'kk': 1.21, 'CH': 1.15,
      'nn': 0.88, 'RR': 0.88, 'sil': 1
    };

    // Pausas relativas
    this.specialDurations = { ' ': 1, ',': 3, '-': 0.5, '.': 4, '¿': 0, '?': 4, '¡': 0, '!': 4, ';': 3, ':': 3 };

    this.units = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez',
      'once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte',
      'veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
    this.tens = ['','diez','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
    this.hundreds = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];

    this.symbols = { '%': 'por ciento', '€': 'euros', '&': 'y', '+': 'más', '$': 'dólares', '@': 'arroba', '#': 'numeral' };
    this.symbolsReg = /[%€&\+\$@#]/g;
  }

  /**
  * Convierte un número (0 a 999 999 999) a palabras en español.
  */
  numberToSpanishWords(x) {
    let n = parseInt(x, 10);
    if (isNaN(n)) return x;
    if (n === 0) return 'cero';
    if (n === 100) return 'cien';
    const below100 = (n) => {
      if (n < 30) return this.units[n];
      const t = Math.floor(n / 10), u = n % 10;
      return this.tens[t] + (u ? ' y ' + this.units[u] : '');
    };
    const below1000 = (n) => {
      if (n < 100) return below100(n);
      const h = Math.floor(n / 100), r = n % 100;
      if (n === 100) return 'cien';
      return this.hundreds[h] + (r ? ' ' + below100(r) : '');
    };
    const w = [];
    const millions = Math.floor(n / 1000000);
    const thousands = Math.floor((n % 1000000) / 1000);
    const rest = n % 1000;
    if (millions) w.push(millions === 1 ? 'un millón' : below1000(millions) + ' millones');
    if (thousands) w.push(thousands === 1 ? 'mil' : below1000(thousands) + ' mil');
    if (rest) w.push(below1000(rest));
    return w.join(' ');
  }

  /**
  * Preprocesa el texto: símbolos y números a palabras, limpia caracteres mudos.
  */
  preProcessText(s) {
    return s.replace(/[#_*'":;]/g, '')
      .replace(this.symbolsReg, (symbol) => ' ' + (this.symbols[symbol] || '') + ' ')
      .replace(/(\d)[.,](\d)/g, '$1 coma $2')
      .replace(/\d+/g, this.numberToSpanishWords.bind(this))
      .replaceAll('  ', ' ')
      .trim();
  }

  /**
  * Convierte palabras a visemas Oculus con tiempos/duraciones relativos.
  */
  wordsToVisemes(w) {
    const o = { words: w, visemes: [], times: [], durations: [] };
    let t = 0;
    const s = w.toLowerCase();
    let i = 0;

    const push = (viseme) => {
      if (o.visemes.length && o.visemes[o.visemes.length - 1] === viseme) {
        const d = 0.7 * (this.visemeDurations[viseme] || 1);
        o.durations[o.durations.length - 1] += d;
        t += d;
      } else {
        const d = this.visemeDurations[viseme] || 1;
        o.visemes.push(viseme);
        o.times.push(t);
        o.durations.push(d);
        t += d;
      }
    };

    outer:
    while (i < s.length) {
      const rest = s.slice(i);
      for (const rule of this.rules) {
        if (rule.rx.test(rest)) {
          push(rule.viseme);
          i += rule.len;
          continue outer;
        }
      }
      const ch = s[i];
      const viseme = this.visemes[ch];
      if (viseme) {
        push(viseme);
      } else {
        t += this.specialDurations[ch] || 0;
      }
      i++;
    }

    return o;
  }
}

export { LipsyncEs };
