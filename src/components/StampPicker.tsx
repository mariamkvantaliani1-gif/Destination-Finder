import React from 'react';
import { PostageStamp } from '../types/postcard';
import { POSTAGE_STAMPS } from '../data/mockData';
import { PostalStampView } from './PostalStampView';
import { playStampClickSound } from '../utils/audio';
import { Check, Stamp } from 'lucide-react';

interface StampPickerProps {
  selectedStamp: PostageStamp;
  onSelectStamp: (stamp: PostageStamp) => void;
  cancellationCity: string;
  onChangeCancellationCity: (city: string) => void;
  cancellationDate: string;
  onChangeCancellationDate: (date: string) => void;
}

export const StampPicker: React.FC<StampPickerProps> = ({
  selectedStamp,
  onSelectStamp,
  cancellationCity,
  onChangeCancellationCity,
  cancellationDate,
  onChangeCancellationDate,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-[#181445] flex items-center gap-1.5">
            <Stamp className="w-4 h-4 text-[#5D3BE0]" />
            <span>Philatelic Stamp & Cancellation</span>
          </h4>
          <p className="text-xs text-[#484555] mt-0.5">
            Choose an authentic collectible stamp design with serrated perforations
          </p>
        </div>
        <span className="label-stamp text-[10px] text-[#5D3BE0] bg-[#EDE9FE] px-2 py-0.5 rounded-sm">
          AIRMAIL RATED
        </span>
      </div>

      {/* Grid of Collectible Postage Stamps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {POSTAGE_STAMPS.map((stamp) => {
          const isSelected = selectedStamp.id === stamp.id;
          return (
            <button
              key={stamp.id}
              onClick={() => {
                playStampClickSound();
                onSelectStamp(stamp);
              }}
              className={`group relative p-2.5 rounded-lg text-left transition-all cursor-pointer flex flex-col items-center justify-between border ${
                isSelected
                  ? 'bg-[#F6F2FF] border-[#5D3BE0] shadow-sm ring-1 ring-[#5D3BE0]'
                  : 'bg-[#ffffff] border-[#EDE9FE] hover:border-[#924DF0] hover:bg-[#FAF7FF]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#5D3BE0] text-white flex items-center justify-center z-20 shadow-xs">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}

              {/* Postal Stamp Thumbnail with Perforated Frame */}
              <div className="my-1 transform transition-transform group-hover:scale-105">
                <PostalStampView stamp={stamp} showCancellation={false} size="sm" />
              </div>

              <div className="w-full text-center mt-1 border-t border-[#EDE9FE] pt-1.5">
                <p className="text-xs font-semibold text-[#181445] truncate">
                  {stamp.name}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#484555] mt-0.5 font-mono">
                  <span>{stamp.denomination}</span>
                  <span>·</span>
                  <span>{stamp.year}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cancellation Postmark Customization */}
      <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EDE9FE] space-y-3">
        <div className="flex items-center justify-between">
          <span className="label-stamp text-[9px] text-[#181445] tracking-[0.14em]">
            AUTHENTIC POSTAL CANCELLATION FRANKING
          </span>
          <span className="text-[10px] font-mono text-[#797587]">HAND-STAMPED INK</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#181445] mb-1">
              Cancellation City / Bureau
            </label>
            <input
              type="text"
              value={cancellationCity}
              onChange={(e) => onChangeCancellationCity(e.target.value.toUpperCase())}
              placeholder="e.g. POSTE DE PARIS"
              className="w-full text-xs font-mono px-3 py-1.5 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0] uppercase"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#181445] mb-1">
              Franking Date
            </label>
            <input
              type="text"
              value={cancellationDate}
              onChange={(e) => onChangeCancellationDate(e.target.value.toUpperCase())}
              placeholder="e.g. 24 OCT 2026"
              className="w-full text-xs font-mono px-3 py-1.5 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0] uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
