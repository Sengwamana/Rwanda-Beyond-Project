import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Sprout, BookOpen, CreditCard, Users, HelpCircle, Briefcase, Phone, Home, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { BrandLogo } from './ui/BrandLogo';
import { translations, Language } from '../utils/translations';

interface NavbarProps {
  onNavigate: (page: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: string;
  toggleTheme: () => void;
  currentPath: string;
}

interface DropdownItem {
  label: string;
  page: string;
  icon: React.ElementType;
  description?: string;
}

interface DropdownConfig {
  label: string;
  items: DropdownItem[];
}

export function Navbar({
  onNavigate,
  language,
  setLanguage,
  theme,
  toggleTheme,
  currentPath
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[language].nav;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo(0, 0);
  };

  const dropdowns: DropdownConfig[] = [
    {
      label: t.platform || 'Platform',
      items: [
        { label: t.features || 'Features', page: 'features', icon: Sprout, description: 'Explore platform capabilities' },
        { label: t.pricing || 'Pricing', page: 'pricing', icon: CreditCard, description: 'Plans and costs' },
        { label: t.resources || 'Resources', page: 'resources', icon: BookOpen, description: 'Guides and articles' },
      ],
    },
    {
      label: t.company || 'Company',
      items: [
        { label: t.about || 'About Us', page: 'about', icon: Users, description: 'Our mission and team' },
        { label: t.careers || 'Careers', page: 'careers', icon: Briefcase, description: 'Join our team' },
        { label: t.faq || 'FAQ', page: 'faq', icon: HelpCircle, description: 'Common questions' },
        { label: t.contact || 'Contact', page: 'consultation', icon: Phone, description: 'Get in touch' },
      ],
    },
  ];

  const isActivePage = (page: string) => {
    const pathMap: Record<string, string> = {
      landing: '/',
      features: '/features',
      pricing: '/pricing',
      resources: '/resources',
      about: '/about',
      careers: '/careers',
      faq: '/faq',
      consultation: '/consultation',
    };
    return currentPath === pathMap[page];
  };

  const isDropdownActive = (dropdown: DropdownConfig) => {
    return dropdown.items.some((item) => isActivePage(item.page));
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-border ${isScrolled ? 'bg-background/95 shadow-sm' : 'bg-background/70'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="cursor-pointer shrink-0" onClick={() => navigate('landing')}>
          <BrandLogo variant="navbar" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          {/* Home */}
          <Button
            variant={isActivePage('landing') ? 'secondary' : 'ghost'}
            onClick={() => navigate('landing')}
            className="gap-2"
          >
            <Home size={16} />
            {t.home}
          </Button>

          {/* Dropdowns */}
          {dropdowns.map((dropdown) => (
            <div key={dropdown.label} className="relative">
              <Button
                variant={isDropdownActive(dropdown) ? 'secondary' : 'ghost'}
                onClick={() => setOpenDropdown(openDropdown === dropdown.label ? null : dropdown.label)}
                className="gap-1.5"
              >
                {dropdown.label}
                <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === dropdown.label ? 'rotate-180' : ''}`} />
              </Button>

              {/* Dropdown Menu */}
              {openDropdown === dropdown.label && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-card rounded-lg border border-border shadow-lg py-2 animate-fade-in z-50">
                  {dropdown.items.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => navigate(item.page)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted ${
                        isActivePage(item.page) ? 'bg-primary-tint' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                        isActivePage(item.page) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <item.icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium ${isActivePage(item.page) ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Legal */}
          <Button
            variant={currentPath === '/privacy' || currentPath === '/terms' ? 'secondary' : 'ghost'}
            onClick={() => navigate('terms')}
            className="gap-2"
          >
            <FileText size={16} />
            Legal
          </Button>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Language Switcher */}
          <div className="flex items-center gap-0.5 text-xs font-bold bg-muted rounded-md p-1">
            {(['rw', 'en', 'fr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded-sm transition-colors ${
                  language === lang
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <Button onClick={() => navigate('login')}>
            {t.signIn}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden absolute top-16 left-0 w-full bg-background border-b shadow-xl animate-fade-in z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4 space-y-1">
            {/* Home */}
            <button
              onClick={() => navigate('landing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                isActivePage('landing') ? 'bg-primary-tint text-primary' : 'hover:bg-muted'
              }`}
            >
              <Home size={18} />
              <span className="font-medium">{t.home}</span>
            </button>

            {/* Dropdown sections */}
            {dropdowns.map((dropdown) => (
              <MobileDropdown
                key={dropdown.label}
                label={dropdown.label}
                items={dropdown.items}
                isActive={isDropdownActive(dropdown)}
                isActivePage={isActivePage}
                onNavigate={navigate}
              />
            ))}

            {/* Legal */}
            <button
              onClick={() => navigate('terms')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                currentPath === '/privacy' || currentPath === '/terms' ? 'bg-primary-tint text-primary' : 'hover:bg-muted'
              }`}
            >
              <FileText size={18} />
              <span className="font-medium">Legal</span>
            </button>

            <div className="h-px bg-border my-3"></div>

            {/* Language */}
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground">Language:</span>
              <div className="flex gap-1">
                {(['rw', 'en', 'fr'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors ${
                      language === lang
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button className="w-full" onClick={() => navigate('login')}>
                {t.signIn}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Mobile Dropdown Component
function MobileDropdown({
  label,
  items,
  isActive,
  isActivePage,
  onNavigate,
}: {
  label: string;
  items: DropdownItem[];
  isActive: boolean;
  isActivePage: (page: string) => boolean;
  onNavigate: (page: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-left transition-colors ${
          isActive ? 'bg-primary-tint text-primary' : 'hover:bg-muted'
        }`}
      >
        <span className="font-medium">{label}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="ml-4 border-l-2 border-border pl-3 space-y-1">
          {items.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
                isActivePage(item.page) ? 'bg-primary-tint text-primary' : 'hover:bg-muted'
              }`}
            >
              <item.icon size={16} className={isActivePage(item.page) ? 'text-primary' : 'text-muted-foreground'} />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
