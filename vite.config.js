import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: '0.0.0.0', // Esto permite que el servidor escuche en todas las direcciones IP, incluyendo las de la red local
    port: 5173,      // Puedes cambiar el puerto si lo necesitas
  },
})
