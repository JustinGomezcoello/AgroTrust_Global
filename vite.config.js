import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import { BACKENDURL, FRONTENDURL } from './environtment';



export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      BACKENDURL, FRONTENDURL // ← tu subdominio actual de ngrok
    ]
  }
});
