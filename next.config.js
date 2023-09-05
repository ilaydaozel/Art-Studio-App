/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]

  }
}

module.exports =  withNextIntl(nextConfig);
