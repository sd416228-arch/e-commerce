import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import { EsewaAccount } from '../types';

interface EsewaPaymentOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (otp: string) => void;
  amount: number;
  esewaAccount: EsewaAccount | null;
}

export const EsewaPaymentOtpModal: React.FC<EsewaPaymentOtpModalProps> = ({
  isOpen,
  onClose,
  onConfirmPayment,
  amount,
  esewaAccount
}) => {
  const [otp, setOtp] = useState('719304');
  const [timer, setTimer] = useState(180);
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setErrorMsg('Please enter the 6-digit transaction OTP.');
      return;
    }
    setErrorMsg('');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmPayment(otp.trim());
    }, 800);
  };

  const handleResend = () => {
    setTimer(180);
    setOtp('904182');
    setErrorMsg('A fresh payment OTP has been sent via SMS.');
    setTimeout(() => setErrorMsg(''), 2500);
  };

  const maskedId = esewaAccount?.esewaId
    ? esewaAccount.esewaId.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')
    : '9841****67';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[420px] rounded-3xl bg-white shadow-2xl overflow-hidden border border-stone-200 text-stone-800">
        
        {/* Green Branded Header */}
        <div className="relative bg-[#22c55e] pt-6 pb-5 px-6 text-white text-center rounded-b-[2rem] shadow-md">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/15 hover:bg-black/25 text-white transition-colors"
            aria-label="Cancel Payment"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md mb-2">
            <span className="text-xl font-black text-[#22c55e] tracking-tighter">
              eS
            </span>
          </div>

          <h2 className="text-lg font-bold tracking-tight">
            Authorize Payment
          </h2>
          <p className="text-xs text-white/90 font-light mt-0.5">
                    Merchant: SD Infininov Clothing Store
          </p>
        </div>

        {/* Payment Summary Box */}
        <div className="p-5 sm:p-6 space-y-4">
          
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-center">
            <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
              Amount to Deduct
            </span>
            <div className="text-3xl font-black text-stone-900 mt-0.5">
              Rs. {amount.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-stone-600">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Linked Wallet: <strong>{maskedId}</strong></span>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Demo OTP Autofill */}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-xs text-emerald-800">
            <span>Demo Payment OTP: <strong>719304</strong></span>
            <button
              type="button"
              onClick={() => setOtp('719304')}
              className="text-[11px] underline font-bold hover:text-emerald-950"
            >
              Use Code
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-bold text-stone-800">
                  Enter 6-Digit Payment OTP
                </label>
                <span className="italic text-stone-500 font-medium">
                  Expires in: <strong className="text-stone-800">{timer}s</strong>
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit OTP"
                className="w-full tracking-widest text-center text-xl font-bold rounded-xl border border-stone-300 px-3.5 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                autoFocus
              />
              <p className="text-[11px] text-stone-500 mt-1 text-center">
                SMS verification code has been dispatched to your mobile.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-xl bg-[#22c55e] py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#16a34a] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Processing Transaction...' : 'Confirm & Complete Payment'}
            </button>
          </form>

          <div className="text-center pt-1">
            <span className="text-xs text-stone-600">Didn't receive the SMS code? </span>
            <button
              type="button"
              onClick={handleResend}
              className="text-xs font-bold text-[#16a34a] hover:underline"
            >
              Resend OTP
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-50 py-3 text-center border-t border-stone-200">
          <p className="text-[11px] text-stone-500">
            Powered by eSewa Secure 256-bit Encryption
          </p>
        </div>

      </div>
    </div>
  );
};
