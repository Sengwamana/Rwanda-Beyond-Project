import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Video, BookOpen, ArrowRight } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { contentService } from '../services/content';

interface ResourcesProps {
  language: Language;
}

const typeIcons: Record<string, React.ElementType> = {
  article: FileText,
  video: Video,
  guide: BookOpen,
};

export const Resources: React.FC<ResourcesProps> = ({ language = 'en' }) => {
  const t = translations[language]?.resources || {};
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['content', 'resources'],
    queryFn: () => contentService.getResources(),
    staleTime: 60 * 1000,
  });

  const hero = (data?.data as any)?.hero || {};
  const categories = (data?.data as any)?.categories || [];
  const items = (data?.data as any)?.items || [];

  const filteredItems = items.filter((item: any) => {
    const matchesCategory = !activeCategory || item.category === activeCategory;
    const matchesSearch = !searchQuery || item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-24 pb-20 animate-fade-in font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-tint text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            {hero.badge || 'Resources'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {hero.title || 'Agricultural Knowledge Center'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {hero.subtitle || 'Guides, videos, and articles to help you get the most out of precision agriculture and the RwandaBeyond platform.'}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!activeCategory ? 'bg-primary text-white' : 'bg-white dark:bg-card border border-border text-muted-foreground hover:text-slate-900'}`}
            >
              All Topics
            </button>
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white dark:bg-card border border-border text-muted-foreground hover:text-slate-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isLoading && <div className="text-center text-muted-foreground">Loading resources...</div>}
        {isError && (
          <div className="text-center">
            <p className="text-danger mb-3">Failed to load resources.</p>
            <button onClick={() => refetch()} className="px-4 py-2 rounded-md bg-primary text-white text-sm font-bold">Retry</button>
          </div>
        )}

        {/* Resource Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredItems.map((item: any, idx: number) => {
            const typeKey = String(item.type || '').toLowerCase();
            const TypeIcon = typeIcons[typeKey] || FileText;
            return (
              <div key={item.id || idx} className="bg-white dark:bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
                {item.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TypeIcon size={16} className="text-primary" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.type || 'Article'}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <button className="flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all">
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!isLoading && !isError && items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No resources available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
