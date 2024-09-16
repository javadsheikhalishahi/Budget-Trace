import Logo from '@/components/Logo';
import Image from 'next/image';
import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-gradient-to-b from-indigo-500 to-purple-600 text-white overflow-hidden">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
        <Logo  />
        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center z-20">
          Welcome to Our Professional Platform
        </h1>
        <p className="mt-2 text-base sm:text-lg lg:text-xl text-gray-200 text-center">
          Your gateway to excellence
        </p>
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src="/images/colorful-powder-explosion-happy-holi-festival-colors-art-concept.png"
            layout="fill"
            objectFit="cover"
            alt="color explosion"
            className="object-fill opacity-35"
          />
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        {/* Spinning Coins and Hand */}
        <div className="absolute top-10 left-1/4 transform -translate-x-1/2">
          <Image 
            src="/images/illustration-bitcoin-concept.png" 
            width={200} 
            height={200} 
            alt='coin' 
            className="animate-down" 
          />
        </div>
        <div className="absolute top-0 right-1/4 transform translate-x-3/4">
          <Image 
            src='/images/3d-render-hand-dropping-golden-coins-white.png' 
            width={500} 
            height={500} 
            alt='hand-coin' 
            className="object-right" 
          />
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
              <Image src="/images/colorful-mixed-rainbow-powder-explosion-isolated-white-background.png" 
              layout="fill"
              objectFit="cover"
              alt="color explosion"
              className="object-fill opacity-50"
              />
            </div>
        <div className="rounded-3xl p-1 sm:p-8 w-full max-w-lg sm:max-w-2xl bg-white/10 shadow-lg backdrop-blur-lg z-10">
          <div className="text-gray-800 ml-0 sm:ml-12 md:ml-14 lg:ml-24">
            
            {children}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="py-4 text-center bg-gray-900">
        <p className="text-xs sm:text-sm text-gray-400">
          © 2024 Javad. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
