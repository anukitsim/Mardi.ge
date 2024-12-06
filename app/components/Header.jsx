import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-5 md:py-6 shadow-md z-30 font-medium text-white">
    <Link href="/">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={100}
        height={30}
        className="h-6 sm:h-7 md:h-8"
      />
    </Link>
    <nav className="flex font-primary space-x-4 sm:space-x-6 md:space-x-10">
      <Link
        href="/contact"
        className="relative drop-shadow-md transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
      >
        Contact
      </Link>
      <Link
        href="/about"
        className="relative drop-shadow-md transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
      >
        About Us
      </Link>
      <Link
        href="/Chat"
        className="relative drop-shadow-md transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
      >
        Chat with us
      </Link>
    </nav>
  </header>
  );
}
