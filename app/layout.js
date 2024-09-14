import "./globals.css";



export const metadata = {
  title: "MARDI HOLDING",
  description: "construction and development company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/icon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
