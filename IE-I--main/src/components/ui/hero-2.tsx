import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const Component = () => {
  return (
    <div className={cn("flex flex-col items-center gap-4 w-full rounded-lg")}>
      <div className="w-full">
        <section className="py-12 bg-black sm:pb-16 lg:pb-20 xl:pb-24 pt-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="relative">
              <div className="lg:w-2/3">
                <p className="text-sm font-normal tracking-widest text-gray-300 uppercase">A Visual Archive of Engineering Excellence</p>
                <h1 className="mt-6 text-4xl font-normal text-white sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">IE(I) Gallery</span> Collection
                </h1>
                <p className="max-w-lg mt-4 text-xl font-normal text-gray-400 sm:mt-8">
                  Explore our visual archive showcasing workshops, seminars, conventions, industrial visits, and student activities that define engineering excellence.
                </p>
                <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                  <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  <Link 
                    to="#gallery-grid" 
                    className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full" 
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('gallery-grid');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Explore Gallery
                  </Link>
                </div>

                <div>
                  <div className="inline-flex items-center pt-6 mt-8 border-t border-gray-800 sm:pt-10 sm:mt-14">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17" stroke="url(#a)" strokeLinecap="round" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="a" x1="3" y1="7.00003" x2="22.2956" y2="12.0274" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" style={{stopColor: 'rgb(6 182 212)'}} />
                          <stop offset="100%" style={{stopColor: 'rgb(168 85 247)'}} />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span className="ml-2 text-base font-normal text-white">New events and activities added regularly</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:absolute md:mt-0 md:top-32 lg:top-0 md:right-0">
                <img 
                  className="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl" 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                  alt="Engineering professionals collaborating" 
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

