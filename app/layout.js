import "./globals.css";
import Head from "next/head";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";  // Import the client-side component

export const metadata = {
  title: "MARDI HOLDING",
  description: "Construction and Development Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Preconnect and DNS-prefetch for faster resource resolution */}
        <link rel="preconnect" href="https://customer-s2m96v0a16zk0okb.cloudflarestream.com" />
        <link rel="dns-prefetch" href="https://customer-s2m96v0a16zk0okb.cloudflarestream.com" />

        {/* Preload the first video */}
        <link rel="preload" href="https://customer-s2m96v0a16zk0okb.cloudflarestream.com/12e384b7982be56ce1185fec1820fc59/manifest/video.m3u8" as="video" />

        {/* Preload essential fonts */}
        <link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/icon.ico" />
      </Head>

      <body>
        {children}
        <ServiceWorkerRegister />  {/* Register the service worker */}
      </body>
    </html>
  );
}
