// @ts-check
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.principedelosparamos.org',
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        page !== 'https://www.principedelosparamos.org/acceso-denegado/' &&
        page !== 'https://www.principedelosparamos.org/admin/' &&
        page !==
          'https://www.principedelosparamos.org/admin/jurado-inscrito/' &&
        page !== 'https://www.principedelosparamos.org/admin/jurado/' &&
        page !== 'https://www.principedelosparamos.org/admin/lista-jurados/' &&
        page !== 'https://www.principedelosparamos.org/auto/proyectos/' &&
        page !== 'https://www.principedelosparamos.org/interna/' &&
        page !== 'https://www.principedelosparamos.org/login/' &&
        page !== 'https://www.principedelosparamos.org/pago-exitoso/' &&
        page !== 'https://www.principedelosparamos.org/programacion-pending/' &&
        page !== 'https://www.principedelosparamos.org/proximamente/' &&
        page !== 'https://www.principedelosparamos.org/registro-exitoso/' &&
        page !== 'https://www.principedelosparamos.org/reglamento/' &&
        page !== 'https://www.principedelosparamos.org/reglas/' &&
        page !==
          'https://www.principedelosparamos.org/reportes/calificaciones/' &&
        page !== 'https://www.principedelosparamos.org/reportes/proyectos/' &&
        page !== 'https://www.principedelosparamos.org/test/',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/postular': '/postula-gracias',
  },
})
