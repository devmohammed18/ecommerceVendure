import type { NextConfig } from "next";

const nextConfig: NextConfig = {


images: {
    // Domaines autorisés pour les images
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10000',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '10000',
        pathname: '/assets/**',
      },

       { protocol: 'https',
        hostname: 'images.unsplash.com'},
      // Ajoutez votre domaine de production ici
      {
        protocol: 'https',
        hostname: 'backendvendureecommerce.onrender.com',
        pathname: '/assets/**',
      },
    ],
    
    // Alternative plus permissive pour le développement (à éviter en production)
    // domains: ['localhost'],
    
    // Formats d'images supportés
    formats: ['image/webp', 'image/avif'],
    
    // Tailles d'images optimisées
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Autres configurations Next.js si nécessaire
  experimental: {
    // Fonctionnalités expérimentales si vous en utilisez
  }


};

export default nextConfig;
