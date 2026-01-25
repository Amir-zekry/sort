/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        useCache: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ]
    },
};

export default nextConfig;
