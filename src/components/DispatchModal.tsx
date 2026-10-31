import React, { useState } from 'react';
import { PostcardData, DispatchedPostcard } from '../types/postcard';
import { playDispatchStampSound } from '../utils/audio';
import {
  X,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  FileText,
  Truck,
  Sparkles,
} from 'lucide-react';

interface DispatchModalProps {
  postcard: PostcardData;
  isOpen: boolean;
  onClose: () => void;
  onDispatchSuccess: (dispatched: DispatchedPostcard) => void;
  onGoToArchive: () => void;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  postcard,
  isOpen,
  onClose,
  onDispatchSuccess,
  onGoToArchive,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchedRecord, setDispatchedRecord] = useState<DispatchedPostcard | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDispatch = () => {
    setIsSubmitting(true);
    playDispatchStampSound();

    setTimeout(() => {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const countryCode =
        postcard.recipient.country === 'United Kingdom'
          ? 'GBR'
          : postcard.recipient.country === 'France'
          ? 'FRA'
          : postcard.recipient.country === 'Japan'
          ? 'JPN'
          : 'USA';

      const newRecord: DispatchedPostcard = {
        ...postcard,
        trackingNumber: `POST-${randomDigits}-${countryCode}`,
        dispatchedAt: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        estimatedDelivery: '3–5 Business Days (Priority Airmail)',
        status: 'printing',
      };

      setDispatchedRecord(newRecord);
      onDispatchSuccess(newRecord);
      setIsSubmitting(false);
    }, 1400);
  };

  const handleCopyTracking = () => {
    if (dispatchedRecord) {
      navigator.clipboard.writeText(dispatchedRecord.trackingNumber);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181445]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#EDE9FE] overflow-hidden flex flex-col max-h-[92vh]"
        style={{
          boxShadow: '0 20px 40px -8px rgba(30, 27, 75, 0.28)',
        }}
      >
        {/* Airmail Border Accent */}
        <div className="h-1.5 w-full airmail-strip" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EDE9FE]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5D3BE0]" />
            <h3 className="text-base sm:text-lg font-bold text-[#181445]">
              {dispatchedRecord ? 'Airmail Dispatch Confirmed' : 'Confirm Dispatch & Franking'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#484555] hover:text-[#181445] hover:bg-[#EDE9FE] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {!dispatchedRecord ? (
            <>
              {/* Postcard Summary Card */}
              <div className="flex gap-4 p-3.5 bg-[#F6F2FF] rounded-xl border border-[#EDE9FE]">
                <div className="w-24 h-16 rounded-md overflow-hidden bg-white shrink-0 border border-[#c9c4d8]">
                  <img
                    src={postcard.photoUrl}
                    alt={postcard.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#181445] truncate">{postcard.title}</h4>
                  <p className="text-[11px] text-[#484555] flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#5D3BE0] shrink-0" />
                    <span>{postcard.location}</span>
                  </p>
                  <p className="text-[10px] text-[#797587] font-mono mt-1">
                    {postcard.paperStock === 'linen-350'
                      ? '350gsm Linen'
                      : postcard.paperStock === 'cotton-320'
                      ? '320gsm Cotton'
                      : '400gsm French Deckled'} · Stamp: {postcard.stamp.name}
                  </p>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="p-3.5 bg-white rounded-xl border border-[#EDE9FE] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#181445]">
                  <span>Delivery Destination</span>
                  <span className="label-stamp text-[9px] text-[#5D3BE0]">DOORSTEP TRANSIT</span>
                </div>
                <p className="text-xs font-bold text-[#181445]">
                  {postcard.recipient.fullName || 'Valued Recipient'}
                </p>
                <p className="text-xs text-[#484555]">
                  {postcard.recipient.streetAddress} {postcard.recipient.apartmentSuite}
                </p>
                <p className="text-xs text-[#484555]">
                  {postcard.recipient.city}, {postcard.recipient.stateProvince} {postcard.recipient.postalCode}
                </p>
                <p className="text-xs font-semibold text-[#181445] uppercase">
                  {postcard.recipient.country}
                </p>
              </div>

              {/* Itemized Transparent Invoice */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EDE9FE] space-y-2">
                <span className="label-stamp text-[9px] text-[#797587] block">
                  ITEMIZED POSTAL CHARGES
                </span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#484555]">
                    <span>1x Archival Giclée Postcard (350gsm Heavy Linen)</span>
                    <span className="font-mono text-[#181445]">$3.50</span>
                  </div>
                  <div className="flex justify-between text-[#484555]">
                    <span>International Priority Airmail Franking & Postmark</span>
                    <span className="font-mono text-[#181445]">$1.40</span>
                  </div>
                  <div className="flex justify-between text-[#484555]">
                    <span>Protective Glassine Sleeve & Dispatch Handling</span>
                    <span className="font-mono text-[#5D3BE0] font-semibold">Included</span>
                  </div>
                  <div className="pt-2 border-t border-[#EDE9FE] flex justify-between font-bold text-sm text-[#181445]">
                    <span>Total Amount (Taxes included)</span>
                    <span className="font-mono text-[#4514c9] text-base">$4.90</span>
                  </div>
                </div>
              </div>

              {/* Estimated Dispatch Schedule */}
              <div className="flex items-center gap-2 text-xs text-[#484555] bg-[#F6F2FF] p-2.5 rounded-lg border border-[#EDE9FE]">
                <Clock className="w-4 h-4 text-[#5D3BE0] shrink-0" />
                <span>
                  Estimated print & franking time: <strong>Today within 24h</strong>. Expected delivery in{' '}
                  <strong>3–5 business days</strong>.
                </span>
              </div>
            </>
          ) : (
            /* ================= SUCCESS STATE ================= */
            <div className="space-y-4 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-[#E9E5FF] text-[#5D3BE0] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="label-stamp text-[10px] text-[#5D3BE0] tracking-[0.2em]">
                  POSTAL DISPATCH LOGGED
                </span>
                <h4 className="text-xl font-bold text-[#181445]">
                  Your Postcard is in the Dispatch Queue!
                </h4>
                <p className="text-xs text-[#484555] max-w-sm mx-auto">
                  Our print atelier has received your card. It will be printed on heavy archival cardstock, stamped with the {postcard.stamp.name} stamp, and franked with priority airmail markings.
                </p>
              </div>

              {/* Tracking Code Box */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EDE9FE] flex items-center justify-between max-w-xs mx-auto">
                <div className="text-left">
                  <span className="label-stamp text-[8px] text-[#797587] block">AIRMAIL TRACKING NO.</span>
                  <span className="font-mono font-bold text-sm text-[#181445]">
                    {dispatchedRecord.trackingNumber}
                  </span>
                </div>
                <button
                  onClick={handleCopyTracking}
                  className="px-2.5 py-1 text-xs font-medium text-[#5D3BE0] bg-white hover:bg-[#EDE9FE] border border-[#5D3BE0] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedTracking ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTracking ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* 4-Stage Visual Progress */}
              <div className="grid grid-cols-4 gap-2 text-left pt-2">
                <div className="p-2 bg-[#F6F2FF] rounded-lg border border-[#EDE9FE]">
                  <span className="w-2 h-2 rounded-full bg-[#5D3BE0] block mb-1" />
                  <p className="text-[10px] font-bold text-[#181445]">1. Printing</p>
                  <p className="text-[9px] text-[#484555]">In progress</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#EDE9FE] opacity-60">
                  <span className="w-2 h-2 rounded-full bg-[#c9c4d8] block mb-1" />
                  <p className="text-[10px] font-bold text-[#181445]">2. Franking</p>
                  <p className="text-[9px] text-[#484555]">Queued</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#EDE9FE] opacity-60">
                  <span className="w-2 h-2 rounded-full bg-[#c9c4d8] block mb-1" />
                  <p className="text-[10px] font-bold text-[#181445]">3. Airmail</p>
                  <p className="text-[9px] text-[#484555]">Transit</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#EDE9FE] opacity-60">
                  <span className="w-2 h-2 rounded-full bg-[#c9c4d8] block mb-1" />
                  <p className="text-[10px] font-bold text-[#181445]">4. Doorstep</p>
                  <p className="text-[9px] text-[#484555]">Delivery</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 bg-[#FAF7FF] border-t border-[#EDE9FE] flex items-center justify-end gap-3">
          {!dispatchedRecord ? (
            <>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-[#484555] hover:text-[#181445] hover:bg-[#EDE9FE] rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDispatch}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#5D3BE0] hover:bg-[#4c2ec4] active:scale-[0.98] rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Franking & Stamping...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Frank & Dispatch ($4.90)</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#484555] hover:text-[#181445] hover:bg-[#EDE9FE] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onGoToArchive();
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#5D3BE0] hover:bg-[#4c2ec4] rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Track in Dispatch Ledger</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
