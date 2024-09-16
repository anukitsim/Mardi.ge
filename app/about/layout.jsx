import "../globals.css";
import Head from "next/head";

export const metadata = {
  title: "About Us",
  description: "About MARDI HOLDING",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="preload" href="/images/about-poster.jpg" as="image" />

      </Head>
      <body>{children}</body>
    </html>
  );
}
