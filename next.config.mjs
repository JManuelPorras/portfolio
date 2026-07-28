/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // La optimización de imágenes de Vercel devolvía HTTP 402 en producción (cuota del
    // plan Hobby agotada), y por eso las miniaturas de Projects salían rotas: el archivo
    // original respondía 200 pero /_next/image daba 402 en cada tamaño no cacheado.
    //
    // Con presupuesto cero la salida no es pagar la cuota, es no gastarla: los assets ya
    // están pre-optimizados a WebP (1,9 MB de PNG -> 224 KB) al tamaño en que se muestran,
    // así que transformarlos en runtime no aportaba nada. Se sirven directos desde el CDN.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // El GLB es el activo caro (1,5 MB) y Vercel NO comprime .glb: su MIME
        // (model/gltf-binary) no está en la allowlist de compresión, así que los bytes en
        // el cable son el tamaño del archivo. Por defecto Next sirve public/ con
        // `max-age=0`, o sea que cada visita repetida lo volvería a descargar entero —
        // ESE es el patrón que agota el ancho de banda, no la primera carga.
        //
        // Immutable es seguro porque el nombre lleva versión: al cambiar el modelo se sube
        // a josed.v2.glb y la referencia en AvatarStage.tsx con él.
        source: "/avatar/:file(josed\\.v\\d+\\.glb)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // El resto del embed (vendor, pack de audio, manifest) NO lleva versión en el
        // nombre y se regenera al iterar. Con immutable, regenerar el pack no llegaría
        // nunca a quien ya lo visitó. Una hora de frescura más revalidación deja los
        // 304 baratos y las actualizaciones visibles el mismo día.
        source: "/avatar/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
