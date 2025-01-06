import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';



const isCI = env.CI === 'true' || env.NODE_ENV === 'production'; // Check for CI or production

let httpsConfig = undefined;

if (!isCI) {
    const baseFolder =
        env.APPDATA && env.APPDATA !== ''
            ? `${env.APPDATA}/ASP.NET/https`
            : `${env.HOME}/.aspnet/https`;

    const certificateName = "autod-car.client";
    const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        const result = child_process.spawnSync(
            'dotnet',
            [
                'dev-certs',
                'https',
                '--export-path',
                certFilePath,
                '--format',
                'Pem',
                '--no-password',
            ],
            { stdio: 'inherit' }
        );

        if (result.status !== 0) {
            console.warn('Could not create certificate. Defaulting to HTTP.');
        }
    }

    httpsConfig = fs.existsSync(certFilePath) && fs.existsSync(keyFilePath)
        ? {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
        : undefined;
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(';')[0]
        : 'https://localhost:5001'; // Default .NET HTTPS port

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target,
                secure: false,
                changeOrigin: true, // Helps with CORS
            },
        },
        port: 5173, // Ensure this port matches your app�s port
        https: isCI ? false : httpsConfig, // Ensure HTTPS is correctly configured
    },
}); // <-- Added closing parenthesis here
