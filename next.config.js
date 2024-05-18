/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", hostname: "firebasestorage.googleapis.com", pathname: "**"
            },
            {
                protocol: "https", hostname: "www.google.com", pathname: "**"
            }, {
                protocol: "https", hostname: "www.computron.com.ec", pathname: "**"
            }, {
                protocol: "https", hostname: "www.apple.com", pathname: "**"
            }, {
                protocol: "https", hostname: "media.very.co.uk", pathname: "**"
            }, {
                protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "**"
            }, {
                protocol: "https", hostname: "i.postimg.cc", pathname: "**"
            }

        ]
    }
}


module.exports = nextConfig
