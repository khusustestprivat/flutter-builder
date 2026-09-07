const https = require("https");
const fs = require("fs");

// URL RAW token.json dari GitHub
// Ganti dengan punya kamu
const CONFIG_URL = "https://raw.githubusercontent.com/Alwaysvinxz/flutter-builder/main/token.json";

let cachedConfig = null;

async function fetchConfig() {
    if (cachedConfig) return cachedConfig;

    return new Promise((resolve, reject) => {
        https.get(CONFIG_URL, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    cachedConfig = JSON.parse(data);
                    resolve(cachedConfig);
                } catch (err) {
                    reject(err);
                }
            });
        }).on("error", reject);
    });
}

// Ekspor fungsi biar dipanggil di index.js
module.exports = fetchConfig;
