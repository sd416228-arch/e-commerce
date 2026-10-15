import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section matching Image 4 */}
        <div className="rounded-3xl bg-[#1F1F1F] p-8 sm:p-12 mb-16 text-center border border-stone-700/60 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
              GET 10% OFF YOUR FIRST FESTIVE ORDER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Join Our Style List
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light">
              Sign up for exclusive Dashain &amp; Tihar drops, private member discounts, and style inspirations.
            </p>

            {subscribed ? (
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>धन्यवाद! You’re subscribed. Check your inbox for code DASHAIN10.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 rounded-xl bg-stone-900/90 border border-stone-600 px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#8B5E3C] px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#744C31] transition-all cursor-pointer shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-white">SD Infininov</span>
            </div>
            <p className="text-stone-400 leading-relaxed font-light">
              Nepal’s premier contemporary ethnic fashion house. Celebrating Dashain heritage with handcrafted cuts, luxurious silks, and timeless silhouettes.
            </p>
            <div className="flex items-center gap-2 pt-1 text-emerald-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official eSewa Merchant Partner</span>
            </div>
          </div>

          {/* Boutique Locations in Nepal */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Stores in Nepal
            </h4>
            <div className="text-stone-400 space-y-2">
              <div>
                <p className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Durbar Marg Flagship
                </p>
                <p>Opposite Hotel Annapurna, Kathmandu</p>
              </div>
              <div className="pt-1">
                <p className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Jhamsikhel Studio
                </p>
                <p>Near Restaurant Row, Lalitpur</p>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Collections
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>Dashain Reloaded Signature Edit</li>
              <li>Women's Festive Anarkali &amp; Sharara</li>
              <li>Men's Pure Cotton &amp; Raw Silk Kurtas</li>
              <li>Palpali Handloom Dhaka Fusion</li>
              <li>Bhai Tika Gifts &amp; Cashmere Shawls</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Customer Support
            </h4>
            <div className="space-y-1.5 text-stone-400">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+977-01-4422990 / +977-9841558291</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>care@morishop.np</span>
              </p>
              <p className="pt-2 text-[11px] text-stone-500">
                Opening Hours: Sun - Fri (10:00 AM - 7:30 PM NST)
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>&copy; 2026 SD Infininov. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Delivery &amp; Exchange Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
