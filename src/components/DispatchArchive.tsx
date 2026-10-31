import React, { useState } from 'react';
import { DispatchedPostcard } from '../types/postcard';
import { PostcardCanvas } from './PostcardCanvas';
import {
  History,
  Search,
  ExternalLink,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  X,
  FileCheck,
} from 'lucide-react';

interface DispatchArchiveProps {
  dispatchedList: DispatchedPostcard[];
  onInspectItem: (item: DispatchedPostcard) => void;
  onSendAnotherClick: () => void;
}

export const DispatchArchive: React.FC<DispatchArchiveProps> = ({
  dispatchedList,
  onInspectItem,
  onSendAnotherClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_transit' | 'delivered'>('all');
  const [inspectedCard, setInspectedCard] = useState<DispatchedPostcard | null>(null);
  const [isFlippedInspect, setIsFlippedInspect] = useState(false);

  const filtered = dispatchedList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'delivered') return matchesSearch && item.status === 'delivered';
    return matchesSearch && item.status !== 'delivered';
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EDE9FE] pb-4">
        <div>
          <span className="label-stamp text-[#5D3BE0] tracking-[0.18em] block mb-1">
            OFFICIAL POSTAL REGISTRY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181445]">
            Dispatch Ledger & Transit Archive
          </h2>
          <p className="text-sm text-[#484555] mt-1 max-w-xl">
            Live physical tracking and high-fidelity proofs for all postcards dispatched across global postal partners.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#797587] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by recipient or tracking..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#EDE9FE] bg-white text-[#181445] placeholder-[#797587] focus:outline-none focus:ring-2 focus:ring-[#5D3BE0] w-56"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#F6F2FF] rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-[#4514c9] shadow-xs'
                  : 'text-[#484555] hover:text-[#181445]'
              }`}
            >
              All ({dispatchedList.length})
            </button>
            <button
              onClick={() => setStatusFilter('in_transit')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                statusFilter === 'in_transit'
                  ? 'bg-white text-[#4514c9] shadow-xs'
                  : 'text-[#484555] hover:text-[#181445]'
              }`}
            >
              In Transit
            </button>
            <button
              onClick={() => setStatusFilter('delivered')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                statusFilter === 'delivered'
                  ? 'bg-white text-[#4514c9] shadow-xs'
                  : 'text-[#484555] hover:text-[#181445]'
              }`}
            >
              Delivered
            </button>
          </div>
        </div>
      </div>

      {/* Dispatched Postcards Table / Card List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-[#EDE9FE] space-y-3">
          <History className="w-10 h-10 text-[#c9c4d8] mx-auto" />
          <h3 className="text-base font-bold text-[#181445]">No Dispatched Cards Found</h3>
          <p className="text-xs text-[#484555] max-w-sm mx-auto">
            Try adjusting your search criteria or create your first tactile postcard dispatch in the studio.
          </p>
          <button
            onClick={onSendAnotherClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#5D3BE0] hover:bg-[#4c2ec4] rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Create New Dispatch ($4.90)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isDelivered = item.status === 'delivered';
            return (
              <div
                key={item.trackingNumber}
                className="bg-white rounded-xl border border-[#EDE9FE] p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Status & Tracking */}
                  <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-2.5 mb-3">
                    <span className="font-mono text-xs font-bold text-[#181445] tracking-wide">
                      {item.trackingNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs">
                      {isDelivered ? (
                        <span className="flex items-center gap-1 text-[#166534] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                          <span>Delivered</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[#5D3BE0] font-medium">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Airmail Transit</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail & Info */}
                  <div className="flex gap-3.5">
                    <div className="w-24 h-16 rounded-md overflow-hidden bg-[#EDE9FE] shrink-0 border border-[#EDE9FE] group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.photoUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-[#181445] truncate group-hover:text-[#5D3BE0] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#484555] flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#5D3BE0] shrink-0" />
                        <span>{item.location}</span>
                      </p>
                      <p className="text-[11px] text-[#797587] mt-1 truncate">
                        To: <strong className="text-[#181445]">{item.recipient.fullName}</strong> ({item.recipient.country})
                      </p>
                    </div>
                  </div>

                  {/* Timeline status note */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#EDE9FE] text-[11px] text-[#484555] flex items-center justify-between">
                    <span className="text-[#797587]">Dispatched {item.dispatchedAt}</span>
                    <span className="font-medium text-[#181445] truncate max-w-[140px] text-right">
                      {item.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Inspect Proof Button */}
                <div className="mt-4 pt-3 border-t border-[#EDE9FE] flex items-center gap-2">
                  <button
                    onClick={() => {
                      setInspectedCard(item);
                      setIsFlippedInspect(false);
                    }}
                    className="w-full py-1.5 px-3 text-xs font-semibold text-[#5D3BE0] bg-[#FAF7FF] hover:bg-[#EDE9FE] border border-[#5D3BE0] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Proof (Front & Reverse)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= INSPECT MODAL ================= */}
      {inspectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181445]/65 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#EDE9FE] p-4 sm:p-6 space-y-4 shadow-2xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-3">
              <div>
                <span className="label-stamp text-[9px] text-[#5D3BE0]">ARCHIVAL PHYSICAL PROOF</span>
                <h3 className="text-base sm:text-lg font-bold text-[#181445]">
                  {inspectedCard.title} · {inspectedCard.trackingNumber}
                </h3>
              </div>
              <button
                onClick={() => setInspectedCard(null)}
                className="p-1.5 text-[#484555] hover:text-[#181445] hover:bg-[#EDE9FE] rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Postcard Canvas */}
            <PostcardCanvas
              postcard={inspectedCard}
              isFlipped={isFlippedInspect}
              onToggleFlip={() => setIsFlippedInspect(!isFlippedInspect)}
            />

            {/* Detailed Proof Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE9FE] text-xs">
              <div>
                <span className="label-stamp text-[8px] text-[#797587] block">CARRIER</span>
                <span className="font-semibold text-[#181445]">Priority Airmail</span>
              </div>
              <div>
                <span className="label-stamp text-[8px] text-[#797587] block">CARDSTOCK</span>
                <span className="font-semibold text-[#181445]">350gsm Linen</span>
              </div>
              <div>
                <span className="label-stamp text-[8px] text-[#797587] block">PIGMENT</span>
                <span className="font-semibold text-[#181445]">UltraChrome Archival</span>
              </div>
              <div>
                <span className="label-stamp text-[8px] text-[#797587] block">DESTINATION</span>
                <span className="font-semibold text-[#181445] truncate block">
                  {inspectedCard.recipient.country}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#EDE9FE]">
              <button
                onClick={() => setInspectedCard(null)}
                className="px-4 py-2 text-xs font-semibold text-[#181445] bg-[#F6F2FF] hover:bg-[#EDE9FE] rounded-lg transition-colors cursor-pointer"
              >
                Close Proof
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
