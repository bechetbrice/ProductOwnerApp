import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Chemins relatifs pour déploiement en sous-dossier
  
  // Optimisation des dépendances
  optimizeDeps: {
    include: ['react-window']
  },
  
  // ─────────────────────────────────────────────────────────────
  // 🚀 OPTIMISATION BUILD : Vendor Splitting
  // Sépare les dépendances volumineuses en chunks distincts
  // Objectif : Réduire le bundle initial et améliorer le chargement
  // ─────────────────────────────────────────────────────────────
  build: {
    commonjsOptions: {
      include: [/react-window/, /node_modules/]
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // React core (~150 KB)
          'react-vendor': ['react', 'react-dom'],
          
          // Charts library (~200 KB)
          'charts': ['recharts'],
          
          // Icons library (~50 KB avec tree-shaking)
          'icons': ['lucide-react'],
          
          // Drag & drop library (~50 KB)
          'dnd': ['@hello-pangea/dnd'],
          
          // Virtualisation library (~9 KB)
          'virtualization': ['react-window']
        }
      }
    },
    
    // Augmenter limite warning pour Wiki pages (lazy loaded)
    chunkSizeWarningLimit: 600
  }
})
