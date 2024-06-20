import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
        manifest: {
            id: "/?source=pwa",
            name: "Mensaplan der Uni Ulm",
            short_name: "UUlm Mensa",
            start_url: "/",
            theme_color: "#546500",
            background_color: "#fefcf4",
            icons: [
                {
                    src: "/pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "/pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
                {
                    src: "/pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable",
                },
            ]
        },
        registerType: "autoUpdate",
        devOptions: {
            enabled: true,
        }
    })],
})
