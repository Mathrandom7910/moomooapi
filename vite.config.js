const { defineConfig } = require("vite");

module.exports = defineConfig({
    build: {
        lib: {
            entry: __dirname + "/src/main.ts",
            name: "MMAPI",
            fileName: (format) => `MooMooAPI.${format}.js`
        }
    }
});