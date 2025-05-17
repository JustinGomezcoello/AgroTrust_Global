import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      '5811-190-9-183-30.ngrok-free.app' // ← reemplaza por tu subdominio actual
    ]
  }
});
