import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { EsewaAccount } from '../types';

interface EsewaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBindingSuccess: (account: EsewaAccount) => void;
  merchantName?: string;
}

export const EsewaModal: React.FC<EsewaModalProps> = ({
  isOpen,
  onClose,
  onBindingSuccess,
  merchantName = 'SD Infininov'
}) => {
  const [step, setStep] = useState<'credentials' | 'otp' | 'success'>('credentials');
  const [esewaId, setEsewaId] = useState('9841234567');
  const [password, setPassword] = useState('••••••••');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [otpValue, setOtpValue] = useState('');
  const [otpTimer, setOtpTimer] = useState(299);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && step === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, step, otpTimer]);

  if (!isOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setErrorMsg('Please agree to the Terms & Conditions.');
      return;
    }
    if (!esewaId.trim()) {
      setErrorMsg('Please enter your valid eSewa ID (Mobile / Email).');
      return;
    }
    setErrorMsg('');
    setStep('otp');
    setOtpTimer(299);
    // Auto fill helper for user convenience after a brief moment
    setTimeout(() => {
      setOtpValue('482910');
    }, 900);
  };

  const handleConfirmOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.trim().length < 6) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
      setTimeout(() => {
        onBindingSuccess({
          isLinked: true,
          esewaId: esewaId.trim(),
          accountHolder: 'Pooja Shrestha',
          balance: 24500
        });
        onClose();
      }, 1200);
    }, 700);
  };

  const resendOtp = () => {
    setOtpTimer(299);
    setOtpValue('619284');
    setErrorMsg('A new OTP has been sent to ' + esewaId);
    setTimeout(() => setErrorMsg(''), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Container styling matching Image 3 with curved green header */}
      <div className="relative w-full max-w-[420px] rounded-3xl bg-white shadow-2xl overflow-hidden border border-stone-200 text-stone-800">
        
        {/* Curved Green eSewa Branded Header */}
        <div className="relative bg-[#22c55e] pt-6 pb-5 px-6 text-white text-center rounded-b-[2rem] shadow-md">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/15 hover:bg-black/25 text-white transition-colors"
            aria-label="Close eSewa binding"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md mb-2">
            <span className="text-xl font-black text-[#22c55e] tracking-tighter">
              eS
            </span>
          </div>

          <h2 className="text-lg font-bold tracking-tight">
            Link eSewa to {merchantName}
          </h2>
          <p className="text-xs text-white/90 font-light mt-0.5">
            eSewa Fonepay Pvt. Ltd. Official Merchant Gateway
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Enter Credentials & Review Terms & Conditions (Image 3) */}
          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  eSewa ID (Mobile Number / Email)
                </label>
                <input
                  type="text"
                  required
                  value={esewaId}
                  onChange={(e) => setEsewaId(e.target.value)}
                  placeholder="e.g. 98XXXXXXXX / name@email.com"
                  className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  eSewa Password / MPIN
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password / 4-digit MPIN"
                  className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              {/* Exact Terms & Conditions Box from Screenshot 3 */}
              <div>
                <span className="block text-xs font-bold text-stone-800 mb-1">
                  Terms & Conditions
                </span>
                <div className="h-28 overflow-y-auto rounded-xl border border-stone-200 bg-stone-50 p-3 text-[11px] text-stone-600 leading-relaxed scrollbar-thin">
                  <p>
                    The payment services through eSewa, namely <strong>"eSewa payment service"</strong> is provided by eSewa Fonepay Pvt. Ltd, and made available on Merchant's Platform (websites/Mobile App). You must adhere to following terms and condition while making purchase from Merchant's Platform using eSewa payment service:
                  </p>
                  <p className="mt-1.5">
                    1. Account Binding allows seamless 1-tap fast authorization for clothing purchases and festive discounts on SD Infininov.
                  </p>
                  <p className="mt-1">
                    2. Two-Factor Authentication (OTP) is mandated for account link verification and final payment authorization.
                  </p>
                  <p className="mt-1">
                    3. All monetary transactions are settled under Nepal Rastra Bank payment system operator directives.
                  </p>
                </div>
              </div>

              {/* Checkbox from Screenshot 3 */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeEsewaTerms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[#22c55e] focus:ring-[#22c55e]"
                />
                <label htmlFor="agreeEsewaTerms" className="text-xs text-stone-600 leading-snug cursor-pointer">
                  I have read and agree to the terms &amp; conditions mentioned above.
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#22c55e] py-3 text-sm font-bold text-white shadow-md hover:bg-[#16a34a] active:scale-95 transition-all cursor-pointer"
              >
                Proceed to OTP Verification
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification exact layout from Screenshot 3 */}
          {step === 'otp' && (
            <form onSubmit={handleConfirmOtp} className="space-y-4">
              
              {/* Green Header title from Image 3 */}
              <div className="pb-1 border-b border-stone-100">
                <h3 className="text-sm font-bold text-[#16a34a]">
                  OTP Verification
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  OTP has been sent to your eSewa ID: <strong className="text-stone-900">{esewaId}</strong>
                </p>
              </div>

              {/* Demo Helper Pill */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-xs text-emerald-800">
                <span className="font-medium">Demo SMS Code: <strong>482910</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpValue('482910')}
                  className="text-[11px] underline font-bold hover:text-emerald-950"
                >
                  Quick Fill
                </button>
              </div>

              {/* Enter OTP & Timer Label from Image 3 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-bold text-stone-800">
                    Enter OTP
                  </label>
                  <span className="italic text-stone-500 font-medium">
                    OTP expires in : <strong className="text-stone-800">{otpTimer} sec</strong>
                  </span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                  placeholder="eg. 123456"
                  className="w-full tracking-widest text-center text-lg font-bold rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  autoFocus
                />
              </div>

              {/* Confirm Code Button from Image 3 */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full rounded-xl bg-[#22c55e] py-3 text-sm font-bold text-white shadow-md hover:bg-[#16a34a] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? 'Verifying Code...' : 'Confirm Code'}
              </button>

              {/* Don't received the OTP ? Resend link from Image 3 */}
              <div className="text-center pt-1">
                <span className="text-xs text-stone-600">
                  Don't received the OTP ?{' '}
                </span>
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-xs font-bold text-[#16a34a] hover:underline cursor-pointer"
                >
                  Resend
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Successful Binding State */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-16 h-16 text-[#22c55e] mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-stone-900">
                Binding is Successful!
              </h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Your eSewa wallet ({esewaId}) is now securely linked to SD Infininov. Returning to checkout...
              </p>
            </div>
          )}

        </div>

        {/* Footer copyright matching Image 3 */}
        <div className="bg-stone-50 py-3 text-center border-t border-stone-200">
          <p className="text-[11px] text-stone-500">
            &copy; 2009-2026 eSewa. All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  );
};
