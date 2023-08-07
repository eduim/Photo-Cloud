/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["presigned-drive-clone.s3.us-east-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "presigned-drive-clone.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
