/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd2h4n766jut7m4.cloudfront.net',
                pathname: '**',
            }
        ]
    }
};

export default nextConfig;
