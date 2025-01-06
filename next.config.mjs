/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname:"images.pexels.com",
            },
        ],
    },



    async redirects() {
      return [
        {
          source: '/verify',
          has: [
            {
              type: 'query',
              key: 'email',
            },
          ],
          permanent: false,
          destination: '/verify/pending',
        },
      ];
    },
  };
  
  

export default nextConfig;
