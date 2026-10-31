import React, { useState } from 'react';
import { HandwritingFont, InkColor, PaperStock, PostageStamp, PostcardData, RecipientAddress } from '../types/postcard';
import { StampPicker } from './StampPicker';
import { CURATED_SERIES } from '../data/mockData';
import {
  Image as ImageIcon,
  PenTool,
  Stamp,
  Mail,
  Layers,
  Upload,
  Sparkles,
  MapPin,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface PostcardEditorProps {
  postcard: PostcardData;
  onChangePostcard: (updated: Partial<PostcardData>) => void;
  onDispatchClick: () => void;
}

export const PostcardEditor: React.FC<PostcardEditorProps> = ({
  postcard,
  onChangePostcard,
  onDispatchClick,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'photo' | 'message' | 'stamp' | 'address' | 'paper'>('photo');

  const proseInspirations = [
    {
      label: 'Wanderlust',
      text: 'Drinking cold limoncello on a sun-drenched terrace overlooking the sea. The scent of wild jasmine is everywhere. Thinking of you as the boats return.',
    },
    {
      label: 'Quiet Morning',
      text: 'Woke before dawn to walk through the gardens in the morning mist. Fresh cedar air and quiet stone paths. Sending a piece of this morning across the miles.',
    },
    {
      label: 'Warm Hug',
      text: 'Just a small paper reminder that you are loved across every ocean and time zone. Keep this on your fridge or bookshelf until we catch up next.',
    },
    {
      label: 'Café Musings',
      text: 'Sat under a striped awning watching the afternoon rain shower on the cobblestones. The notebook is half-filled already. Wish you were here with me.',
    },
  ];

  const addressPresets = [
    {
      label: 'London, UK',
      address: {
        fullName: 'Eleanor Vance',
        streetAddress: '42 Belgrave Square',
        apartmentSuite: 'Flat 3B',
        city: 'London',
        stateProvince: 'Greater London',
        postalCode: 'SW1X 8PG',
        country: 'United Kingdom',
      },
    },
    {
      label: 'New York, US',
      address: {
        fullName: 'Benjamin Miller',
        streetAddress: '344 West 11th Street',
        apartmentSuite: 'Apt 4F',
        city: 'New York',
        stateProvince: 'NY',
        postalCode: '10014',
        country: 'United States',
      },
    },
    {
      label: 'Tokyo, JP',
      address: {
        fullName: 'Kenji Takahashi',
        streetAddress: '2-14-5 Minami-Aoyama',
        apartmentSuite: '#302',
        city: 'Minato-ku',
        stateProvince: 'Tokyo',
        postalCode: '107-0062',
        country: 'Japan',
      },
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChangePostcard({
            photoUrl: event.target.result as string,
            title: file.name.replace(/\.[^/.]+$/, ''),
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#ffffff] rounded-xl border border-[#EDE9FE] shadow-sm p-4 sm:p-6 space-y-6">
      {/* Station Navigation Tabs (Segmented control) */}
      <div className="flex items-center gap-1 p-1 bg-[#F6F2FF] rounded-lg overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('photo')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'photo'
              ? 'bg-[#ffffff] text-[#4514c9] shadow-xs'
              : 'text-[#484555] hover:text-[#181445]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#5D3BE0]" />
          <span>1. Photograph</span>
        </button>

        <button
          onClick={() => setActiveSubTab('message')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'message'
              ? 'bg-[#ffffff] text-[#4514c9] shadow-xs'
              : 'text-[#484555] hover:text-[#181445]'
          }`}
        >
          <PenTool className="w-3.5 h-3.5 text-[#5D3BE0]" />
          <span>2. Handwriting</span>
        </button>

        <button
          onClick={() => setActiveSubTab('stamp')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'stamp'
              ? 'bg-[#ffffff] text-[#4514c9] shadow-xs'
              : 'text-[#484555] hover:text-[#181445]'
          }`}
        >
          <Stamp className="w-3.5 h-3.5 text-[#5D3BE0]" />
          <span>3. Stamp & Franking</span>
        </button>

        <button
          onClick={() => setActiveSubTab('address')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'address'
              ? 'bg-[#ffffff] text-[#4514c9] shadow-xs'
              : 'text-[#484555] hover:text-[#181445]'
          }`}
        >
          <Mail className="w-3.5 h-3.5 text-[#5D3BE0]" />
          <span>4. Recipient</span>
        </button>

        <button
          onClick={() => setActiveSubTab('paper')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'paper'
              ? 'bg-[#ffffff] text-[#4514c9] shadow-xs'
              : 'text-[#484555] hover:text-[#181445]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#5D3BE0]" />
          <span>5. Cardstock</span>
        </button>
      </div>

      {/* ================= STATION 1: PHOTOGRAPH ================= */}
      {activeSubTab === 'photo' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#181445]">
              Select Photography or Upload Your Memory
            </h4>
            <label className="px-3 py-1.5 text-xs font-medium text-[#5D3BE0] bg-[#FAF7FF] hover:bg-[#EDE9FE] border border-[#5D3BE0] rounded-md transition-colors cursor-pointer flex items-center gap-1.5">
              <Upload className="w-3 h-3" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Curated Pre-Loaded High Fidelity Captures */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CURATED_SERIES.map((item) => {
              const isSelected = postcard.photoUrl === item.photoUrl;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onChangePostcard({
                      photoUrl: item.photoUrl,
                      title: item.title,
                      location: item.location,
                      coordinates: item.coordinates,
                    });
                  }}
                  className={`group relative rounded-lg overflow-hidden border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#5D3BE0] ring-2 ring-[#5D3BE0]'
                      : 'border-[#EDE9FE] hover:border-[#924DF0]'
                  }`}
                >
                  <div className="aspect-[3/2] w-full bg-[#EDE9FE] overflow-hidden">
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs font-semibold text-[#181445] truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[#484555] truncate">{item.location.split(',')[0]}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-[#5D3BE0] text-white p-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Location & Title Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EDE9FE]">
            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Postcard Title / Heading
              </label>
              <input
                type="text"
                value={postcard.title}
                onChange={(e) => onChangePostcard({ title: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Location Stamp
              </label>
              <input
                type="text"
                value={postcard.location}
                onChange={(e) => onChangePostcard({ location: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Geographic Coordinates
              </label>
              <input
                type="text"
                value={postcard.coordinates}
                onChange={(e) => onChangePostcard({ coordinates: e.target.value })}
                className="w-full text-xs font-mono px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Capture Date
              </label>
              <input
                type="date"
                value={postcard.dateCaptured}
                onChange={(e) => onChangePostcard({ dateCaptured: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= STATION 2: HANDWRITING & MESSAGE ================= */}
      {activeSubTab === 'message' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#181445]">
              Handwritten Reverse Dispatch
            </h4>
            <span className="text-[11px] text-[#484555] font-mono">
              {postcard.message.length} / 260 characters
            </span>
          </div>

          {/* Quick Prose Inspirations */}
          <div>
            <span className="text-[11px] font-semibold text-[#484555] block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#5D3BE0]" />
              <span>Inspiration Presets (Click to Load):</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {proseInspirations.map((p) => (
                <button
                  key={p.label}
                  onClick={() => onChangePostcard({ message: p.text })}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#FAF7FF] text-[#4514c9] hover:bg-[#EDE9FE] border border-[#E9E5FF] transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <textarea
              rows={4}
              maxLength={280}
              value={postcard.message}
              onChange={(e) => onChangePostcard({ message: e.target.value })}
              placeholder="Write your heartfelt note here..."
              className="w-full text-sm p-3 rounded-lg border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0] leading-relaxed resize-none"
            />
          </div>

          {/* Sender Sign-off */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Sender Sign-off Name
              </label>
              <input
                type="text"
                value={postcard.senderName}
                onChange={(e) => onChangePostcard({ senderName: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>

            {/* Ink Color Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Archival Ink Pigment
              </label>
              <div className="flex items-center gap-2">
                {[
                  { id: 'navy' as InkColor, label: 'French Navy', hex: '#181445' },
                  { id: 'bistre' as InkColor, label: 'Sepia Bistre', hex: '#4A3728' },
                  { id: 'spruce' as InkColor, label: 'Dark Spruce', hex: '#14382B' },
                  { id: 'violet' as InkColor, label: 'Violette', hex: '#4514C9' },
                ].map((ink) => (
                  <button
                    key={ink.id}
                    onClick={() => onChangePostcard({ inkColor: ink.id })}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs border cursor-pointer transition-all ${
                      postcard.inkColor === ink.id
                        ? 'border-[#5D3BE0] bg-[#F6F2FF] font-semibold text-[#181445]'
                        : 'border-[#EDE9FE] text-[#484555] hover:bg-[#FAF7FF]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: ink.hex }}
                    />
                    <span>{ink.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Handwriting Style Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#181445] mb-1.5">
              Calligraphy / Handwriting Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'caveat' as HandwritingFont, label: 'Casual Script', font: 'Caveat' },
                { id: 'caveat-bold' as HandwritingFont, label: 'Bold Cursive', font: 'Caveat 700' },
                { id: 'roboto-flex' as HandwritingFont, label: 'Clean Print', font: 'Roboto Flex' },
                { id: 'space-mono' as HandwritingFont, label: 'Typewriter', font: 'Space Mono' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => onChangePostcard({ handwritingFont: style.id })}
                  className={`p-2 rounded-md border text-center transition-all cursor-pointer ${
                    postcard.handwritingFont === style.id
                      ? 'border-[#5D3BE0] bg-[#F6F2FF] ring-1 ring-[#5D3BE0] text-[#4514c9] font-semibold'
                      : 'border-[#EDE9FE] text-[#484555] hover:bg-[#FAF7FF]'
                  }`}
                >
                  <span className="text-xs block font-medium">{style.label}</span>
                  <span
                    className="text-sm block mt-0.5 text-[#181445]"
                    style={{
                      fontFamily: style.id.includes('caveat')
                        ? "'Caveat', cursive"
                        : style.id === 'space-mono'
                        ? "'Space Mono', monospace"
                        : "'Roboto Flex', sans-serif",
                    }}
                  >
                    Dear Friend
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= STATION 3: PHILATELIC STAMP ================= */}
      {activeSubTab === 'stamp' && (
        <div className="animate-in fade-in duration-150">
          <StampPicker
            selectedStamp={postcard.stamp}
            onSelectStamp={(stamp: PostageStamp) => onChangePostcard({ stamp })}
            cancellationCity={postcard.cancellationCity}
            onChangeCancellationCity={(cancellationCity: string) => onChangePostcard({ cancellationCity })}
            cancellationDate={postcard.cancellationDate}
            onChangeCancellationDate={(cancellationDate: string) => onChangePostcard({ cancellationDate })}
          />
        </div>
      )}

      {/* ================= STATION 4: RECIPIENT ADDRESS ================= */}
      {activeSubTab === 'address' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#181445]">
              Recipient Physical Delivery Address
            </h4>
            <span className="label-stamp text-[9px] text-[#5D3BE0] bg-[#EDE9FE] px-2 py-0.5 rounded-sm">
              GLOBAL PRIORITY DISPATCH
            </span>
          </div>

          {/* Quick Address Presets */}
          <div>
            <span className="text-[11px] font-semibold text-[#484555] block mb-1">
              Quick Test Addresses:
            </span>
            <div className="flex flex-wrap gap-2">
              {addressPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => onChangePostcard({ recipient: preset.address })}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#FAF7FF] text-[#4514c9] hover:bg-[#EDE9FE] border border-[#E9E5FF] transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Recipient Full Name
              </label>
              <input
                type="text"
                value={postcard.recipient.fullName}
                onChange={(e) =>
                  onChangePostcard({
                    recipient: { ...postcard.recipient, fullName: e.target.value },
                  })
                }
                placeholder="e.g. Eleanor Vance"
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={postcard.recipient.streetAddress}
                onChange={(e) =>
                  onChangePostcard({
                    recipient: { ...postcard.recipient, streetAddress: e.target.value },
                  })
                }
                placeholder="e.g. 42 Belgrave Square"
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Apartment, Suite, Unit (Optional)
              </label>
              <input
                type="text"
                value={postcard.recipient.apartmentSuite || ''}
                onChange={(e) =>
                  onChangePostcard({
                    recipient: { ...postcard.recipient, apartmentSuite: e.target.value },
                  })
                }
                placeholder="e.g. Flat 3B"
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                City / Town
              </label>
              <input
                type="text"
                value={postcard.recipient.city}
                onChange={(e) =>
                  onChangePostcard({
                    recipient: { ...postcard.recipient, city: e.target.value },
                  })
                }
                placeholder="e.g. London"
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                State / Province / Region
              </label>
              <input
                type="text"
                value={postcard.recipient.stateProvince}
                onChange={(e) =>
                  onChangePostcard({
                    recipient: { ...postcard.recipient, stateProvince: e.target.value },
                  })
                }
                placeholder="e.g. Greater London"
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Postal Code / ZIP
              </label>
              <input
                type="text"
                value={postcard.recipient.postalCode}
                onChange={(e) =>
                  onChangePostcard({
                    recipient: { ...postcard.recipient, postalCode: e.target.value },
                  })
                }
                placeholder="e.g. SW1X 8PG"
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181445] mb-1">
                Destination Country
              </label>
              <select
                value={postcard.recipient.country}
                onChange={(e) =>
                  onChangePostcard({
                    recipient: { ...postcard.recipient, country: e.target.value },
                  })
                }
                className="w-full text-xs px-3 py-2 rounded-md border border-[#EDE9FE] bg-white text-[#181445] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0]"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Spain">Spain</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ================= STATION 5: PAPER STOCK ================= */}
      {activeSubTab === 'paper' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#181445]">
              Cardstock Paper Weight & Texture
            </h4>
            <span className="text-[11px] text-[#484555]">FSC-Certified Archival Mills</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'linen-350' as PaperStock,
                name: '350gsm Heavy Linen',
                badge: 'Recommended',
                desc: 'Crisp tactile woven linen texture, high opacity, resistant to postal handling scuffs.',
              },
              {
                id: 'cotton-320' as PaperStock,
                name: '320gsm Cotton Rag',
                badge: 'Velvet Touch',
                desc: 'Ultra-smooth velvet surface, warmer paper tone, ideal for deep pigment reproduction.',
              },
              {
                id: 'deckle-400' as PaperStock,
                name: '400gsm French Deckled',
                badge: 'Heirloom',
                desc: 'Heavyweight cardstock with subtle hand-torn deckled edges for vintage ephemera lovers.',
              },
            ].map((stock) => {
              const isSelected = postcard.paperStock === stock.id;
              return (
                <button
                  key={stock.id}
                  onClick={() => onChangePostcard({ paperStock: stock.id })}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#5D3BE0] bg-[#F6F2FF] ring-1 ring-[#5D3BE0]'
                      : 'border-[#EDE9FE] bg-white hover:border-[#924DF0]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#181445]">{stock.name}</span>
                      <span className="text-[9px] font-semibold text-[#5D3BE0] bg-[#EDE9FE] px-1.5 py-0.2 rounded-xs">
                        {stock.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#484555] leading-relaxed">{stock.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#EDE9FE] text-[10px] text-[#797587] font-mono">
                    Archival 100+ Years
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Editor Footer CTA Bar */}
      <div className="pt-4 border-t border-[#EDE9FE] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-[#484555]">
          <span>Includes 1x Archival Postcard + Airmail Franking: </span>
          <span className="font-bold text-[#181445]">$4.90 Total (Worldwide)</span>
        </div>

        <button
          onClick={onDispatchClick}
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-[#5D3BE0] hover:bg-[#4c2ec4] active:scale-[0.98] rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D3BE0]"
        >
          <Mail className="w-4 h-4" />
          <span>Dispatch to Recipient</span>
          <span className="text-xs opacity-80">($4.90)</span>
        </button>
      </div>
    </div>
  );
};
