/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["presigned-drive-clone.s3.us-east-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
