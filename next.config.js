/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['i.pinimg.com'],
    },
    serverRuntimeConfig: {
        // For Windows, replace 'localhost' with your local IP address.
        // For macOS/Linux, you can use '0.0.0.0' instead of the IP address.
        HOST: '192.168.1.1',
      },
}

module.exports = nextConfig
