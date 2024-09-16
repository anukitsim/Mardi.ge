import '../globals.css'


export const metadata = {
  title: "Mardi Comfort | Leading Hospitality Management in Georgia",
  description: "Mardi Comfort is aiming to be Georgia's top hospitality management company, offering world-class services in the hospitality industry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
