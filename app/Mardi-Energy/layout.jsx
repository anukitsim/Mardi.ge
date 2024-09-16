import '../globals.css'



export const metadata = {
  title: "Mardi Energy | Hydropower Plants in Keda",
  description: "Explore Mardi Energy's cascade of hydropower plants on the Khokhniskali River, Keda, contributing to Georgia's energy infrastructure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
