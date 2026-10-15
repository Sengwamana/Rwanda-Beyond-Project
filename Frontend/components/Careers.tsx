import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { contentService } from '../services/content';

interface CareersProps {
  language: Language;
}

const departmentColors: Record<string, string> = {
  engineering: 'bg-primary-tint text-primary',
  operations: 'bg-accent-tint text-accent',
  research: 'bg-info-tint text-info',
  support: 'bg-success-tint text-success',
  marketing: 'bg-warning-tint text-warning',
};

export const Careers: React.FC<CareersProps> = ({ language = 'en' }) => {
  const t = translations[language]?.careers || {};
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['content', 'careers'],
    queryFn: () => contentService.getCareers(),
    staleTime: 60 * 1000,
  });

  const hero = (data?.data as any)?.hero || {};
  const jobs = (data?.data as any)?.jobs || [];
  const benefits = (data?.data as any)?.benefits || [];
  const departments = [...new Set(jobs.map((j: any) => j.department).filter(Boolean))];

  const filteredJobs = selectedDepartment
    ? jobs.filter((j: any) => j.department === selectedDepartment)
    : jobs;

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-24 pb-20 animate-fade-in font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-tint text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            {hero.badge || 'Careers'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {hero.title || 'Join Our Mission'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {hero.subtitle || "Help us transform agriculture in Rwanda. We're looking for passionate people who want to make a real difference in farmers' lives."}
          </p>
        </div>

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {benefits.map((benefit: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-card rounded-lg p-5 border border-border shadow-sm text-center">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        )}

        {isLoading && <div className="text-center text-muted-foreground">Loading careers...</div>}
        {isError && (
          <div className="text-center">
            <p className="text-danger mb-3">Failed to load careers content.</p>
            <button onClick={() => refetch()} className="px-4 py-2 rounded-md bg-primary text-white text-sm font-bold">Retry</button>
          </div>
        )}

        {/* Department Filter */}
        {departments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedDepartment(null)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!selectedDepartment ? 'bg-primary text-white' : 'bg-white dark:bg-card border border-border text-muted-foreground hover:text-slate-900'}`}
            >
              All Departments
            </button>
            {departments.map((dept: any) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedDepartment === dept ? 'bg-primary text-white' : 'bg-white dark:bg-card border border-border text-muted-foreground hover:text-slate-900'}`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job: any, idx: number) => (
            <div key={job.id || idx} className="bg-white dark:bg-card rounded-lg border border-border p-6 hover:shadow-md transition-all duration-200 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    {job.department && (
                      <span className={`text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider ${departmentColors[job.department.toLowerCase()] || 'bg-muted text-muted-foreground'}`}>
                        {job.department}
                      </span>
                    )}
                    {job.location && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                    )}
                    {job.type && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {job.type}
                      </span>
                    )}
                  </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-card border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm rounded-md hover:bg-primary hover:text-white hover:border-primary transition-colors group">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && !isError && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No open positions at the moment.</p>
            <p className="text-sm text-muted-foreground">Check back soon — we're always growing!</p>
          </div>
        )}
      </div>
    </div>
  );
};

