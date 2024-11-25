"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { FiSend } from "react-icons/fi";
import Header from "./Header";
import { FiGlobe } from "react-icons/fi";

const knowledgeBaseEN = {
  "MARDI DEVELOPMENT": [
    {
      question: "What properties does Mardi Development offer?",
      answer:
        "Mardi Development provides modern apartments, luxury apart-hotels, and premium residential complexes in high-demand locations across Georgia. View our listings here: [Mardi Development Properties](https://www.mardi.ge)",
    },
    {
      question: "How can I invest in Mardi Development projects?",
      answer:
        "You can invest in projects like Novotel Living Batumi and apart-hotels, offering high returns and residency benefits. Learn more: [Invest in Mardi Development](https://www.mardi.ge)",
    },
    {
      question: "What are the benefits of investing in Georgian real estate?",
      answer:
        "Investors enjoy tax-free purchases, up to 15% annual returns, and the option for residency with a $100,000 property investment. Explore benefits in details: [Georgian Real Estate Benefits](https://www.mardi.ge)",
    },
    {
      question: "How do I book a site visit to Mardi Development properties?",
      answer:
        "You can schedule a site visit by contacting our team via email or phone. send your contact information here: [Contact Us](https://www.mardiholding.com/contact)",
    },
  ],
  "MARDI COMFORT": [
    {
      question: "What is Mardi Comfort?",
      answer:
        "Mardi Comfort is our hospitality division managing hotels and tourism ventures, including Novotel Living Batumi. Discover more: [Mardi Comfort](https://www.mardiholding.com)",
    },
    {
      question: "What services does Mardi Comfort provide?",
      answer:
        "We specialize in hotel management, tourism experiences, event hosting, and premium hospitality tailored to international guests.",
    },
    {
      question: "Can I host events at Mardi Comfort-managed hotels?",
      answer:
        "Yes, we offer event planning and conference hosting services at our managed properties. Website is under construction still, but you can contact us and request more information: [Contact Us](https://www.mardiholding.com/contact)",
    },
  ],
  "MARDI FOOD & BEVERAGE": [
    {
      question: "What is Adjarian Wine House?",
      answer:
        "Adjarian Wine House is a premium venue in Adjara offering wine tours, tastings, and traditional Georgian wines. Learn more: [Adjarian Wine House](https://awh.ge/en)",
    },
    {
      question: "What wines does Adjarian Wine House produce?",
      answer:
        "We produce Chkhaveri Rose and a variety of Qvevri wines using ancient Georgian techniques. View our wines: [Adjarian Wines](https://awh.ge/en)",
    },
    {
      question: "Can I visit Adjarian Wine House for wine tastings?",
      answer:
        "Yes, we welcome visitors for wine tastings, vineyard tours, and educational sessions on Georgian winemaking. Book your visit: [Wine Tasting](https://awh.ge/en/)",
    },
    {
      question: "Does Mardi produce cigars?",
      answer:
        "Yes, through Imeri LLC, we craft premium cigars using locally grown oriental tobacco. Learn more: [Imeri Cigars](https://cigar.ge)",
    },
  ],
  "MARDI TRAVEL LAB": [
    {
      question: "What is Mardi Travel Lab?",
      answer:
        "Mardi Travel Lab organizes customized tours across Georgia, including cultural, historical, eco, and wine tours. Discover more: [Mardi Travel Lab](https://travelab.ge)",
    },
    {
      question: "Can I book guided tours through Mardi Travel Lab?",
      answer:
        "Yes, we provide guided tours tailored to your interests, such as wine tours and visits to historical landmarks. Book here: [Guided Tours](https://travelab.ge/book)",
    },
    {
      question: "Does Mardi Travel Lab offer group or corporate tours?",
      answer:
        "Yes, we specialize in customized corporate and group tours to suit your needs. Contact us: [Group Tours](https://travelab.ge/contact)",
    },
  ],
  "MARDI ENERGY": [
    {
      question: "What is Mardi Energy?",
      answer:
        "Mardi Energy focuses on sustainable energy projects like hydropower and eco-friendly developments. Learn more: [Mardi Energy](https://www.mardiholding.com/energy)",
    },
    {
      question: "How does Mardi Energy promote sustainability?",
      answer:
        "We develop renewable energy projects and eco-friendly solutions to reduce environmental impact and support sustainable growth.",
    },
  ],
  "MARDI WINE & CIGAR": [
    {
      question: "What makes Mardi cigars unique?",
      answer:
        "Our cigars are crafted from locally grown oriental tobacco, blending Georgian tradition with international quality. Explore: [Mardi Cigars](https://cigar.ge)",
    },
    {
      question: "Where can I buy Mardi cigars?",
      answer:
        "You can purchase our cigars through Imeri LLC’s official website. Learn more: [Buy Mardi Cigars](https://cigar.ge)",
    },
  ],
};

const knowledgeBaseRU = {
  "MARDI DEVELOPMENT": [
    {
      question: "Какие объекты предлагает Mardi Development?",
      answer:
        "Mardi Development предоставляет современные квартиры, роскошные апарт-отели и жилые комплексы премиум-класса в популярных местах Грузии. Посмотрите наши предложения: [Недвижимость Mardi Development](https://www.mardi.ge)",
    },
    {
      question: "Как я могу инвестировать в проекты Mardi Development?",
      answer:
        "Вы можете инвестировать в проекты, такие как Novotel Living Batumi и апарт-отели, которые предлагают высокую доходность и преимущества резидентства. Узнайте больше: [Инвестируйте с Mardi Development](https://www.mardi.ge)",
    },
    {
      question: "Каковы преимущества инвестирования в грузинскую недвижимость?",
      answer:
        "Инвесторы получают возможность безналоговой покупки, до 15% годовой доходности и право на резидентство при покупке недвижимости на сумму от $100,000. Подробнее: [Преимущества недвижимости в Грузии](https://www.mardi.ge)",
    },
    {
      question: "Как записаться на просмотр объектов Mardi Development?",
      answer:
        "Вы можете записаться на просмотр, связавшись с нашей командой по электронной почте или телефону. Оставьте свои данные здесь: [Свяжитесь с нами](https://www.mardiholding.com/contact)",
    },
  ],
  "MARDI COMFORT": [
    {
      question: "Что такое Mardi Comfort?",
      answer:
        "Mardi Comfort — это наше подразделение по управлению гостиницами и туристическими проектами, включая Novotel Living Batumi. Узнайте больше: [Mardi Comfort](https://www.mardiholding.com)",
    },
    {
      question: "Какие услуги предоставляет Mardi Comfort?",
      answer:
        "Мы специализируемся на управлении гостиницами, организации туристического опыта, проведении мероприятий и предоставлении премиальных услуг гостеприимства для иностранных гостей.",
    },
    {
      question:
        "Можно ли проводить мероприятия в гостиницах, управляемых Mardi Comfort?",
      answer:
        "Да, мы предлагаем услуги по организации мероприятий и конференций в наших гостиницах. Наш сайт в разработке, но вы можете связаться с нами для получения дополнительной информации: [Свяжитесь с нами](https://www.mardiholding.com/contact)",
    },
  ],
  "MARDI FOOD & BEVERAGE": [
    {
      question: "Что такое Adjarian Wine House?",
      answer:
        "Adjarian Wine House — это премиум-винодельня в Аджарии, предлагающая винные туры, дегустации и традиционные грузинские вина. Узнайте больше: [Adjarian Wine House](https://awh.ge/en)",
    },
    {
      question: "Какие вина производит Adjarian Wine House?",
      answer:
        "Мы производим Chkhaveri Rose и различные вина Qvevri с использованием древних грузинских технологий. Посмотрите наши вина: [Adjarian Wines](https://awh.ge/en)",
    },
    {
      question: "Могу ли я посетить Adjarian Wine House для дегустации вина?",
      answer:
        "Да, мы приглашаем гостей на дегустации, туры по виноградникам и образовательные сессии о грузинском виноделии. Забронируйте визит: [Дегустация вина](https://awh.ge/en/)",
    },
    {
      question: "Производит ли Mardi сигары?",
      answer:
        "Да, через Imeri LLC мы создаем премиальные сигары из местного восточного табака. Узнайте больше: [Imeri Cigars](https://cigar.ge)",
    },
  ],
  "MARDI TRAVEL LAB": [
    {
      question: "Что такое Mardi Travel Lab?",
      answer:
        "Mardi Travel Lab организует индивидуальные туры по Грузии, включая культурные, исторические, эко- и винные туры. Узнайте больше: [Mardi Travel Lab](https://travelab.ge)",
    },
    {
      question: "Могу ли я забронировать экскурсии через Mardi Travel Lab?",
      answer:
        "Да, мы предоставляем экскурсии, адаптированные к вашим интересам, такие как винные туры и посещение исторических достопримечательностей. Забронируйте здесь: [Экскурсии](https://travelab.ge/book)",
    },
    {
      question:
        "Предлагает ли Mardi Travel Lab групповые или корпоративные туры?",
      answer:
        "Да, мы специализируемся на индивидуальных групповых и корпоративных турах, которые соответствуют вашим потребностям. Свяжитесь с нами: [Групповые туры](https://travelab.ge/contact)",
    },
  ],
  "MARDI ENERGY": [
    {
      question: "Что такое Mardi Energy?",
      answer:
        "Mardi Energy сосредотачивается на проектах устойчивой энергетики, таких как гидроэнергетика и экологически чистые разработки. Узнайте больше: [Mardi Energy](https://www.mardiholding.com/energy)",
    },
    {
      question: "Как Mardi Energy способствует устойчивому развитию?",
      answer:
        "Мы разрабатываем проекты возобновляемой энергии и экологически чистые решения для уменьшения воздействия на окружающую среду и поддержки устойчивого роста.",
    },
  ],
  "MARDI WINE & CIGAR": [
    {
      question: "Что делает сигары Mardi уникальными?",
      answer:
        "Наши сигары изготовлены из местного восточного табака, сочетая грузинские традиции с международным качеством. Узнайте больше: [Сигары Mardi](https://cigar.ge)",
    },
    {
      question: "Где можно купить сигары Mardi?",
      answer:
        "Вы можете приобрести наши сигары через официальный сайт Imeri LLC. Узнайте больше: [Купить сигары Mardi](https://cigar.ge)",
    },
  ],
};



const knowledgeBaseGE = {
  "MARDI DEVELOPMENT": [
    {
      question: "რა ტიპის უძრავი ქონებას სთავაზობს Mardi Development?",
      answer:
        "Mardi Development სთავაზობს კლიენტებს თანამედროვე ბინებს, ლუქს აპარტოტელებს და პრემიუმ კლასის საცხოვრებელ კომპლექსებს საქართველოს პოპულარულ ლოკაციებზე, მეტი ინფორმაციისთვის, ეწვიეთ ვებ-გვერდს: [Mardi Development Properties](https://www.mardi.ge)",
    },
    {
      question: "რა პროცედურაა საჭირო ინვესტიციისთვის Mardi Development პროექტებში?",
      answer:
        "თქვენ შეგიძლიათ  ინვესტირება ისეთ პროექტებში, როგორიცაა Novotel Living Batumi და აპარტოტელები, რაც გთავაზობთ მაღალ შემოსავალს და რეზიდენტობის სარგებელს. გაიგეთ მეტი: [Invest in Mardi Development](https://www.mardi.ge)",
    },
    {
      question: "რატომ არის მომგებიანი ინვესტიცია  უძრავ ქონებაში ქართულ ბაზარზე?",
      answer:
        "ინვესტორები სარგებლობენ საგადასახადო შეღავათებით, წლიური 15%-მდე შემოსავალით და რეზიდენტობის მიღების შესაძლებლობით $100,000 ინვესტიციაზე. დეტალებისთვის: [Georgian Real Estate Benefits](https://www.mardi.ge)",
    },
    {
      question: "როგორ დავჯავშნო ვიზიტი Mardi Development-ის ობიექტებზე?",
      answer:
        "შეგიძლიათ დაგეგმოთ ვიზიტი ჩვენი გუნდის ელფოსტის ან ტელეფონის მეშვეობით. გაგზავნეთ თქვენი საკონტაქტო ინფორმაცია აქ: [Contact Us](https://www.mardiholding.com/contact)",
    },
  ],
  "MARDI COMFORT": [
    {
      question: "რა არის Mardi Comfort?",
      answer:
        "Mardi Comfort არის  სტუმართმოყვარეობის, სასტყმროს სერვისების განყოფილება, რომელიც მართავს სასტუმროებსა და ტურისტულ პროექტებს, მათ შორის Novotel Living Batumi-ს. გაიგეთ მეტი: [Mardi Comfort](https://www.mardiholding.com)",
    },
    {
      question: "რა სერვისებს სთავაზობს Mardi Comfort?",
      answer:
        "ჩვენ სპეციალიზირდებით სასტუმროს მართვაში, ტურისტული გამოცდილების ორგანიზებაში, ღონისძიებების დაგეგმვასა და საერთაშორისო სტუმრებისთვის პრემიუმ სერვისების მიწოდებაში.",
    },
    {
      question: "შეიძლება თუ არა ღონისძიებების ჩატარება Mardi Comfort-ის სასტუმროებში?",
      answer:
        "დიახ, ჩვენ გთავაზობთ ღონისძიებების და კონფერენციების დაგეგმვასა და მომსახურებას ჩვენს სასტუმროებში. დამატებითი ინფორმაციისთვის: [Contact Us](https://www.mardiholding.com/contact)",
    },
  ],
  "MARDI FOOD & BEVERAGE": [
    {
      question: "რა არის აჭარული ღვინის სახლი?",
      answer:
        "აჭარული ღვინის სახლი არის ტოპ ტურისტული ლოკაცია აჭარაში, რომელიც სთავაზობს ღვინის ტურებს, დეგუსტაციებსა და ტრადიციულ ქართულ ღვინოებს. გაიგეთ მეტი: [Adjarian Wine House](https://awh.ge/en)",
    },
    {
      question: "რა ღვინოებს აწარმოებს აჭარული ღვინის სახლი?",
      answer:
        "ჩვენ ვაწარმოებთ ჩხავერის როზეს და სხვადასხვა ქვევრის ღვინოებს, რომლებიც მზადდება უძველესი ქართული ტექნოლოგიებით. გაიგეთ მეტი: [Adjarian Wines](https://awh.ge/en)",
    },
    {
      question: "შეიძლება თუ არა ღვინის დეგუსტაციის ვიზიტი აჭარული ღვინის სახლში?",
      answer:
        "დიახ, ჩვენ ველით სტუმრებს ღვინის დეგუსტაციაზე, ვენახების დასათვალიერებლად და ინფორმაციულ ტურებზე -  ქართულ მეღვინეობაზე. დაჯავშნეთ ვიზიტი: [Wine Tasting](https://awh.ge/en/)",
    },
    {
      question: "აწარმოებს თუ არა Mardi სიგარებს?",
      answer:
        "დიახ, Imeri LLC-ის მეშვეობით, ჩვენ ვამზადებთ პრემიუმ ხარისხის სიგარებს, რომლებიც მზადდება ადგილობრივი თამბაქოსგან. გაიგეთ მეტი: [Imeri Cigars](https://cigar.ge)",
    },
  ],
  "MARDI TRAVEL LAB": [
    {
      question: "რა არის Mardi Travel Lab?",
      answer:
        "Mardi Travel Lab აორგანიზებს პერსონალიზებულ ტურებს საქართველოს მასშტაბით, მათ შორის კულტურული, ისტორიული, ეკო და ღვინის ტურები. გაიგეთ მეტი: [Mardi Travel Lab](https://travelab.ge)",
    },
    {
      question: "შეიძლება თუ არა  ტურებისა და გიდის მომსახურების დაჯავშნა Mardi Travel Lab-ში?",
      answer:
        "დიახ, ჩვენ ვთავაზობთ ტურებს, რომლებიც მორგებულია თქვენს ინტერესებზე, მაგალითად, ღვინის ტურები და ისტორიული ღირსშესანიშნაობების მონახულება. დაჯავშნეთ აქ: [Guided Tours](https://travelab.ge/book)",
    },
    {
      question: "გთავაზობთ თუ არა Mardi Travel Lab კორპორატიულ ან ჯგუფურ ტურებს?",
      answer:
        "დიახ, ჩვენ გთავაზობთ პერსონალიზებულ კორპორატიულ და ჯგუფურ ტურებს, რომლებიც დაიგეგმება თქვენი სურვილების მიხედვით. დაგვიკავშირდით: [Group Tours](https://travelab.ge/contact)",
    },
  ],
  "MARDI ENERGY": [
    {
      question: "რა არის Mardi Energy?",
      answer:
        "Mardi Energy ორიენტირებულია მდგრად ენერგეტიკულ პროექტებზე, როგორიცაა ჰიდროენერგეტიკა და ეკოლოგიურად სუფთა განვითარება. გაიგეთ მეტი: [Mardi Energy](https://www.mardiholding.com/energy)",
    },
    {
      question: "როგორ უწყობს ხელს Mardi Energy მდგრადობას?",
      answer:
        "ჩვენ ვავითარებთ განახლებად ენერგეტიკულ პროექტებს და ეკოლოგიურად სუფთა გადაწყვეტილებებს გარემოზე ზემოქმედების შესამცირებლად და მდგრადი ზრდის მხარდასაჭერად.",
    },
  ],
  "MARDI WINE & CIGAR": [
    {
      question: "რა ხდის Mardi სიგარებს უნიკალურს?",
      answer:
        "ჩვენი სიგარები მზადდება ადგილობრივი თამბაქოსგან, რომელიც აერთიანებს ქართულ ტრადიციებს და საერთაშორისო ხარისხს. გაიგეთ მეტი: [Mardi Cigars](https://cigar.ge)",
    },
    {
      question: "სად შეიძლება Mardi სიგარების შეძენა?",
      answer:
        "თქვენ შეგიძლიათ შეიძინოთ ჩვენი სიგარები Imeri LLC-ის ოფიციალური ვებგვერდის მეშვეობით. გაიგეთ მეტი: [Buy Mardi Cigars](https://cigar.ge)",
    },
  ],
};


// Keyframes for animations
const typewriter = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled Components

const PageBackground = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(40, 44, 52, 0.9),
    rgba(50, 55, 65, 0.9)
  );
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.5s ease-in-out;
  font-family: "Vela Sans", sans-serif;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ChatBotContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  border-radius: 20px;
  padding: 1.5rem;
  margin-top: 6rem;
  border: 1px solid rgba(200, 200, 200, 0.2);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  background: rgba(40, 44, 52, 0.8);
  height: 80vh; /* Fixed height for the chat container */
  max-height: 80vh; /* Prevents overflow */
  overflow: hidden; /* Hides any content overflow */
  
  @media (max-width: 768px) {
    padding: 1rem;
    height: 90vh; /* Adjust height for smaller screens */
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-align: left;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  color: #e4e4e4;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding-left: 1rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  text-align: left;
  padding-left: 1.5rem;
  color: #b0b0b0;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding-left: 1rem;
  }
`;

const ScrollableArea = styled.div`
  flex: 1; /* Ensures it takes up remaining space */
  overflow-y: auto; /* Makes only this section scrollable */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }

  /* Optional: Customize scrollbar appearance */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* Removed gap and overflow from here */
`;

const TopicsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* Removed padding to be handled by ScrollableArea */

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const TopicsGrid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  overflow: visible;
  justify-content: flex-start;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    gap: 0.5rem;
    justify-content: space-around;
  }
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const QuestionButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  color: #e4e4e4;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }
`;

// Define motion variants for container and items
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ChatBubble = styled.div`
  max-width: 70%;
  padding: 0.7rem 1rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
  align-self: ${(props) => (props.type === "bot" ? "flex-start" : "flex-end")};
  background: ${(props) =>
    props.type === "bot" ? "rgba(240, 240, 240, 0.1)" : "#5173d3"};
  color: ${(props) => (props.type === "bot" ? "#e4e4e4" : "#ffffff")};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, color 0.3s ease;

  a {
    color: #5173d3; /* Change to your theme color */
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }

  @media (max-width: 768px) {
    max-width: 90%;
    font-size: 0.875rem;
  }
`;

const ChatBubbleContent = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content.replace(
          /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        ),
      }}
    />
  );
};

const ChatWrapper = styled.div`
  /* Removed max-height and overflow from ChatWrapper */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* Optional padding can remain */
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const TextInput = styled.input`
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.1);
  color: #e4e4e4;
  border: none;
  border-radius: 16px;
  padding: 0.65rem;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #b0b0b0;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const SendButton = styled.button`
  background: #5173d3;
  color: #ffffff;
  border: none;
  padding: 0.6rem 0.8rem;
  border-radius: 50%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    background: #4059b7;
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const LoaderWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #282c34; /* Match the desired background color */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Loader Component
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1rem;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: #e4e4e4;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const Loader = () => (
  <LoadingContainer>
    <Dot />
    <Dot />
    <Dot />
  </LoadingContainer>
);

// Typewriter Hook
const useTypewriter = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    indexRef.current = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(indexRef.current));
      indexRef.current += 1;

      if (indexRef.current >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

// TypewriterText Component
const TypewriterText = ({ text, speed = 50 }) => {
  const displayedText = useTypewriter(text, speed);

  return <span>{displayedText}</span>;
};

// Animated Question Styled Components
const AnimatedQuestion = styled(motion.div)`
  width: 100%;
`;

const questionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
const ChatBotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);

  const [isBotTyping, setIsBotTyping] = useState(false);

  const [language, setLanguage] = useState("en");
  const [knowledgeBase, setKnowledgeBase] = useState(knowledgeBaseEN);

  const translations = {
    en: {
      heading: "Chat With Us",
      subheading: "Ask questions, or choose a topic...",
      placeholder: "Type your message...",
    },
    ru: {
      heading: "Общайтесь с нами",
      subheading: "Задавайте вопросы или выберите тему...",
      placeholder: "Введите ваше сообщение...",
    },
    ge: {
      heading: "გამარჯობა..",
      subheading: "დასვით შეკითხვა ან აირჩიეთ თემა...",
      placeholder: "შეიყვანეთ შეკითხვა...",
    },
  };

  const { heading, subheading, placeholder } = translations[language];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (lang === "en") setKnowledgeBase(knowledgeBaseEN);
    if (lang === "ru") setKnowledgeBase(knowledgeBaseRU);
    if (lang === "ge") setKnowledgeBase(knowledgeBaseGE);
  };

  const chatEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleTopicClick = useCallback((topic) => {
    setIsGeneratingQuestions(true);
    setDisplayedQuestions([]);
    setSelectedTopic(null);

    setTimeout(() => {
      setSelectedTopic(topic);
      setIsGeneratingQuestions(false);

      const questions = knowledgeBase[topic];
      questions.forEach((question, index) => {
        setTimeout(() => {
          setDisplayedQuestions((prev) => [...prev, question]);
        }, 500 * index);
      });
    }, 2000);
  }, [knowledgeBase]);

  const handleQuestionClick = useCallback(async (question) => {
    setMessages((prev) => [...prev, { type: "user", content: question.question }]);
    setIsBotTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question.question }),
      });

      if (!response.ok) throw new Error("Failed to fetch response from chatbot API");

      const data = await response.json();
      const reply = data.reply || "I’m not sure how to answer that.";
      setIsBotTyping(false);
      setMessages((prev) => [...prev, { type: "bot", content: reply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsBotTyping(false);
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "There was an error. Please try again." },
      ]);
    }
  }, []);

  const frontendCache = new Map();

  const sendMessage = useCallback(async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { type: "user", content: input }]);
      setInput("");

      if (frontendCache.has(input)) {
        const cachedReply = frontendCache.get(input);
        setMessages((prev) => [...prev, { type: "bot", content: cachedReply }]);
        return;
      }

      setIsBotTyping(true);
      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) throw new Error("Failed to fetch response from chatbot API");

        const data = await response.json();
        const reply = data.reply || "I’m not sure how to answer that.";

        frontendCache.set(input, reply);

        setIsBotTyping(false);
        setMessages((prev) => [...prev, { type: "bot", content: reply }]);
      } catch (error) {
        console.error("Error sending message:", error);
        setIsBotTyping(false);
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: "There was an error. Please try again later." },
        ]);
      }
    }
  }, [input]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoaderWrapper
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Spinner />
          </LoaderWrapper>
        )}
      </AnimatePresence>
      {!isLoading && (
        <PageBackground>
          <Header />
          <ChatBotContainer>
  <div className="absolute lg:top-40 lg:right-12 top-18 right-4 flex items-center">
    <FiGlobe size={20} className="text-white mr-2" />
    <select
      className="bg-gray-700 text-white px-2 py-1 rounded-md"
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="ru">RU</option>
      <option value="ge">GE</option>
    </select>
  </div>

  {/* Always visible */}
  <Heading>{heading}</Heading>
  <SubHeading>{subheading}</SubHeading>

  {/* Scrollable content */}
  <ScrollableArea>
    <TopicsSection>
      <TopicsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="list"
        aria-label="Topics"
      >
        {Object.keys(knowledgeBase).map((topic, index) => (
          <TopicThumbnail
            key={index}
            onClick={() => handleTopicClick(topic)}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            tabIndex={0}
            aria-pressed={selectedTopic === topic}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleTopicClick(topic);
            }}
          >
            {topic}
          </TopicThumbnail>
        ))}
      </TopicsGrid>

      {isGeneratingQuestions ? (
        <Loader />
      ) : (
        selectedTopic && (
          <QuestionList role="list" aria-label="Questions">
            {displayedQuestions.map((question, index) => (
              <AnimatedQuestion
                key={index}
                variants={questionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 * index, duration: 0.5 }}
              >
                <QuestionButton
                  onClick={() => handleQuestionClick(question)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleQuestionClick(question);
                  }}
                >
                  {question.question}
                </QuestionButton>
              </AnimatedQuestion>
            ))}
          </QuestionList>
        )
      )}
    </TopicsSection>

    <ChatWrapper>
      {messages.map((msg, index) => (
        <ChatBubble key={index} type={msg.type}>
          {msg.type === "bot" ? (
            <ChatBubbleContent content={msg.content} />
          ) : (
            msg.content
          )}
        </ChatBubble>
      ))}
      {isBotTyping && <Loader />}
      <div ref={chatEndRef} />
    </ChatWrapper>
  </ScrollableArea>

  {/* Input Section */}
  <InputSection>
    <TextInput
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
      onKeyDown={handleKeyPress}
      aria-label={placeholder}
    />
    <SendButton onClick={sendMessage} aria-label="Send Message">
      <FiSend />
    </SendButton>
  </InputSection>
</ChatBotContainer>

        </PageBackground>
      )}
    </>
  );
};


// Styled component for TopicThumbnail (moved below for clarity)
const TopicThumbnail = styled(motion.div)`
  border: 1px solid rgba(200, 200, 200, 0.2);
  color: #e0e0e0;
  width: 180px;
  height: 90px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.85rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, background 0.3s ease;
  transform-origin: center; /* Ensures scaling occurs from the center */

  &:hover,
  &:focus {
    transform: scale(1.05); /* Keep scale consistent */
    background: rgba(255, 255, 255, 0.1);
    outline: none;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 70px;
    font-size: 0.75rem;
  }
`;

export default ChatBotUI;
