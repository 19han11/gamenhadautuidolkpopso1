import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Globe, Smartphone, Users, Heart, Share2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
  onSimulateVote?: (fanName: string, comment: string) => void;
}

export const QrModal: React.FC<QrModalProps> = ({
  isOpen,
  onClose,
  roomCode,
  onSimulateVote,
}) => {
  const [copied, setCopied] = useState(false);
  const [simName, setSimName] = useState('Fan K-Pop Hà Nội');
  const [simComment, setSimComment] = useState('Nhóm nhạc đỉnh chóp visual 10/10! 💖');

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const votingUrl = `${currentOrigin}/?room=${encodeURIComponent(roomCode)}&role=audience`;

  const handleCopy = () => {
    navigator.clipboard.writeText(votingUrl);
    setCopied(true);
    sound.playBuy();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimVote = () => {
    if (onSimulateVote) {
      onSimulateVote(simName, simComment);
      sound.playVote();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 border border-pink-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-center relative shadow-2xl shadow-pink-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold mb-3">
          <Globe className="w-4 h-4 text-pink-400" />
          <span>ĐƯỜNG LINK BÌNH CHỌN DÀNH CHO KHÁN GIẢ</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">
          Khán Giả Truy Cập Link Để Bình Chọn
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
          Khán giả và bạn bè truy cập đường link bên dưới từ bất kỳ trình duyệt điện thoại hoặc máy tính nào để xem các màn ra mắt và bình chọn nhóm idol yêu thích trong thời gian thực.
        </p>

        {/* Highlighted URL Display Box */}
        <div className="my-6 bg-slate-950 p-4 rounded-2xl border-2 border-pink-500/60 shadow-xl shadow-pink-950/40 text-left">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-pink-400" />
              Đường link bình chọn phòng <strong className="text-amber-300 font-mono">#{roomCode}</strong>:
            </span>
            <span className="text-[11px] text-emerald-400 font-bold">● Đang mở kết nối</span>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
            <span className="font-mono text-xs sm:text-sm text-pink-300 break-all select-all font-semibold">
              {votingUrl}
            </span>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={handleCopy}
              className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-black rounded-xl transition shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>ĐÃ SAO CHÉP LINK BÌNH CHỌN!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>SAO CHÉP ĐƯỜNG LINK BÌNH CHỌN</span>
                </>
              )}
            </button>

            <a
              href={votingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-pink-400" />
              <span>Mở Tab Khán Giả</span>
            </a>
          </div>
        </div>

        {/* Steps Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-xs mb-6">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <span className="text-pink-400 font-bold block mb-1">Bước 1:</span>
            <span className="text-slate-400 text-[11px]">Sao chép đường link trên gửi vào nhóm chat (Zalo, Messenger, Telegram...)</span>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <span className="text-pink-400 font-bold block mb-1">Bước 2:</span>
            <span className="text-slate-400 text-[11px]">Khán giả mở link trên điện thoại của mình để xem đội hình 5 nhóm nhạc</span>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <span className="text-pink-400 font-bold block mb-1">Bước 3:</span>
            <span className="text-slate-400 text-[11px]">Bấm bình chọn và gửi biểu cảm lightstick cổ vũ trực tiếp trên màn hình</span>
          </div>
        </div>

        {/* Test Voting Simulator Box */}
        {onSimulateVote && (
          <div className="pt-4 border-t border-slate-800/80 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Gửi nhanh 1 phiếu bầu thử nghiệm (Dành cho chủ phòng test):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                placeholder="Tên khán giả..."
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-pink-500"
              />
              <input
                type="text"
                value={simComment}
                onChange={(e) => setSimComment(e.target.value)}
                placeholder="Lời chúc, cổ vũ..."
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-pink-500"
              />
            </div>
            <button
              onClick={handleSimVote}
              className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-pink-600/30 active:scale-95 transition"
            >
              <Heart className="w-3.5 h-3.5" /> Gửi 1 Phiếu Bầu Thử Nghiệm Từ Khán Giả Này
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
