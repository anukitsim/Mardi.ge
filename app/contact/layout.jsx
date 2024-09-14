import '../globals.css'



export const metadata = {
  title: "Contact",
  description: "Contact MARDI HOLDING",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
