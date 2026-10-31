import React from 'react';
import { Layers, Feather, Compass, Stamp, ShieldCheck, Check, Sparkles, Send } from 'lucide-react';

interface PaperCraftStoryProps {
  onStartDispatch: () => void;
}

export const PaperCraftStory: React.FC<PaperCraftStoryProps> = ({ onStartDispatch }) => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="label-stamp text-[#5D3BE0] tracking-[0.2em] block">
          PHYSICAL ATELIER SPECIFICATIONS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#181445]">
          The Tactile Art of Physical Correspondence
        </h2>
        <p className="text-sm sm:text-base text-[#484555] leading-relaxed">
          In an era of fleeting ephemeral push notifications, a physical postcard arrives with tangible weight, real ink texture, and lasting shelf life.
        </p>
      </div>

      {/* 4 Pillars of Tactile Postal Craft */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: 350gsm Cardstock */}
        <div className="bg-white rounded-xl border border-[#EDE9FE] p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#F6F2FF] text-[#5D3BE0] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="label-stamp text-[10px] text-[#797587]">MATERIAL GRADE</span>
            <h3 className="text-lg font-bold text-[#181445]">350gsm Heavy Linen Cardstock</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#484555] leading-relaxed">
            Milled in the Lake District of England using 100% FSC-certified virgin cotton fiber. Features an embossed linen weave that feels substantial and resists bending during international postal handling.
          </p>
          <div className="pt-2 text-xs font-mono text-[#5D3BE0] flex items-center gap-2">
            <span>Thickness: 0.44mm</span>
            <span>·</span>
            <span>Opacity: 99.4%</span>
            <span>·</span>
            <span>Acid-Free</span>
          </div>
        </div>

        {/* Pillar 2: Philatelic Stamps */}
        <div className="bg-white rounded-xl border border-[#EDE9FE] p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#F6F2FF] text-[#5D3BE0] flex items-center justify-center">
            <Stamp className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="label-stamp text-[10px] text-[#797587]">PHILATELIC STANDARD</span>
            <h3 className="text-lg font-bold text-[#181445]">Perforated Stamps & Hand-Applied Franking</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#484555] leading-relaxed">
            Our stamps feature true serrated die-cut scallop edges modeled on historic 19th-century airmail stamps. Every dispatched postcard is physically hand-stamped with genuine carbon-black indelible cancellation ink.
          </p>
          <div className="pt-2 text-xs font-mono text-[#5D3BE0] flex items-center gap-2">
            <span>Perforation Gauge: 12.5</span>
            <span>·</span>
            <span>Indelible Pigment</span>
          </div>
        </div>

        {/* Pillar 3: Archival Pigments */}
        <div className="bg-white rounded-xl border border-[#EDE9FE] p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#F6F2FF] text-[#5D3BE0] flex items-center justify-center">
            <Feather className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="label-stamp text-[10px] text-[#797587]">COLOR ENGINE</span>
            <h3 className="text-lg font-bold text-[#181445]">12-Color Archival Giclée Pigments</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#484555] leading-relaxed">
            We don't use toner or cheap dye-sublimation. Every card is printed with museum-grade UltraChrome pigment inks calibrated to replicate the depth and grain of analog 35mm film photography for 100+ years without fading.
          </p>
          <div className="pt-2 text-xs font-mono text-[#5D3BE0] flex items-center gap-2">
            <span>2880 x 1440 DPI</span>
            <span>·</span>
            <span>Wilhelm Archival Certified</span>
          </div>
        </div>

        {/* Pillar 4: Priority Airmail Network */}
        <div className="bg-white rounded-xl border border-[#EDE9FE] p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#F6F2FF] text-[#5D3BE0] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="label-stamp text-[10px] text-[#797587]">LOGISTICS ALLIANCE</span>
            <h3 className="text-lg font-bold text-[#181445]">Global Priority Airmail Dispatch</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#484555] leading-relaxed">
            Partnered directly with USPS, Royal Mail, Deutsche Post, and La Poste. Cards are dispatched in glassine protective sleeves within 24 hours and delivered directly into physical home mailboxes in over 120 countries.
          </p>
          <div className="pt-2 text-xs font-mono text-[#5D3BE0] flex items-center gap-2">
            <span>Flat $4.90 Worldwide</span>
            <span>·</span>
            <span>3-5 Day Airmail</span>
          </div>
        </div>
      </div>

      {/* Physical Dimensions & Envelope Strip */}
      <div className="bg-[#FAF7F2] rounded-2xl border border-[#EDE9FE] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <span className="label-stamp text-[#5D3BE0]">STANDARDIZED POSTAL FORM</span>
          <h4 className="text-xl font-bold text-[#181445]">
            4” × 6” (105mm × 148mm) Universal Standard
          </h4>
          <p className="text-xs sm:text-sm text-[#484555]">
            Engineered precisely to international postal regulation standards. Perfectly fits standard photo frames, mantelpieces, and travel memory albums.
          </p>
        </div>

        <button
          onClick={onStartDispatch}
          className="px-6 py-3 text-sm font-semibold text-white bg-[#5D3BE0] hover:bg-[#4c2ec4] rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>Design & Dispatch a Postcard</span>
          <span className="text-xs opacity-80">($4.90)</span>
        </button>
      </div>
    </div>
  );
};
