import "./globals.css";
import Head from "next/head";



export const metadata = {
  title: "MARDI HOLDING",
  description: "construction and development company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       {/* <Head>
       <link rel="preload" href="/videos/video1.webm" as="video" type="video/webm" />
        <link rel="preload" href="/videos/video2.webm" as="video" type="video/webm" />
        <link rel="preload" href="/videos/video3.webm" as="video" type="video/webm" />
        <link rel="preload" href="/videos/video5.webm" as="video" type="video/webm" />
        <link rel="preload" href="/videos/video6.webm" as="video" type="video/webm" />
        <link rel="preload" href="/videos/video7.webm" as="video" type="video/webm" />
        <link rel="icon" href="/icon.ico" />
      </Head> */}
      
      <body>{children}</body>
    </html>
  );
}
