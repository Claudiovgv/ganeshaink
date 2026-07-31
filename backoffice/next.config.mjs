/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Permite montar o backoffice sob um subpath (ex: /backoffice) quando não há
  // subdomínio próprio disponível (domínio temporário do cPanel). Em produção
  // com subdomínio dedicado (admin.ganeshaink.pt), deixar NEXT_BASE_PATH vazio.
  basePath: process.env.NEXT_BASE_PATH || undefined,
};

export default nextConfig;
