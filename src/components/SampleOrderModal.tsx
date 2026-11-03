import React, { useState } from 'react';
import { FinishItem, calculateSampleBoxWeight } from '../utils/moodboard';
import { googleSignIn, getAccessToken } from '../services/calendarAuth';
import { scheduleConsultationInGoogleCalendar } from '../services/calendarService';
import { X, Box, Check, Calendar, MapPin, Building, User, Mail, ExternalLink, Loader2 } from 'lucide-react';

interface SampleOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  finishes: FinishItem[];
  projectName: string;
}

export const SampleOrderModal: React.FC<SampleOrderModalProps> = ({
  isOpen,
  onClose,
  finishes,
  projectName,
}) => {
  const [practiceName, setPracticeName] = useState('');
  const [specifierName, setSpecifierName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [projectStage, setProjectStage] = useState('Schematic Design');
  const [wantsConsultation, setWantsConsultation] = useState(false);
  const [consultationDate, setConsultationDate] = useState('2026-11-10');
  const [consultationTime, setConsultationTime] = useState('14:00');
  const [syncGoogleCalendar, setSyncGoogleCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calendarEventUrl, setCalendarEventUrl] = useState<string | null>(null);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  if (!isOpen) return null;

  const { formatted: boxWeight } = calculateSampleBoxWeight(finishes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCalendarError(null);

    // If architect requested direct Google Calendar sync
    if (wantsConsultation && syncGoogleCalendar) {
      try {
        let token = getAccessToken();
        if (!token) {
          const authRes = await googleSignIn();
          token = authRes?.accessToken || null;
        }

        if (token) {
          const calRes = await scheduleConsultationInGoogleCalendar(token, {
            practiceName: practiceName || 'Architecture Practice',
            specifierName: specifierName || 'Lead Architect',
            email: email,
            dateStr: consultationDate,
            timeStr: consultationTime,
            projectName: projectName,
            specifiedMaterialsCount: finishes.length,
          });

          if (calRes.success && calRes.eventLink) {
            setCalendarEventUrl(calRes.eventLink);
          } else if (calRes.error) {
            setCalendarError(calRes.error);
          }
        }
      } catch (err: any) {
        console.warn('Google Calendar sync skipped or cancelled by user:', err);
        setCalendarError(err?.message || 'Google Calendar auth not completed');
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl bg-[#121216] border border-[#2B2B32] shadow-2xl p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-label="Request Architectural Sample Box"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#7E7C77] hover:text-[#ECEAE5] hover:bg-[#1A1A20] transition-colors"
          aria-label="Close Sample Request Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#1E1D18] border border-[#C5A880] flex items-center justify-center">
              <Check className="w-8 h-8 text-[#C5A880]" />
            </div>

            <h3 className="text-2xl md:text-3xl font-editorial font-light text-[#ECEAE5] mb-2">
              Specimen Dispatch Initiated
            </h3>

            <p className="text-xs md:text-sm text-[#A5A39E] max-w-md mx-auto mb-6 font-light leading-relaxed">
              Order #VAL-{Math.floor(100000 + Math.random() * 900000)} is registered for <strong className="text-[#ECEAE5]">{practiceName || 'your practice'}</strong>. Your bespoke specimen box containing {finishes.length} architectural finish tile(s) is being packaged at our Lyon/Milan atelier.
            </p>

            {wantsConsultation && (
              <div className="p-5 bg-[#17171C] border border-[#2B2B32] max-w-md mx-auto mb-6 text-left text-xs font-mono">
                <div className="flex items-center gap-2 text-[#C5A880] mb-2 font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>Showroom Consultation Reserved</span>
                </div>
                <div className="text-[#ECEAE5]">
                  Date: {consultationDate} at {consultationTime} CET
                </div>
                <div className="text-[#888681] mt-1 text-[11px] leading-relaxed">
                  A Senior Material Architect will attend with live specimen mounts and seismic test documentation.
                </div>

                {calendarEventUrl && (
                  <div className="mt-3 pt-3 border-t border-[#232328]">
                    <a
                      href={calendarEventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#C5A880] hover:underline text-[11px]"
                    >
                      <span>Open in Google Calendar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6ba94] transition-colors"
            >
              Return to Project Atelier
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              Atelier Specimen Service // 48h Express Courier
            </div>

            <h3 className="text-2xl md:text-3xl font-editorial font-light text-[#ECEAE5] mb-2">
              Request Architectural Sample Box
            </h3>

            <p className="text-xs md:text-sm text-[#8F8D88] font-light leading-relaxed mb-6">
              Supplying architects, landscape designers, and master builders with true 150x150mm tactile finish tiles and CAD/BIM specification binders.
            </p>

            {/* Curated Box Summary */}
            <div className="p-4 bg-[#17171C] border border-[#232328] mb-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#C5A880] uppercase">Project Schedule: {projectName}</span>
                <span className="text-[#8E8C87]">{finishes.length} Finishes ({boxWeight})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {finishes.map((f) => (
                  <span
                    key={f.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1F1F24] text-[11px] font-mono text-[#D5D3CE] border border-[#2A2A32]"
                  >
                    <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: f.hex }} />
                    <span className="truncate max-w-[140px]">{f.name.split(' ')[0]}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#A5A39E] mb-1">
                    Architectural Practice / Firm *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-3 text-[#6E6C67]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Studio Herzog & Associates"
                      value={practiceName}
                      onChange={(e) => setPracticeName(e.target.value)}
                      className="w-full bg-[#16161B] border border-[#2E2E36] focus:border-[#C5A880] text-[#ECEAE5] pl-9 pr-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#A5A39E] mb-1">
                    Specifier / Lead Architect Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-[#6E6C67]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Andrea Kappe, AIA"
                      value={specifierName}
                      onChange={(e) => setSpecifierName(e.target.value)}
                      className="w-full bg-[#16161B] border border-[#2E2E36] focus:border-[#C5A880] text-[#ECEAE5] pl-9 pr-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#A5A39E] mb-1">
                    Professional Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#6E6C67]" />
                    <input
                      type="email"
                      required
                      placeholder="specifications@practice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#16161B] border border-[#2E2E36] focus:border-[#C5A880] text-[#ECEAE5] pl-9 pr-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#A5A39E] mb-1">
                    Current Project Stage
                  </label>
                  <select
                    value={projectStage}
                    onChange={(e) => setProjectStage(e.target.value)}
                    className="w-full bg-[#16161B] border border-[#2E2E36] focus:border-[#C5A880] text-[#ECEAE5] px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Concept Design">Concept Design</option>
                    <option value="Schematic Design">Schematic Design</option>
                    <option value="Design Development">Design Development</option>
                    <option value="Construction Documents / Tender">Construction Documents / Tender</option>
                    <option value="On-Site Construction">On-Site Construction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#A5A39E] mb-1">
                  Studio Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#6E6C67]" />
                  <input
                    type="text"
                    required
                    placeholder="Suite 400, 140 Grand Street, New York, NY 10013"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#16161B] border border-[#2E2E36] focus:border-[#C5A880] text-[#ECEAE5] pl-9 pr-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Consultation Option (Google Calendar Enabled) */}
              <div className="p-4 bg-[#16161A] border border-[#232328] space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsConsultation}
                    onChange={(e) => setWantsConsultation(e.target.checked)}
                    className="w-4 h-4 bg-[#101013] border-[#303038] accent-[#C5A880]"
                  />
                  <span className="text-xs font-mono text-[#D5D3CE]">
                    Book Material Consultation with Senior Facade Architect (Showroom or Virtual)
                  </span>
                </label>

                {wantsConsultation && (
                  <div className="pt-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-[#8E8C87] block mb-1">
                          Preferred Date:
                        </label>
                        <input
                          type="date"
                          value={consultationDate}
                          onChange={(e) => setConsultationDate(e.target.value)}
                          className="w-full bg-[#101013] border border-[#303038] text-[#ECEAE5] px-3 py-1.5 text-xs font-mono focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase text-[#8E8C87] block mb-1">
                          Time Slot:
                        </label>
                        <select
                          value={consultationTime}
                          onChange={(e) => setConsultationTime(e.target.value)}
                          className="w-full bg-[#101013] border border-[#303038] text-[#ECEAE5] px-3 py-1.5 text-xs font-mono focus:outline-none"
                        >
                          <option value="10:00">10:00 CET</option>
                          <option value="11:30">11:30 CET</option>
                          <option value="14:00">14:00 CET</option>
                          <option value="16:00">16:00 CET</option>
                        </select>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={syncGoogleCalendar}
                        onChange={(e) => setSyncGoogleCalendar(e.target.checked)}
                        className="w-3.5 h-3.5 bg-[#101013] border-[#303038] accent-[#C5A880]"
                      />
                      <span className="text-[11px] font-mono text-[#C5A880]">
                        Sync directly to my Google Calendar
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {calendarError && (
                <div className="text-[11px] font-mono text-[#FF8E8E] p-2 bg-[#261515] border border-[#522]">
                  {calendarError}
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-[#303038] text-[#9E9C96] hover:text-[#ECEAE5] text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6ba94] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Confirm & Dispatch Specimen Box</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
