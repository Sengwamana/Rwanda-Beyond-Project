// =====================================================
// Alert Card Component - RwandaBeyond Agri-Business
// =====================================================

import React from 'react';
import {
  AlertTriangle, AlertCircle, CheckCircle2, Info,
  X, Bell, Bug, Droplets, ThermometerSun, Wind
} from 'lucide-react';

type AlertType = 'success' | 'warning' | 'error' | 'info';
type AlertCategory = 'pest' | 'irrigation' | 'weather' | 'sensor' | 'system' | 'general';

interface AlertCardProps {
  type: AlertType;
  title: string;
  message: string;
  category?: AlertCategory;
  timestamp?: string;
  dismissable?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  type,
  title,
  message,
  category = 'general',
  timestamp,
  dismissable = false,
  onDismiss,
  action,
  className = ''
}) => {
  const typeConfig = {
    success: {
      bgColor: 'bg-success-tint dark:bg-success/10',
      borderColor: 'border-success/20 dark:border-success/20',
      iconColor: 'text-success',
      iconBgColor: 'bg-success/10',
      titleColor: 'text-success',
      textColor: 'text-success/90',
      Icon: CheckCircle2
    },
    warning: {
      bgColor: 'bg-warning-tint dark:bg-warning/10',
      borderColor: 'border-warning/20 dark:border-warning/20',
      iconColor: 'text-warning',
      iconBgColor: 'bg-warning/10',
      titleColor: 'text-warning',
      textColor: 'text-warning/90',
      Icon: AlertTriangle
    },
    error: {
      bgColor: 'bg-danger-tint dark:bg-danger/10',
      borderColor: 'border-danger/20 dark:border-danger/20',
      iconColor: 'text-danger',
      iconBgColor: 'bg-danger/10',
      titleColor: 'text-danger',
      textColor: 'text-danger/90',
      Icon: AlertCircle
    },
    info: {
      bgColor: 'bg-info-tint dark:bg-info/10',
      borderColor: 'border-info/20 dark:border-info/20',
      iconColor: 'text-info',
      iconBgColor: 'bg-info/10',
      titleColor: 'text-info',
      textColor: 'text-info/90',
      Icon: Info
    }
  };

  const categoryIcons: Record<AlertCategory, typeof Bug> = {
    pest: Bug,
    irrigation: Droplets,
    weather: ThermometerSun,
    sensor: Wind,
    system: Bell,
    general: Info
  };

  const config = typeConfig[type];
  const CategoryIcon = categoryIcons[category];
  const AlertIcon = config.Icon;

  return (
    <div className={`
      ${config.bgColor}
      ${config.borderColor}
      border rounded-md p-4
      animate-fade-in
      ${className}
    `}>
      <div className="flex gap-3">
        <div className={`
          ${config.iconBgColor}
          w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0
        `}>
          <AlertIcon className={config.iconColor} size={18} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className={`font-semibold text-sm ${config.titleColor}`}>
                {title}
              </h4>
              {category !== 'general' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
                  <CategoryIcon size={10} />
                  {category}
                </span>
              )}
            </div>

            {dismissable && (
              <button
                onClick={onDismiss}
                className="p-1 rounded-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            )}
          </div>

          <p className={`text-sm mt-1 ${config.textColor}`}>
            {message}
          </p>

          <div className="flex items-center justify-between mt-3">
            {timestamp && (
              <span className="text-xs text-muted-foreground">
                {timestamp}
              </span>
            )}

            {action && (
              <button
                onClick={action.onClick}
                className={`
                  text-xs font-semibold
                  ${config.iconColor}
                  hover:underline
                `}
              >
                {action.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
