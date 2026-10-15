import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Globe, Users, Heart, Target, Radio, Database, Smartphone, Wifi, Sprout, Shield, Zap, BarChart3, AlertTriangle, RefreshCw } from 'lucide-react';
import { contentService } from '../services/content';

const valueIcons: Record<string, React.ElementType> = {
  globe: Globe,
  users: Users,
  heart: Heart,
  target: Target,
};

export const About: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['content', 'about'],
    queryFn: () => contentService.getAbout(),
    staleTime: 60 * 1000,
    retry: false,
  });

  const hero = (data?.data as any)?.hero || {};
  const mission = (data?.data as any)?.mission || {};
  const values = (data?.data as any)?.values || [];
  const team = (data?.data as any)?.team || [];
  const cta = (data?.data as any)?.cta || {};

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-24 pb-20 animate-fade-in font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-tint text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            {hero.badge || 'About Us'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {hero.title || 'Transforming Agriculture Through Technology'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {hero.subtitle || 'RwandaBeyond is an integrated smart agriculture platform that combines IoT sensors, artificial intelligence, and mobile technology to empower smallholder farmers in Rwanda with data-driven insights.'}
          </p>
        </div>

        {isLoading && !isError && (
          <div className="text-center py-16">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-danger-tint rounded-md flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-danger" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Content Server Unavailable</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The backend server is not running. Start the backend server and click retry to load content.
            </p>
            <button onClick={() => refetch()} className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors">
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="bg-primary text-white rounded-lg p-10 mb-12">
              <h3 className="text-2xl font-bold mb-4">{mission.title || 'Our Mission'}</h3>
              <p className="text-primary-tint leading-relaxed text-lg">{mission.description || 'To make precision agriculture accessible to every smallholder farmer in Rwanda by combining affordable IoT technology with AI-powered insights — increasing yields, reducing costs, and building climate resilience.'}</p>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">How the System Works</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: Radio, title: '1. Sense', desc: 'Solar-powered IoT sensors in the field collect soil moisture, temperature, humidity, NPK, rainfall, and light data every 15 minutes.' },
                  { icon: Wifi, title: '2. Transmit', desc: 'Data is sent wirelessly via LoRaWAN or GSM networks to the cloud platform. USSD fallback works in areas without internet.' },
                  { icon: Database, title: '3. Analyze', desc: 'AI models process sensor data against crop growth models, weather forecasts, and historical patterns to generate insights.' },
                  { icon: Smartphone, title: '4. Act', desc: 'Actionable recommendations are delivered to farmers via dashboard, mobile app, USSD, or voice assistant in Kinyarwanda.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white dark:bg-card rounded-lg p-6 border border-border shadow-sm">
                    <div className="w-12 h-12 bg-primary-tint rounded-md flex items-center justify-center text-primary mb-4">
                      <item.icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">What We Monitor</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Sprout, label: 'Soil Moisture', desc: 'Volumetric water content' },
                  { icon: Zap, label: 'NPK Levels', desc: 'Nitrogen, Phosphorus, Potassium' },
                  { icon: BarChart3, label: 'Weather Data', desc: 'Rainfall, temperature, humidity' },
                  { icon: Shield, label: 'Pest Detection', desc: 'AI image recognition' },
                ].map((item) => (
                  <div key={item.label} className="bg-white dark:bg-card rounded-lg p-5 border border-border shadow-sm text-center">
                    <div className="w-10 h-10 bg-accent-tint rounded-md flex items-center justify-center mx-auto mb-3">
                      <item.icon className="text-accent" size={20} />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {values.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {values.map((value: any, idx: number) => {
                  const iconKey = String(value.icon || '').toLowerCase();
                  const Icon = valueIcons[iconKey] || Globe;
                  return (
                    <div key={value.id || idx} className="bg-white dark:bg-card rounded-lg p-8 border border-border shadow-sm">
                      <div className="w-12 h-12 bg-primary-tint rounded-md flex items-center justify-center text-primary mb-4">
                        <Icon size={22} />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {team.length > 0 && (
              <div className="mb-20">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Team</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {team.map((member: any, i: number) => (
                    <div key={member.id || i} className="bg-white dark:bg-card p-6 rounded-lg border border-border text-center hover:shadow-md transition-all duration-300 group">
                      <div className="w-28 h-28 mx-auto bg-muted rounded-md mb-6 overflow-hidden border-2 border-border shadow-sm group-hover:scale-105 transition-transform">
                        <img src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.name || 'team')}`} alt={member.name} className="w-full h-full" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-1">{member.name}</h3>
                      <p className="text-primary text-sm font-bold uppercase tracking-wider opacity-80">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative h-64 rounded-lg overflow-hidden bg-primary flex items-center justify-center text-center px-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{cta.title || 'Join the Agricultural Revolution'}</h2>
                <button className="px-8 py-4 bg-white text-primary rounded-md font-bold hover:bg-slate-50 transition-colors shadow-lg">
                  {cta.button || 'Get Started'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
