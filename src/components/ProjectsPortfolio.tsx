import React from 'react';
import { ProjectPortfolioItem } from '../data/materialsData';
import { MapPin, Calendar, Sparkles } from 'lucide-react';

interface ProjectsPortfolioProps {
  projects: ProjectPortfolioItem[];
  onPinPalette: (materials: string[]) => void;
}

export const ProjectsPortfolio: React.FC<ProjectsPortfolioProps> = ({
  projects,
  onPinPalette,
}) => {
  return (
    <section id="projects" className="w-full bg-[#0D0D0E] py-24 px-6 border-t border-[#232328]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              Portfolio // Built Commissions
            </div>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-[#ECEAE5] tracking-tight">
              Selected Works & Architectural Built Studies
            </h2>
          </div>

          <p className="text-sm text-[#8F8D88] max-w-md font-light leading-relaxed">
            Exploring how monolithic stone facades and hand-patinated bronze details interact with natural light, wind weathering, and site context over years of occupancy.
          </p>
        </div>

        {/* Clean Editorial Masonry / Asymmetrical Layout */}
        <div className="space-y-16">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#111114] border border-[#232328] p-6 lg:p-10 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Project Image Frame (7 cols) */}
                <div
                  className={`lg:col-span-7 relative group overflow-hidden bg-[#18181C] h-[360px] sm:h-[420px] ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-103 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114]/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 bg-[#0E0E11]/90 border border-[#2A2A32] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#C5A880]">
                    {project.typology} Architecture
                  </div>
                </div>

                {/* Project Details (5 cols) */}
                <div className={`lg:col-span-5 flex flex-col justify-between ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <div>
                    <div className="flex items-center gap-4 text-xs font-mono text-[#8E8C87] mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{project.location}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{project.completionYear}</span>
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-editorial font-medium text-[#ECEAE5] mb-2">
                      {project.title}
                    </h3>

                    <div className="text-xs font-mono uppercase text-[#A5A39E] mb-4">
                      Architect: {project.architect}
                    </div>

                    <p className="text-xs md:text-sm text-[#96948E] font-light leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Specified Materials Section */}
                  <div className="pt-6 border-t border-[#232328]">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] mb-3">
                      Specified Systems On This Commission:
                    </div>

                    <ul className="space-y-2 mb-6">
                      {project.specifiedMaterials.map((mat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#D5D3CE] font-light">
                          <span className="w-1.5 h-1.5 bg-[#C5A880] shrink-0" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => onPinPalette(project.specifiedMaterials)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#1C1C21] hover:bg-[#25252B] border border-[#383842] text-[#ECEAE5] text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Pin Project Materials to Moodboard</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
