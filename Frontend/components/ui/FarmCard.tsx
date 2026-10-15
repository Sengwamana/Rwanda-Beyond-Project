// =====================================================
// Farm Card Component - RwandaBeyond Agri-Business
// =====================================================

import React from 'react';
import {
  MapPin, Droplets, Sprout, Calendar, ChevronRight,
  AlertTriangle, CheckCircle2, Clock, Thermometer,
  BarChart3, Activity, Leaf
} from 'lucide-react';

type FarmStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
type CropStage = 'germination' | 'vegetative' | 'flowering' | 'maturity' | 'harvest';

interface FarmCardProps {
  id: string;
  name: string;
  location: string;
  area: number;
  areaUnit?: 'hectares' | 'acres';
  crop?: string;
  cropStage?: CropStage;
  healthScore?: number;
  status?: FarmStatus;
  soilMoisture?: number;
  temperature?: number;
  lastUpdated?: string;
  harvestDate?: string;
  imageUrl?: string;
  alerts?: number;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export const FarmCard: React.FC<FarmCardProps> = ({
  id,
  name,
  location,
  area,
  areaUnit = 'hectares',
  crop = 'Maize',
  cropStage,
  healthScore,
  status = 'good',
  soilMoisture,
  temperature,
  lastUpdated,
  harvestDate,
  imageUrl,
  alerts = 0,
  onClick,
  variant = 'default',
  className = ''
}) => {
  const statusConfig: Record<FarmStatus, {
    color: string;
    bgColor: string;
    textColor: string;
    label: string;
  }> = {
    excellent: {
      color: 'bg-success',
      bgColor: 'bg-success-tint dark:bg-success/15',
      textColor: 'text-success',
      label: 'Excellent'
    },
    good: {
      color: 'bg-success',
      bgColor: 'bg-success-tint dark:bg-success/15',
      textColor: 'text-success',
      label: 'Good'
    },
    fair: {
      color: 'bg-warning',
      bgColor: 'bg-warning-tint dark:bg-warning/15',
      textColor: 'text-warning',
      label: 'Fair'
    },
    poor: {
      color: 'bg-warning',
      bgColor: 'bg-warning-tint dark:bg-warning/15',
      textColor: 'text-warning',
      label: 'Poor'
    },
    critical: {
      color: 'bg-danger',
      bgColor: 'bg-danger-tint dark:bg-danger/15',
      textColor: 'text-danger',
      label: 'Critical'
    }
  };

  const stageConfig: Record<CropStage, { label: string; progress: number }> = {
    germination: { label: 'Germination', progress: 15 },
    vegetative: { label: 'Vegetative', progress: 40 },
    flowering: { label: 'Flowering', progress: 60 },
    maturity: { label: 'Maturity', progress: 85 },
    harvest: { label: 'Ready for Harvest', progress: 100 }
  };

  const statusInfo = statusConfig[status];
  const stageInfo = cropStage ? stageConfig[cropStage] : null;

  const defaultImage = "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop";

  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={`
          bg-white dark:bg-card
          border border-border
          rounded-md p-4
          flex items-center gap-4
          transition-all duration-200
          ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
          ${className}
        `}
      >
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={imageUrl || defaultImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
              {name}
            </h4>
            <span className={`
              text-[10px] font-bold px-2 py-0.5 rounded-sm
              ${statusInfo.bgColor} ${statusInfo.textColor}
            `}>
              {statusInfo.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin size={10} />
            {location}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Sprout size={10} />
              {crop}
            </span>
            <span className="text-xs text-muted-foreground">
              {area} {areaUnit}
            </span>
          </div>
        </div>

        <ChevronRight className="text-slate-300 flex-shrink-0" size={20} />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-card
        border border-border
        rounded-md overflow-hidden shadow-sm
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${className}
      `}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {alerts > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-danger text-white text-xs font-bold rounded-sm">
            <AlertTriangle size={12} />
            {alerts}
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className={`
            inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-bold
            ${statusInfo.bgColor} ${statusInfo.textColor}
          `}>
            <span className={`w-1.5 h-1.5 rounded-sm ${statusInfo.color}`} />
            {statusInfo.label}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-lg truncate">{name}</h3>
          <p className="text-sm text-white/80 flex items-center gap-1">
            <MapPin size={12} />
            {location}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-muted rounded-md">
            <Sprout className="mx-auto mb-1 text-primary" size={16} />
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{crop}</p>
            <p className="text-[10px] text-muted-foreground">Crop</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <BarChart3 className="mx-auto mb-1 text-info" size={16} />
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{area} {areaUnit.charAt(0)}</p>
            <p className="text-[10px] text-muted-foreground">Area</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <Activity className="mx-auto mb-1 text-secondary" size={16} />
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{healthScore || '--'}%</p>
            <p className="text-[10px] text-muted-foreground">Health</p>
          </div>
        </div>

        {stageInfo && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Leaf size={12} />
                {stageInfo.label}
              </span>
              <span className="text-xs text-muted-foreground">{stageInfo.progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500"
                style={{ width: `${stageInfo.progress}%` }}
              />
            </div>
          </div>
        )}

        {(soilMoisture !== undefined || temperature !== undefined) && (
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
            {soilMoisture !== undefined && (
              <div className="flex items-center gap-2">
                <Droplets className="text-info" size={16} />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {soilMoisture}%
                </span>
              </div>
            )}
            {temperature !== undefined && (
              <div className="flex items-center gap-2">
                <Thermometer className="text-accent" size={16} />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {temperature}°C
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          {harvestDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>Harvest: {harvestDate}</span>
            </div>
          )}
          {lastUpdated && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{lastUpdated}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmCard;
