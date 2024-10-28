// app/contact/layout.js

import '../globals.css'

export const metadata = {
  title: "Contact",
  description: "Contact MARDI HOLDING",
};

export default function ContactLayout({ children }) {
  return (
    <div className="contact-layout">
      {children}
    </div>
  );
}
