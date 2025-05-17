import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      '680e-190-9-183-30.ngrok-free.app' // ← tu subdominio actual de ngrok
    ]
  }
});
