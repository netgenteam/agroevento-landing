import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Optimización de Imágenes ── */
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /* ── Seguridad: Ocultar header X-Powered-By ── */
  poweredByHeader: false,

  /* ── Headers de Seguridad y Cache ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        /* Cache agresivo para assets estáticos (imágenes, video, fonts) */
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|svg|mp4|woff2|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
