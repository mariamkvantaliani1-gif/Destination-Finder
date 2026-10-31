import React, { useState } from 'react';
import { Send, Menu, X, Sparkles, Compass, History, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'curated' | 'archive' | 'craft';
  onSelectTab: (tab: 'studio' | 'curated' | 'archive' | 'craft') => void;
  onOpenDispatchModal: () => void;
  dispatchedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenDispatchModal,
  dispatchedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fcf8ff]/90 backdrop-blur-md border-b border-[#EDE9FE] transition-colors">
      {/* Top Airmail Accent Ribbon Strip */}
      <div className="h-1 w-full airmail-strip opacity-85" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element Brand Zone */}
          <button
            onClick={() => {
              onSelectTab('studio');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D3BE0] rounded-md px-1 py-0.5"
          >
            <div className="w-8 h-8 rounded-md bg-[#5D3BE0] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Send className="w-4 h-4 transform -rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#181445] whitespace-nowrap shrink-0">
                Postmark<span className="text-[#5D3BE0]">.</span>
              </span>
              <span className="label-stamp text-[9px] text-[#484555] tracking-[0.2em] -mt-1 hidden sm:inline">
                Atelier Postal · 1928
              </span>
            </div>
          </button>

          {/* Zone 2: Nav Links - single-line text links with subtle hover/active state */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#484555]">
            <button
              onClick={() => onSelectTab('studio')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 ${
                activeTab === 'studio'
                  ? 'text-[#4514c9] border-[#5D3BE0] font-semibold'
                  : 'border-transparent hover:text-[#181445]'
              }`}
            >
              Studio Dispatch
            </button>
            <button
              onClick={() => onSelectTab('curated')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 ${
                activeTab === 'curated'
                  ? 'text-[#4514c9] border-[#5D3BE0] font-semibold'
                  : 'border-transparent hover:text-[#181445]'
              }`}
            >
              Curated Series
            </button>
            <button
              onClick={() => onSelectTab('archive')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'archive'
                  ? 'text-[#4514c9] border-[#5D3BE0] font-semibold'
                  : 'border-transparent hover:text-[#181445]'
              }`}
            >
              <span>Dispatch Ledger</span>
              {dispatchedCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-[#E9E5FF] text-[#4514c9] rounded-sm tabular-nums">
                  {dispatchedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onSelectTab('craft')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 ${
                activeTab === 'craft'
                  ? 'text-[#4514c9] border-[#5D3BE0] font-semibold'
                  : 'border-transparent hover:text-[#181445]'
              }`}
            >
              Paper & Craft
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenDispatchModal}
              className="px-4 py-2 text-xs md:text-sm font-medium text-white bg-[#5D3BE0] hover:bg-[#4c2ec4] active:scale-[0.98] rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D3BE0] focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Postcard</span>
              <span className="text-xs opacity-80 font-normal">($4.90)</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#484555] hover:text-[#181445] hover:bg-[#E9E5FF] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ffffff] border-b border-[#EDE9FE] px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              onSelectTab('studio');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
              activeTab === 'studio' ? 'bg-[#F6F2FF] text-[#4514c9]' : 'text-[#484555] hover:bg-[#F6F2FF]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#5D3BE0]" />
            <span>Studio Dispatch</span>
          </button>
          <button
            onClick={() => {
              onSelectTab('curated');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
              activeTab === 'curated' ? 'bg-[#F6F2FF] text-[#4514c9]' : 'text-[#484555] hover:bg-[#F6F2FF]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#5D3BE0]" />
            <span>Curated Series</span>
          </button>
          <button
            onClick={() => {
              onSelectTab('archive');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
              activeTab === 'archive' ? 'bg-[#F6F2FF] text-[#4514c9]' : 'text-[#484555] hover:bg-[#F6F2FF]'
            }`}
          >
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-[#5D3BE0]" />
              <span>Dispatch Ledger</span>
            </div>
            {dispatchedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold bg-[#E9E5FF] text-[#4514c9] rounded-sm">
                {dispatchedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              onSelectTab('craft');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
              activeTab === 'craft' ? 'bg-[#F6F2FF] text-[#4514c9]' : 'text-[#484555] hover:bg-[#F6F2FF]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#5D3BE0]" />
            <span>Paper & Craft</span>
          </button>
        </div>
      )}
    </header>
  );
};
