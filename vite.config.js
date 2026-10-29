// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
});
