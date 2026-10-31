import React from 'react';
import { PostageStamp } from '../types/postcard';
import { Plane, Flower2, Mountain, Building2, Anchor, Compass } from 'lucide-react';

interface PostalStampViewProps {
  stamp: PostageStamp;
  cancellationCity?: string;
  cancellationDate?: string;
  showCancellation?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PostalStampView: React.FC<PostalStampViewProps> = ({
  stamp,
  cancellationCity = 'POSTE CENTRALE',
  cancellationDate = '24 OCT 2026',
  showCancellation = true,
  size = 'md',
}) => {
  const getIcon = () => {
    const iconClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
    switch (stamp.svgIcon) {
      case 'airmail':
        return <Plane className={iconClass} />;
      case 'flora':
        return <Flower2 className={iconClass} />;
      case 'mountain':
        return <Mountain className={iconClass} />;
      case 'monument':
        return <Building2 className={iconClass} />;
      case 'maritime':
        return <Anchor className={iconClass} />;
      case 'celestial':
        return <Compass className={iconClass} />;
      default:
        return <Plane className={iconClass} />;
    }
  };

  const dimensions =
    size === 'sm'
      ? 'w-16 h-20 text-[8px]'
      : size === 'lg'
      ? 'w-28 h-36 text-xs'
      : 'w-20 h-24 text-[10px]';

  return (
    <div className="relative inline-block select-none group">
      {/* Philatelic Stamp with Simulated Serrated Perforations */}
      <div
        className={`${dimensions} relative p-1 bg-[#ffffff] shadow-sm flex flex-col justify-between border border-dashed border-[#c9c4d8] rounded-[2px] overflow-hidden`}
        style={{
          boxShadow: '0 2px 4px -1px rgba(24, 20, 69, 0.1)',
        }}
      >
        {/* Scalloped Perforation Edges (visual perforations) */}
        <div className="absolute inset-0 pointer-events-none border-[3px] border-white z-10" />

        {/* Inner Stamp Vignette */}
        <div
          className="w-full h-full flex flex-col justify-between p-1.5 rounded-[1px] relative overflow-hidden text-white"
          style={{
            backgroundColor: stamp.primaryColor,
          }}
        >
          {/* Subtle Guilloche / Line engraving background pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, rgba(255,255,255,0.4) 3px, transparent 4px)',
            }}
          />

          {/* Stamp Header: Country */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-0.5">
            <span className="font-mono tracking-widest text-[8px] font-bold uppercase truncate max-w-[80%]">
              {stamp.country.split(' ')[0]}
            </span>
            <span className="font-mono font-bold text-[9px]">{stamp.year.slice(-2)}</span>
          </div>

          {/* Stamp Center Graphic */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-0.5 opacity-95">
            {getIcon()}
            <span className="text-[7px] tracking-wider uppercase font-semibold text-white/80 mt-0.5 truncate max-w-full">
              {stamp.theme}
            </span>
          </div>

          {/* Stamp Footer: Denomination & Mark */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-0.5">
            <span className="font-serif font-black text-[11px] tracking-tight">{stamp.denomination}</span>
            <span className="label-stamp text-[7px] text-white/70">POSTES</span>
          </div>
        </div>
      </div>

      {/* Realistic Postal Cancellation Stamp Overlay */}
      {showCancellation && (
        <div className="absolute -left-7 -top-4 pointer-events-none z-20 flex items-center opacity-85 transform -rotate-12">
          {/* Circular Cancellation City & Date Franking */}
          <div className="w-16 h-16 rounded-full border-2 border-[#181445]/60 flex flex-col items-center justify-center p-1 text-[#181445]/70 bg-transparent">
            <span className="text-[6.5px] font-mono font-bold tracking-widest uppercase text-center leading-[8px] line-clamp-1">
              {cancellationCity}
            </span>
            <span className="text-[6px] font-mono tracking-wider font-semibold my-0.5 border-y border-[#181445]/40 px-1">
              {cancellationDate}
            </span>
            <span className="text-[5.5px] font-mono tracking-widest uppercase">AIRMAIL · PRIORITY</span>
          </div>

          {/* Cancellation Wavy Lines */}
          <svg className="w-12 h-10 text-[#181445]/60 -ml-1" viewBox="0 0 60 40" fill="none">
            <path d="M0,8 Q15,2 30,8 T60,8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M0,16 Q15,10 30,16 T60,16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M0,24 Q15,18 30,24 T60,24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M0,32 Q15,26 30,32 T60,32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};
