import "./globals.css";
import Head from "next/head";



export const metadata = {
  title: "MARDI HOLDING",
  description: "construction and development company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Head>
       <link rel="preload" href="https://customer-s2m96v0a16zk0okb.cloudflarestream.com/bf21043eaee42753a3d3bc48e222d754/manifest/video.m3u8" as="video" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      
      <body>{children}</body>
    </html>
  );
}
