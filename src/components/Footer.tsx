import React from 'react';
import { Send, ShieldCheck, Heart, Globe, Award } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'studio' | 'curated' | 'archive' | 'craft') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-[#EDE9FE] bg-white transition-colors">
      {/* Airmail ribbon strip */}
      <div className="h-1.5 w-full airmail-strip opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#5D3BE0] flex items-center justify-center text-white">
                <Send className="w-3.5 h-3.5 transform -rotate-12" />
              </div>
              <span className="text-base font-bold tracking-tight text-[#181445]">
                Postmark<span className="text-[#5D3BE0]">.</span>
              </span>
            </div>
            <p className="text-xs text-[#484555] leading-relaxed">
              Tactile postal modern dispatch service bridging analogue ephemera with seamless digital memory printing.
            </p>
            <span className="label-stamp text-[9px] text-[#797587] block">
              UNIVERSAL POSTAL UNION · ED. 1928
            </span>
          </div>

          {/* Postal Navigation */}
          <div>
            <h4 className="text-xs font-bold text-[#181445] tracking-wide uppercase mb-3">
              Atelier Sections
            </h4>
            <ul className="space-y-2 text-xs text-[#484555]">
              <li>
                <button
                  onClick={() => onSelectTab('studio')}
                  className="hover:text-[#5D3BE0] transition-colors cursor-pointer"
                >
                  Postcard Studio Dispatcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('curated')}
                  className="hover:text-[#5D3BE0] transition-colors cursor-pointer"
                >
                  Curated Series (35mm Film)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('archive')}
                  className="hover:text-[#5D3BE0] transition-colors cursor-pointer"
                >
                  Postal Dispatch Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('craft')}
                  className="hover:text-[#5D3BE0] transition-colors cursor-pointer"
                >
                  Paper Mills & Stamp Franking
                </button>
              </li>
            </ul>
          </div>

          {/* Postal Specifications */}
          <div>
            <h4 className="text-xs font-bold text-[#181445] tracking-wide uppercase mb-3">
              Physical Standards
            </h4>
            <ul className="space-y-2 text-xs text-[#484555]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5D3BE0]" />
                <span>350gsm Heavy Linen Cardstock</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#5D3BE0]" />
                <span>Flat $4.90 Priority Airmail Worldwide</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#5D3BE0]" />
                <span>Indelible Carbon Cancellation Inks</span>
              </li>
            </ul>
          </div>

          {/* Postmark Guarantee */}
          <div>
            <h4 className="text-xs font-bold text-[#181445] tracking-wide uppercase mb-3">
              Postmaster Promise
            </h4>
            <p className="text-xs text-[#484555] leading-relaxed">
              Every card is individually inspected, franked by hand, and mailed inside a protective glassine sleeve within 24 hours of dispatch.
            </p>
            <div className="mt-3 text-[11px] font-mono text-[#5D3BE0]">
              All mail delivered via USPS / Royal Mail / Deutsche Post.
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-6 border-t border-[#EDE9FE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#797587]">
          <p>© 2026 Postmark Atelier. All rights reserved.</p>
          <p className="label-stamp text-[9px] text-[#797587]">
            DESIGNED ON TACTILE POSTAL MODERN ARCHITECTURE
          </p>
        </div>
      </div>
    </footer>
  );
};
