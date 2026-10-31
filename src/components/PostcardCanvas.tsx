import React, { useState } from 'react';
import { PostcardData } from '../types/postcard';
import { PostalStampView } from './PostalStampView';
import { RefreshCw, Maximize2, Volume2, VolumeX, Sparkles, MapPin, Calendar, Heart } from 'lucide-react';
import { playTactileFlipSound } from '../utils/audio';

interface PostcardCanvasProps {
  postcard: PostcardData;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onOpenInspectModal?: () => void;
}

export const PostcardCanvas: React.FC<PostcardCanvasProps> = ({
  postcard,
  isFlipped,
  onToggleFlip,
  onOpenInspectModal,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleFlip = () => {
    if (soundEnabled) {
      playTactileFlipSound();
    }
    onToggleFlip();
  };

  const getInkColorHex = () => {
    switch (postcard.inkColor) {
      case 'bistre':
        return '#4A3728'; // Sepia bistre
      case 'spruce':
        return '#14382B'; // Dark spruce green
      case 'violet':
        return '#4514C9'; // Electric violet
      case 'navy':
      default:
        return '#181445'; // French charcoal navy
    }
  };

  const getFontFamily = () => {
    switch (postcard.handwritingFont) {
      case 'caveat-bold':
        return "'Caveat', cursive; font-weight: 700;";
      case 'roboto-flex':
        return "'Roboto Flex', sans-serif; font-weight: 400;";
      case 'space-mono':
        return "'Space Mono', monospace; font-size: 13px;";
      case 'caveat':
      default:
        return "'Caveat', cursive; font-weight: 500; font-size: 20px;";
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Canvas Utility Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="label-stamp text-[10px] text-[#484555] bg-[#E9E5FF] px-2 py-0.5 rounded-sm">
            {isFlipped ? 'REVERSE · WRITING & FRANKING' : 'FACE · 3:2 PHOTO CARDSTOCK'}
          </span>
          <span className="text-xs text-[#797587] hidden sm:inline">
            {postcard.paperStock === 'linen-350'
              ? '350gsm Heavy Linen'
              : postcard.paperStock === 'cotton-320'
              ? '320gsm Cotton Rag'
              : '400gsm French Deckled'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute/Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 text-[#484555] hover:text-[#181445] hover:bg-[#E9E5FF] rounded-md transition-colors cursor-pointer text-xs flex items-center gap-1"
            title={soundEnabled ? 'Disable paper flip sound' : 'Enable paper flip sound'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#5D3BE0]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Inspect Fullscreen */}
          {onOpenInspectModal && (
            <button
              onClick={onOpenInspectModal}
              className="p-1.5 text-[#484555] hover:text-[#181445] hover:bg-[#E9E5FF] rounded-md transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Expand inspect proof"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Proof View</span>
            </button>
          )}

          {/* Tactile Flip Action Button */}
          <button
            onClick={handleFlip}
            className="px-3 py-1.5 text-xs font-semibold text-[#5D3BE0] bg-[#FFFFFF] hover:bg-[#EDE9FE] active:scale-[0.97] border border-[#5D3BE0] rounded-md shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? 'Flip to Photo' : 'Flip to Message'}</span>
          </button>
        </div>
      </div>

      {/* 3D Perspective Card Container */}
      <div className="w-full max-w-2xl perspective-1000 py-2">
        <div
          onClick={handleFlip}
          className={`relative w-full aspect-[3/2] cursor-pointer transition-transform duration-700 transform-style-preserve-3d select-none rounded-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            boxShadow:
              '0 4px 14px -2px rgba(93, 59, 224, 0.09), 0 16px 32px -4px rgba(24, 20, 69, 0.15)',
          }}
          title="Click postcard to flip sides"
        >
          {/* ===================== FRONT FACE (PHOTO) ===================== */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-white border border-[#EDE9FE] p-3 sm:p-4 flex flex-col justify-between overflow-hidden paper-grain">
            {/* White Envelope Paper Border Framing the Photo */}
            <div className="relative w-full flex-1 rounded-lg overflow-hidden bg-[#F6F2FF] border border-[#E9E5FF] shadow-inner group">
              {imageError ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EDE9FE] to-[#F6F2FF] text-[#181445]">
                  <MapPin className="w-10 h-10 text-[#5D3BE0] mb-2" />
                  <span className="font-semibold text-base">{postcard.title}</span>
                  <span className="text-xs text-[#484555] mt-1">{postcard.location}</span>
                </div>
              ) : (
                <img
                  src={postcard.photoUrl}
                  alt={postcard.title}
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              )}

              {/* Embossed Corner Ephemera Stamp */}
              <div className="absolute top-2.5 left-2.5 bg-black/45 backdrop-blur-md text-white px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase border border-white/20">
                POSTMARK NO. {postcard.id.slice(0, 8)}
              </div>

              {/* Coordinates Overlay Scrim at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-6 flex items-end justify-between text-white">
                <div className="space-y-0.5">
                  <p className="text-sm sm:text-base font-bold tracking-tight drop-shadow-sm">
                    {postcard.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/90 flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-[#c9beff]" />
                    <span>{postcard.location}</span>
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="label-stamp text-[9px] text-[#e6deff] block tracking-widest">
                    {postcard.coordinates}
                  </span>
                  <span className="text-[10px] text-white/80 font-mono">
                    {postcard.dateCaptured}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Deckled Caption Strip */}
            <div className="pt-2 sm:pt-2.5 flex items-center justify-between text-[11px] text-[#484555]">
              <div className="flex items-center gap-2">
                <span className="label-stamp text-[#5D3BE0] text-[9px]">
                  EDITION 1/1 ARCHIVAL CARDSTOCK
                </span>
                <span className="text-[#c9c4d8]">·</span>
                <span className="font-mono text-[10px] text-[#797587] truncate max-w-[160px] sm:max-w-none">
                  {postcard.coordinates}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#797587]">
                <Calendar className="w-3 h-3" />
                <span>{postcard.dateCaptured}</span>
              </div>
            </div>
          </div>

          {/* ===================== BACK FACE (REVERSE DISPATCH) ===================== */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-[#FAF7F2] border border-[#E9E5FF] p-4 sm:p-6 flex flex-col justify-between overflow-hidden paper-grain">
            {/* Top Airmail Strip & Header */}
            <div className="flex items-center justify-between border-b border-[#E3DFFF] pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="label-stamp text-[9px] sm:text-[10px] text-[#181445] tracking-[0.18em]">
                  CARTE POSTALE · POST CARD
                </span>
                <span className="text-[8px] font-mono text-[#797587] hidden sm:inline">
                  (UNIVERSAL POSTAL UNION)
                </span>
              </div>

              {/* Airmail Blue & Red Wing Insignia */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#181445] text-white text-[8px] sm:text-[9px] font-mono font-bold tracking-wider">
                <span className="text-[#38BDF8]">PAR AVION</span>
                <span>/</span>
                <span className="text-[#F87171]">BY AIR MAIL</span>
              </div>
            </div>

            {/* Main Postcard Body Split: Left = Message, Right = Stamp & Recipient Address */}
            <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-6 relative">
              {/* Vertical Dividing Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E3DFFF] -translate-x-1/2 flex items-center justify-center pointer-events-none">
                <span className="label-stamp text-[7px] text-[#797587]/70 rotate-90 whitespace-nowrap tracking-[0.25em] bg-[#FAF7F2] px-2">
                  POSTMARK ATELIER DISPATCH
                </span>
              </div>

              {/* LEFT COLUMN: Handwritten Message */}
              <div className="pr-1 sm:pr-2 flex flex-col justify-between overflow-hidden">
                <div className="space-y-1.5">
                  <div className="text-[10px] sm:text-[11px] font-mono text-[#797587] uppercase tracking-wider flex items-center justify-between">
                    <span>{postcard.location.split(',')[0]}</span>
                    <span>{postcard.cancellationDate}</span>
                  </div>

                  <p
                    className="leading-relaxed transition-all whitespace-pre-wrap break-words line-clamp-6 sm:line-clamp-8"
                    style={{
                      fontFamily:
                        postcard.handwritingFont === 'space-mono'
                          ? "'Space Mono', monospace"
                          : postcard.handwritingFont === 'roboto-flex'
                          ? "'Roboto Flex', sans-serif"
                          : "'Caveat', cursive",
                      fontSize:
                        postcard.handwritingFont === 'space-mono'
                          ? '11px'
                          : postcard.handwritingFont === 'roboto-flex'
                          ? '12px'
                          : '18px',
                      fontWeight: postcard.handwritingFont === 'caveat-bold' ? 700 : 500,
                      color: getInkColorHex(),
                    }}
                  >
                    {postcard.message}
                  </p>
                </div>

                {/* Sign-off */}
                <div
                  className="pt-2 text-right"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: getInkColorHex(),
                  }}
                >
                  <span className="text-xs font-mono text-[#797587] mr-1 block sm:inline">Sent with care,</span>
                  <span>{postcard.senderName}</span>
                </div>
              </div>

              {/* RIGHT COLUMN: Philatelic Stamp & Address Block */}
              <div className="pl-1 sm:pl-2 flex flex-col justify-between">
                {/* Upper Right Stamp Box */}
                <div className="flex justify-end pr-1 pt-0.5">
                  <PostalStampView
                    stamp={postcard.stamp}
                    cancellationCity={postcard.cancellationCity}
                    cancellationDate={postcard.cancellationDate}
                    showCancellation={true}
                    size="md"
                  />
                </div>

                {/* Lined Stationery Address Block */}
                <div className="space-y-2 pb-1">
                  <div className="border-b border-[#797587]/35 pb-0.5">
                    <span className="label-stamp text-[8px] text-[#797587] block">RECIPIENT / DESTINATAIRE</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#181445] block font-mono truncate">
                      {postcard.recipient.fullName || 'Recipient Name'}
                    </span>
                  </div>

                  <div className="border-b border-[#797587]/35 pb-0.5">
                    <span className="text-xs sm:text-[13px] text-[#181445] font-mono block truncate">
                      {postcard.recipient.streetAddress} {postcard.recipient.apartmentSuite}
                    </span>
                  </div>

                  <div className="border-b border-[#797587]/35 pb-0.5">
                    <span className="text-xs sm:text-[13px] text-[#181445] font-mono block truncate">
                      {postcard.recipient.city}, {postcard.recipient.stateProvince} {postcard.recipient.postalCode}
                    </span>
                  </div>

                  <div className="border-b-2 border-[#181445] pb-0.5">
                    <span className="text-xs sm:text-sm font-bold text-[#181445] font-mono tracking-wider uppercase block truncate">
                      {postcard.recipient.country || 'UNITED STATES'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Reverse Footer Bar */}
            <div className="pt-2 border-t border-[#E3DFFF] flex items-center justify-between text-[9px] text-[#797587] font-mono">
              <span>PRIORITY AIRMAIL FRANKING · 350 GSM LINEN</span>
              <span className="label-stamp text-[8px] text-[#5D3BE0]">
                DISPATCH AUTHENTICATED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Helper Indicator */}
      <div className="flex items-center gap-3 mt-3 text-xs text-[#484555]">
        <button
          onClick={handleFlip}
          className="text-[#5D3BE0] font-medium hover:underline flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Click card to inspect reverse writing & stamp</span>
        </button>
      </div>
    </div>
  );
};
