import fs from 'node:fs';
import adapter from 'cloudflare-worker-adapter';
import { createCache } from 'cloudflare-worker-adapter/cache';
import worker from '../../main.js';

const {
    CONFIG_PATH = './config/config.json',
    TOML_PATH = './config/config.toml',
} = process.env;

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const cache = await createCache(config?.database?.type, config?.database);
console.log(`database: ${config?.database?.type} is ready`);

adapter.startServer(
    8787,
    '127.0.0.1',
    TOML_PATH,
    { DATABASE: cache },
    { server: config.server },
    worker.fetch,
);
