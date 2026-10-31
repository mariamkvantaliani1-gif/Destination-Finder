import React, { useState } from 'react';
import { CURATED_SERIES } from '../data/mockData';
import { CuratedCardItem, PostcardData } from '../types/postcard';
import { POSTAGE_STAMPS } from '../data/mockData';
import { MapPin, ArrowRight, Send, Check } from 'lucide-react';

interface CuratedGalleryProps {
  onSelectCuratedItem: (item: CuratedCardItem) => void;
  onQuickDispatch: (item: CuratedCardItem) => void;
  activePostcardId?: string;
}

export const CuratedGallery: React.FC<CuratedGalleryProps> = ({
  onSelectCuratedItem,
  onQuickDispatch,
  activePostcardId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loadedCardId, setLoadedCardId] = useState<string | null>(null);

  const categories = ['All', 'Alpine & Nordic', 'Mediterranean', 'East Asia', 'Urban Heritage'];

  const filteredItems =
    selectedCategory === 'All'
      ? CURATED_SERIES
      : CURATED_SERIES.filter((c) => c.collection === selectedCategory);

  const handleLoad = (item: CuratedCardItem) => {
    onSelectCuratedItem(item);
    setLoadedCardId(item.id);
    setTimeout(() => setLoadedCardId(null), 2000);
  };

  return (
    <section className="space-y-6">
      {/* Section Header with Typographic Hierarchy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EDE9FE] pb-4">
        <div>
          <span className="label-stamp text-[#5D3BE0] tracking-[0.18em] block mb-1">
            ARCHIVAL DISPATCH ARCHIVES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181445]">
            Curated Memory Series
          </h2>
          <p className="text-sm text-[#484555] mt-1 max-w-xl">
            Pre-composed philatelic editions captured on 35mm film across secluded mountain passes, Mediterranean terraces, and historic boulevards.
          </p>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#F6F2FF] rounded-lg overflow-x-auto scrollbar-none shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#4514c9] shadow-xs'
                  : 'text-[#484555] hover:text-[#181445]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Curated Memory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isCurrentlyLoaded = loadedCardId === item.id;
          return (
            <div
              key={item.id}
              className="group bg-white rounded-xl border border-[#EDE9FE] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* 3:2 Photo Container */}
                <div className="relative aspect-[3/2] w-full bg-[#EDE9FE] overflow-hidden">
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Stamp Marker */}
                  <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-md text-white text-[9px] font-mono px-2 py-0.5 rounded border border-white/20">
                    {item.stampTheme}
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#797587]">
                    <span>{item.collection}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{item.dispatchesCount} sent</span>
                  </div>

                  <h3 className="text-base font-bold text-[#181445] group-hover:text-[#5D3BE0] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#484555] flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#5D3BE0] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>

                  <p className="text-xs text-[#797587] font-mono pt-1 border-t border-[#EDE9FE]">
                    {item.coordinates}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Redesigned according to Button Spec */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => handleLoad(item)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-md border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isCurrentlyLoaded
                      ? 'bg-[#E9E5FF] border-[#5D3BE0] text-[#4514c9]'
                      : 'bg-white border-[#5D3BE0] text-[#5D3BE0] hover:bg-[#EDE9FE]'
                  }`}
                >
                  {isCurrentlyLoaded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Loaded into Studio</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Load in Studio</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onQuickDispatch(item)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-md bg-[#5D3BE0] hover:bg-[#4c2ec4] active:scale-[0.98] text-white shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Direct Airmail Dispatch</span>
                  <span className="text-[11px] opacity-80">($4.90)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
