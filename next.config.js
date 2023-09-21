/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com'
    ]
  }
}

module.exports =  nextConfig;
