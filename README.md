# 🏢 Mardi Holding Official Website

This repository contains the source code for [Mardi Holding's](https://www.mardiholding.com/) official website. Mardi Holding is a leading construction and development company in Georgia, encompassing various sectors including construction, architecture, tourism, transportation, real estate, wine and cigar production, as well as hotel and restaurant complexes.

## 🌟 Features

- **Responsive Design**: Ensures optimal viewing across various devices and screen sizes.
- **High-Quality Background Videos**: Incorporates full-screen, high-resolution videos hosted on Cloudflare for fast loading and seamless playback.
- **Parallax Scrolling and Interactive Animations**: Enhances user engagement through dynamic visual effects.
- **Contact Form Integration**: Connects to Bitrix24 CRM via webhooks for efficient client data management.
- **Chatbot Development (In Progress)**: An AI-driven chatbot is currently being developed to enhance user interaction, with an admin panel for easy management.


## 🛠️ Technologies Used

- **Front-End**:
  - Next.js: Utilized for server-side rendering and static site generation.
  - Tailwind CSS: Employed for responsive and modern UI design.

- **Back-End**:
  - Next.js: Handles server-side logic and rendering.
  - Python: Used for developing the AI-driven chatbot. (In progress/ separate repository for chatbot backend, will be integrated in this front end!)

- **Hosting and Deployment**:
  - Cloudflare: Hosts high-quality videos to ensure fast loading times.
  - Vercel: Manages hosting and deployment of the website.

- **Integrations**:
  - Bitrix24 CRM: Manages client data through webhooks connected to the contact form.

## 🚀 Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anukitsim/mardiholding.com.git
Navigate to the Project Directory:

bash
Copy code
cd mardiholding.com
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables: Create a .env file in the root directory and add the necessary environment variables as specified in .env.example.

Run the Development Server:

bash
Copy code
npm run dev
The application will be accessible at http://localhost:3000.

📂 Project Structure
ruby
Copy code
mardiholding.com/
├── components/      # Reusable UI components
├── pages/           # Next.js pages
├── public/          # Static assets
├── styles/          # Global and component-specific styles
├── utils/           # Utility functions
├── .env.example     # Example environment variables
├── next.config.js   # Next.js configuration
└── package.json     # Project dependencies and scripts

📞 Contact
For inquiries or further information, please visit Mardi Holding's official website or contact us via email at info@mardiholding.com.
