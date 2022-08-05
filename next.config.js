/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "bootcamp-joeloff.s3.sa-east-1.amazonaws.com",
      "localhost",
      "bootcamp-joeloff.s3.amazonaws.com",
      "cloudflare-ipfs.com",
    ],
  },
}

module.exports = nextConfig
