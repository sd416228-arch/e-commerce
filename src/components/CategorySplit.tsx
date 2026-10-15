import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategorySplitProps {
  onSelectGender: (gender: 'women' | 'men') => void;
  selectedGender: 'all' | 'women' | 'men' | 'dashain';
}

export const CategorySplit: React.FC<CategorySplitProps> = ({
  onSelectGender,
  selectedGender
}) => {
  return (
    <section id="categories-section" className="w-full bg-[#F9F9F9] py-8 sm:py-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-[#0A2540] tracking-wide font-sans">
          Shop by Style
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
          Find your look for every festive moment
        </p>
      </div>

      {/* ONE SEAMLESS FRAME (Not boxes) matching Screenshot 4 */}
      <div className="w-full max-w-[1400px] mx-auto overflow-hidden shadow-md">
        <div className="relative w-full flex flex-col md:flex-row bg-[#F3F3F3] select-none">
          
          {/* LEFT HALF: WOMEN */}
          <div
            onClick={() => onSelectGender('women')}
            className={`relative md:w-1/2 h-[450px] sm:h-[560px] lg:h-[650px] cursor-pointer overflow-hidden group transition-all ${
            selectedGender === 'women' ? 'ring-4 ring-[#8B5E3C] z-10' : ''
            }`}
            title="Shop Women's Collection"
          >
            {/* Nepalese woman model in crimson red festive outfit with dupatta */}
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=90"
              alt="Women Category"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Interactive Shading on Hover */}
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/15 transition-colors duration-300" />

            {/* Women Floating Category Badge */}
            <div className="absolute top-6 left-6 z-20">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A2540]/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-widest uppercase shadow-md group-hover:bg-[#8B5E3C] transition-colors">
                <span>WOMEN</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

          </div>

          {/* RIGHT HALF: MEN */}
          <div
            onClick={() => onSelectGender('men')}
            className={`relative md:w-1/2 h-[450px] sm:h-[560px] lg:h-[650px] cursor-pointer overflow-hidden group transition-all ${
            selectedGender === 'men' ? 'ring-4 ring-[#8B5E3C] z-10' : ''
            }`}
            title="Shop Men's Collection"
          >
            {/* Nepalese man wearing a red kurta surwal set */}
            <img
              src="https://shubhkalastore.com/cdn/shop/files/Mirror-Work-Beige-Kurta-Set-for-Men.webp?v=1735987243"
              alt="Man wearing a traditional red kurta surwal"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Interactive Shading on Hover */}
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/15 transition-colors duration-300" />

            {/* Men Floating Category Badge */}
            <div className="absolute top-6 right-6 z-20">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A2540]/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-widest uppercase shadow-md group-hover:bg-[#8B5E3C] transition-colors">
                <span>MEN</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
