import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
};

export default withNextIntl(nextConfig);

// import type { NextConfig } from "next";
// import createNextIntlPlugin from 'next-intl/plugin';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Recreation de __dirname pour l'environnement ES Module / TypeScript
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// /** @type {import('next').NextConfig} */
// const nextConfig: NextConfig = {
//   output: "standalone",
//   outputFileTracingRoot: __dirname,
// };

// export default withNextIntl(nextConfig);
