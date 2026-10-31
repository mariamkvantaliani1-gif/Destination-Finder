import React, { useState } from 'react';
import { Header } from './components/Header';
import { PostcardCanvas } from './components/PostcardCanvas';
import { PostcardEditor } from './components/PostcardEditor';
import { CuratedGallery } from './components/CuratedGallery';
import { DispatchArchive } from './components/DispatchArchive';
import { PaperCraftStory } from './components/PaperCraftStory';
import { DispatchModal } from './components/DispatchModal';
import { Footer } from './components/Footer';
import { INITIAL_ARCHIVE, INITIAL_POSTCARD, POSTAGE_STAMPS } from './data/mockData';
import { CuratedCardItem, DispatchedPostcard, PostcardData } from './types/postcard';
import { Sparkles, Send, RefreshCw, Eye, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'curated' | 'archive' | 'craft'>('studio');
  const [postcard, setPostcard] = useState<PostcardData>(INITIAL_POSTCARD);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [dispatchedList, setDispatchedList] = useState<DispatchedPostcard[]>(INITIAL_ARCHIVE);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleUpdatePostcard = (updated: Partial<PostcardData>) => {
    setPostcard((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectCuratedItem = (item: CuratedCardItem) => {
    // Map matching stamp
    const stampMatch =
      POSTAGE_STAMPS.find((s) => s.theme === item.stampTheme) || POSTAGE_STAMPS[0];

    setPostcard({
      ...postcard,
      id: `custom-${Date.now()}`,
      title: item.title,
      location: item.location,
      coordinates: item.coordinates,
      photoUrl: item.photoUrl,
      message: item.sampleMessage,
      recipient: item.sampleRecipient,
      stamp: stampMatch,
      cancellationCity: `POSTE DE ${item.location.split(',')[0].toUpperCase()}`,
      cancellationDate: '24 OCT 2026',
    });

    setActiveTab('studio');
    showToast(`"${item.title}" loaded into Studio Dispatch`);
  };

  const handleQuickDispatch = (item: CuratedCardItem) => {
    handleSelectCuratedItem(item);
    setDispatchModalOpen(true);
  };

  const handleDispatchSuccess = (newRecord: DispatchedPostcard) => {
    setDispatchedList([newRecord, ...dispatchedList]);
    showToast(`Dispatched! Tracking code: ${newRecord.trackingNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#181445] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181445] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-[#EDE9FE]/20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#5D3BE0]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenDispatchModal={() => setDispatchModalOpen(true)}
        dispatchedCount={dispatchedList.length}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ================= STUDIO TAB ================= */}
        {activeTab === 'studio' && (
          <div className="space-y-12">
            {/* Hero Header Strip */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#EDE9FE]">
              <div className="max-w-2xl space-y-2">
                <span className="label-stamp text-[#5D3BE0] tracking-[0.2em] block">
                  DIGITAL TO PHYSICAL MEMORY ATELIER
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181445] leading-[1.15]">
                  Turn Fleeting Moments into Tangible Postcards.
                </h1>
                <p className="text-sm sm:text-base text-[#484555] leading-relaxed">
                  Compose your handwritten note, affix an authentic philatelic stamp, and we'll print your photograph on heavyweight 350gsm linen cardstock and dispatch it anywhere in the world.
                </p>
              </div>

              {/* Trust Callouts Strip */}
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 text-xs font-medium text-[#484555] bg-white p-3.5 rounded-xl border border-[#EDE9FE] shadow-xs shrink-0">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#5D3BE0]" />
                  <span>350gsm Linen Cardstock</span>
                </div>
                <span className="text-[#c9c4d8] hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#181445] font-mono">$4.90 Flat</span>
                  <span>Worldwide Airmail</span>
                </div>
                <span className="text-[#c9c4d8] hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                  <span>Dispatched in 24h</span>
                </div>
              </div>
            </div>

            {/* Split Interactive Workbench: Left = 3D Postcard Canvas, Right = Editor Suite */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Live 3D Postcard Canvas Proof (5 cols on lg) */}
              <div className="lg:col-span-6 sticky top-24 space-y-4">
                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EDE9FE] shadow-xs">
                  <PostcardCanvas
                    postcard={postcard}
                    isFlipped={isFlipped}
                    onToggleFlip={() => setIsFlipped(!isFlipped)}
                  />
                </div>

                {/* Quick Hint Card */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE9FE] flex items-center justify-between text-xs text-[#484555]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5D3BE0]" />
                    <span>Real-time print proof. Everything you edit updates live on cardstock.</span>
                  </div>
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="text-[#5D3BE0] font-semibold hover:underline cursor-pointer"
                  >
                    Flip Side
                  </button>
                </div>
              </div>

              {/* Right Column: Customization Suite (6 cols on lg) */}
              <div className="lg:col-span-6 space-y-4">
                <PostcardEditor
                  postcard={postcard}
                  onChangePostcard={handleUpdatePostcard}
                  onDispatchClick={() => setDispatchModalOpen(true)}
                />
              </div>
            </div>

            {/* Curated Series Showcase on Studio Page */}
            <div className="pt-10 border-t border-[#EDE9FE]">
              <CuratedGallery
                onSelectCuratedItem={handleSelectCuratedItem}
                onQuickDispatch={handleQuickDispatch}
                activePostcardId={postcard.id}
              />
            </div>
          </div>
        )}

        {/* ================= CURATED SERIES TAB ================= */}
        {activeTab === 'curated' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <CuratedGallery
              onSelectCuratedItem={handleSelectCuratedItem}
              onQuickDispatch={handleQuickDispatch}
              activePostcardId={postcard.id}
            />
          </div>
        )}

        {/* ================= ARCHIVE & LEDGER TAB ================= */}
        {activeTab === 'archive' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <DispatchArchive
              dispatchedList={dispatchedList}
              onInspectItem={(item) => {
                setPostcard(item);
                setActiveTab('studio');
                showToast(`Loaded ${item.title} into Studio`);
              }}
              onSendAnotherClick={() => setActiveTab('studio')}
            />
          </div>
        )}

        {/* ================= PAPER & CRAFT TAB ================= */}
        {activeTab === 'craft' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <PaperCraftStory onStartDispatch={() => setActiveTab('studio')} />
          </div>
        )}
      </main>

      {/* Dispatch & Checkout Modal */}
      <DispatchModal
        postcard={postcard}
        isOpen={dispatchModalOpen}
        onClose={() => setDispatchModalOpen(false)}
        onDispatchSuccess={handleDispatchSuccess}
        onGoToArchive={() => setActiveTab('archive')}
      />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
