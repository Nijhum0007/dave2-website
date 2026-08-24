import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.10.238', '192.168.*', 'localhost'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://vbyirhheoapjozhxynzm.supabase.co; connect-src 'self' https://vbyirhheoapjozhxynzm.supabase.co wss://vbyirhheoapjozhxynzm.supabase.co; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
