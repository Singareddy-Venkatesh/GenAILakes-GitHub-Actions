import { fileURLToPath } from 'url'
import path from 'path'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const nextConfig = {
  webpack: (config) => {
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [fileURLToPath(import.meta.url)]
      },
      cacheDirectory: path.resolve(__dirname, '.next/cache'),
      compression: 'gzip',
      maxAge: 172800000
    }
    
    return config
  }
}

export default nextConfig
