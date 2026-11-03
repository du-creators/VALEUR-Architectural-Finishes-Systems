import React from 'react';
import { ARCHITECTURAL_ARTICLES } from '../data/materialsData';
import { ArrowUpRight, BookOpen, Download, Layers, ShieldCheck } from 'lucide-react';

interface ResourcesAndJournalProps {
  onRequestSamples: () => void;
}

export const ResourcesAndJournal: React.FC<ResourcesAndJournalProps> = ({ onRequestSamples }) => {
  return (
    <section id="resources" className="w-full bg-[#0D0D0E] py-24 px-6 border-t border-[#232328]">
      <div className="max-w-7xl mx-auto">
        {/* Resources Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              Practice Tools // Engineering Support
            </div>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-[#ECEAE5] tracking-tight">
              Architectural Technical Resources
            </h2>
          </div>

          <p className="text-sm text-[#8F8D88] max-w-md font-light leading-relaxed">
            Download verified BIM models, seismic windload structural calculators, and complete AIA 3-part MasterFormat specifications.
          </p>
        </div>

        {/* 3 Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 bg-[#111114] border border-[#232328] hover:border-[#383842] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 mb-6 bg-[#18181D] border border-[#2B2B32] flex items-center justify-center text-[#C5A880]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-medium text-[#ECEAE5] mb-2">
                BIM / Revit & Archicad Library
              </h3>
              <p className="text-xs text-[#8E8C87] font-light leading-relaxed mb-6">
                LOD 350 parametric BIM objects with integrated thermal conductivity, acoustic ratings, and material reflectance values.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1C1C22] flex items-center justify-between text-xs font-mono text-[#C5A880]">
              <span>Download 2026 Library (.ZIP)</span>
              <Download className="w-4 h-4" />
            </div>
          </div>

          <div className="p-8 bg-[#111114] border border-[#232328] hover:border-[#383842] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 mb-6 bg-[#18181D] border border-[#2B2B32] flex items-center justify-center text-[#C5A880]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-medium text-[#ECEAE5] mb-2">
                Fire & Acoustic Test Certificates
              </h3>
              <p className="text-xs text-[#8E8C87] font-light leading-relaxed mb-6">
                Third-party accredited laboratory test documentation: Euroclass A1 Non-Combustible, ASTM E84, and ISO 354 acoustic chamber data.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1C1C22] flex items-center justify-between text-xs font-mono text-[#C5A880]">
              <span>View Testing Binders</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="p-8 bg-[#111114] border border-[#232328] hover:border-[#383842] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 mb-6 bg-[#18181D] border border-[#2B2B32] flex items-center justify-center text-[#C5A880]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-medium text-[#ECEAE5] mb-2">
                Architectural Detailing Handbook
              </h3>
              <p className="text-xs text-[#8E8C87] font-light leading-relaxed mb-6">
                180 pages of concealed kerf rainscreen connections, seismic isolation joints, and electrolytic isolation detail drawings in DWG & PDF.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1C1C22] flex items-center justify-between text-xs font-mono text-[#C5A880]">
              <span>Request Handbook</span>
              <Download className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Journal / Editorial Section */}
        <div id="journal" className="pt-16 border-t border-[#232328]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
                Journal // Architectural Inquiries
              </div>
              <h2 className="text-3xl md:text-4xl font-editorial font-light text-[#ECEAE5] tracking-tight">
                Essays on Matter, Light & Permanence
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARCHITECTURAL_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="p-6 bg-[#111114] border border-[#232328] hover:border-[#383842] transition-colors flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#7E7C77] mb-3">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-editorial font-medium text-[#ECEAE5] group-hover:text-[#C5A880] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#8E8C87] font-light leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1C22] flex items-center justify-between text-xs font-mono text-[#8E8C87] group-hover:text-[#ECEAE5] transition-colors">
                  <span>{article.date}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
