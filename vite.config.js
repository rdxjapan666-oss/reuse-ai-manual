import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import os from 'node:os'
import process from 'node:process'
import { exec } from 'node:child_process'

function getLocalIPv4() {
  const interfaces = os.networkInterfaces()

  for (const addresses of Object.values(interfaces)) {
    if (!addresses) continue
    const ipv4 = addresses.find((item) => item.family === 'IPv4' && !item.internal)
    if (ipv4) return ipv4.address
  }

  return '127.0.0.1'
}

function openBrowser(url) {
  const command =
    process.platform === 'darwin'
      ? `open "${url}"`
      : process.platform === 'win32'
        ? `start "" "${url}"`
        : `xdg-open "${url}"`

  exec(command, (error) => {
    if (error) {
      console.warn(`[open-by-local-ip] Failed to open browser: ${error.message}`)
    }
  })
}

function openWithLocalIp() {
  const run = (httpServer) => {
    if (!httpServer) return

    httpServer.once('listening', () => {
      const address = httpServer.address()
      if (!address || typeof address === 'string') return

      const host = getLocalIPv4()
      const url = `http://${host}:${address.port}/`
      openBrowser(url)
      console.log(`[open-by-local-ip] Opened ${url}`)
    })
  }

  return {
    name: 'open-with-local-ip',
    configureServer(server) {
      run(server.httpServer)
    },
    configurePreviewServer(server) {
      run(server.httpServer)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), openWithLocalIp()],
  base: './',
  server: {
    host: true,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'userAssets',
  },
  preview: {
    host: true,
    open: false,
    allowedHosts: true
  }
})
