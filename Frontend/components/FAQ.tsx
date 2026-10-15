import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { contentService } from '../services/content';

interface FAQProps {
  language: Language;
}

export const FAQ: React.FC<FAQProps> = ({ language = 'en' }) => {
  const t = translations[language]?.faq || {};
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['content', 'faq'],
    queryFn: () => contentService.getFAQ(),
    staleTime: 60 * 1000,
  });

  const hero = (data?.data as any)?.hero || {};
  const categories = (data?.data as any)?.categories || [];
  const items = (data?.data as any)?.items || [];

  const filteredItems = items.filter((item: any) => {
    const matchesSearch = !searchQuery || item.question?.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-24 pb-20 animate-fade-in font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-tint text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            {hero.badge || 'FAQ'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {hero.title || 'Frequently Asked Questions'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {hero.subtitle || 'Everything you need to know about RwandaBeyond — how it works, what it costs, and how it can help your farm.'}
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!selectedCategory ? 'bg-primary text-white' : 'bg-white dark:bg-card border border-border text-muted-foreground hover:text-slate-900'}`}
            >
              All
            </button>
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-white dark:bg-card border border-border text-muted-foreground hover:text-slate-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isLoading && <div className="text-center text-muted-foreground">Loading FAQ...</div>}
        {isError && (
          <div className="text-center">
            <p className="text-danger mb-3">Failed to load FAQ content.</p>
            <button onClick={() => refetch()} className="px-4 py-2 rounded-md bg-primary text-white text-sm font-bold">Retry</button>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredItems.map((item: any, idx: number) => (
            <div key={item.id || idx} className="bg-white dark:bg-card rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-slate-900 dark:text-white">{item.question}</span>
                <ChevronDown size={20} className={`text-muted-foreground shrink-0 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 bg-primary rounded-lg p-10 md:p-16 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Still Have Questions?</h2>
          <p className="text-primary-tint mb-8 max-w-lg mx-auto">
            Can't find the answer you're looking for? Our team is here to help you get the most out of RwandaBeyond.
          </p>
          <button className="px-8 py-4 bg-white text-primary rounded-md font-bold hover:bg-slate-50 transition-colors shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
