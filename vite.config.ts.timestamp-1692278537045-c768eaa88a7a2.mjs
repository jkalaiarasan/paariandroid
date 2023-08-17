// vite.config.ts
import vue from "file:///C:/Users/KalaiarasanJ/Desktop/Kalaiarasan/Paarai/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/KalaiarasanJ/Desktop/Kalaiarasan/Paarai/node_modules/vite/dist/node/index.js";
import legacy from "file:///C:/Users/KalaiarasanJ/Desktop/Kalaiarasan/Paarai/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import ViteHttp2Proxy from "file:///C:/Users/KalaiarasanJ/Desktop/Kalaiarasan/Paarai/node_modules/vite-plugin-http2-proxy/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\KalaiarasanJ\\Desktop\\Kalaiarasan\\Paarai";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    legacy(),
    ViteHttp2Proxy({
      // Use the HTTP2 proxy configuration
      proxy: {
        "/api": {
          target: "https://www.google.com/",
          rewrite: (url) => url.replace(/^\/api/, ""),
          headers: {},
          // Add any headers you need, or remove this line if not needed
          secure: true
          // Set to true if the target URL uses HTTPS
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    open: true
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxLYWxhaWFyYXNhbkpcXFxcRGVza3RvcFxcXFxLYWxhaWFyYXNhblxcXFxQYWFyYWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEthbGFpYXJhc2FuSlxcXFxEZXNrdG9wXFxcXEthbGFpYXJhc2FuXFxcXFBhYXJhaVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvS2FsYWlhcmFzYW5KL0Rlc2t0b3AvS2FsYWlhcmFzYW4vUGFhcmFpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5JztcbmltcG9ydCBWaXRlSHR0cDJQcm94eSBmcm9tICd2aXRlLXBsdWdpbi1odHRwMi1wcm94eSc7IC8vIEltcG9ydCB0aGUgSFRUUDIgcHJveHkgcGx1Z2luXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBsZWdhY3koKSxcbiAgICBWaXRlSHR0cDJQcm94eSh7IC8vIFVzZSB0aGUgSFRUUDIgcHJveHkgY29uZmlndXJhdGlvblxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8nLFxuICAgICAgICAgIHJld3JpdGU6ICh1cmwpID0+IHVybC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICAgIGhlYWRlcnM6IHt9LCAvLyBBZGQgYW55IGhlYWRlcnMgeW91IG5lZWQsIG9yIHJlbW92ZSB0aGlzIGxpbmUgaWYgbm90IG5lZWRlZFxuICAgICAgICAgIHNlY3VyZTogdHJ1ZSwgLy8gU2V0IHRvIHRydWUgaWYgdGhlIHRhcmdldCBVUkwgdXNlcyBIVFRQU1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsT0FBTyxTQUFTO0FBQzlWLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxvQkFBb0I7QUFKM0IsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsZUFBZTtBQUFBO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixTQUFTLENBQUMsUUFBUSxJQUFJLFFBQVEsVUFBVSxFQUFFO0FBQUEsVUFDMUMsU0FBUyxDQUFDO0FBQUE7QUFBQSxVQUNWLFFBQVE7QUFBQTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFFRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
