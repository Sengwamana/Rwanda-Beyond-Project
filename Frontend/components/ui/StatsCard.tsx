// =====================================================
// Stats Card Component - RwandaBeyond Agri-Business
// =====================================================

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  variant?: 'default' | 'gradient' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary-tint dark:bg-primary/15',
  trend,
  variant = 'default',
  size = 'md',
  className = '',
  onClick
}) => {
  const sizeConfig = {
    sm: {
      padding: 'p-4',
      iconSize: 20,
      iconContainer: 'w-10 h-10',
      titleSize: 'text-xs',
      valueSize: 'text-xl',
      subtitleSize: 'text-[10px]'
    },
    md: {
      padding: 'p-5',
      iconSize: 24,
      iconContainer: 'w-12 h-12',
      titleSize: 'text-sm',
      valueSize: 'text-2xl',
      subtitleSize: 'text-xs'
    },
    lg: {
      padding: 'p-6',
      iconSize: 28,
      iconContainer: 'w-14 h-14',
      titleSize: 'text-sm',
      valueSize: 'text-3xl',
      subtitleSize: 'text-sm'
    }
  };

  const config = sizeConfig[size];

  const variantClasses = {
    default: 'bg-white dark:bg-card border border-border shadow-sm',
    gradient: 'bg-primary text-white border-0 shadow-sm',
    outline: 'bg-white dark:bg-card border border-border',
    minimal: 'bg-muted border border-border'
  };

  const isGradient = variant === 'gradient';

  const TrendIcon = trend
    ? (trend.value > 0 ? TrendingUp : trend.value < 0 ? TrendingDown : Minus)
    : null;

  const trendColor = trend
    ? (trend.isPositive !== undefined
        ? (trend.isPositive ? 'text-success' : 'text-danger')
        : (trend.value > 0 ? 'text-success' : trend.value < 0 ? 'text-danger' : 'text-muted-foreground'))
    : '';

  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg transition-all duration-200
        ${config.padding}
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`
            font-medium mb-2
            ${config.titleSize}
            ${isGradient ? 'text-white/80' : 'text-muted-foreground'}
          `}>
            {title}
          </p>

          <p className={`
            font-bold leading-none
            ${config.valueSize}
            ${isGradient ? 'text-white' : 'text-slate-900 dark:text-white'}
          `}>
            {value}
          </p>

          <div className="flex items-center gap-2 mt-2">
            {trend && TrendIcon && (
              <span className={`
                flex items-center gap-1 font-semibold
                ${config.subtitleSize}
                ${isGradient ? 'text-white/90' : trendColor}
              `}>
                <TrendIcon size={14} />
                {Math.abs(trend.value)}%
              </span>
            )}
            {(subtitle || trend?.label) && (
              <span className={`
                ${config.subtitleSize}
                ${isGradient ? 'text-white/70' : 'text-muted-foreground'}
              `}>
                {trend?.label || subtitle}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`
            ${config.iconContainer}
            ${isGradient ? 'bg-white/20' : iconBgColor}
            rounded-md flex items-center justify-center flex-shrink-0
          `}>
            <Icon
              size={config.iconSize}
              className={isGradient ? 'text-white' : iconColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
