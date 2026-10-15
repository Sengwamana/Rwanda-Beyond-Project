// =====================================================
// Sensor Card Component - RwandaBeyond Agri-Business
// =====================================================

import React from 'react';
import {
  Droplets, Thermometer, Wind, Sun, Gauge, Leaf,
  Activity, Wifi, WifiOff, Battery, BatteryLow,
  AlertTriangle, CheckCircle2, Clock
} from 'lucide-react';

type SensorType = 'soil_moisture' | 'temperature' | 'humidity' | 'wind' | 'light' | 'ph' | 'nitrogen';
type SensorStatus = 'online' | 'offline' | 'warning' | 'error';

interface SensorCardProps {
  type: SensorType;
  name: string;
  value: number;
  unit: string;
  status?: SensorStatus;
  battery?: number;
  lastUpdate?: string;
  min?: number;
  max?: number;
  optimal?: { min: number; max: number };
  location?: string;
  onClick?: () => void;
  className?: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({
  type,
  name,
  value,
  unit,
  status = 'online',
  battery,
  lastUpdate,
  min,
  max,
  optimal,
  location,
  onClick,
  className = ''
}) => {
  const sensorConfig: Record<SensorType, {
    icon: typeof Droplets;
    color: string;
    bgColor: string;
    borderColor: string;
  }> = {
    soil_moisture: {
      icon: Droplets,
      color: 'text-info',
      bgColor: 'bg-info-tint dark:bg-info/15',
      borderColor: 'border-l-info'
    },
    temperature: {
      icon: Thermometer,
      color: 'text-accent',
      bgColor: 'bg-accent-tint dark:bg-accent/15',
      borderColor: 'border-l-accent'
    },
    humidity: {
      icon: Wind,
      color: 'text-info',
      bgColor: 'bg-info-tint dark:bg-info/15',
      borderColor: 'border-l-info'
    },
    wind: {
      icon: Wind,
      color: 'text-slate-500',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      borderColor: 'border-l-slate-400'
    },
    light: {
      icon: Sun,
      color: 'text-accent',
      bgColor: 'bg-accent-tint dark:bg-accent/15',
      borderColor: 'border-l-accent'
    },
    ph: {
      icon: Gauge,
      color: 'text-secondary',
      bgColor: 'bg-secondary-tint dark:bg-secondary/15',
      borderColor: 'border-l-secondary'
    },
    nitrogen: {
      icon: Leaf,
      color: 'text-primary',
      bgColor: 'bg-primary-tint dark:bg-primary/15',
      borderColor: 'border-l-primary'
    }
  };

  const config = sensorConfig[type];
  const Icon = config.icon;

  const statusConfig: Record<SensorStatus, {
    color: string;
    icon: typeof Wifi;
    label: string;
  }> = {
    online: { color: 'text-success', icon: Wifi, label: 'Online' },
    offline: { color: 'text-slate-400', icon: WifiOff, label: 'Offline' },
    warning: { color: 'text-warning', icon: AlertTriangle, label: 'Warning' },
    error: { color: 'text-danger', icon: AlertTriangle, label: 'Error' }
  };

  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;

  const percentage = min !== undefined && max !== undefined
    ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
    : 50;

  const isOptimal = optimal
    ? value >= optimal.min && value <= optimal.max
    : true;

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-card
        border border-border
        border-l-4 ${config.borderColor}
        rounded-md p-5
        shadow-sm hover:shadow-md
        transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`
          ${config.bgColor}
          w-12 h-12 rounded-md flex items-center justify-center
        `}>
          <Icon className={config.color} size={24} />
        </div>

        <div className="flex items-center gap-2">
          {battery !== undefined && (
            <div className="flex items-center gap-1">
              {battery < 20 ? (
                <BatteryLow size={14} className="text-danger" />
              ) : (
                <Battery size={14} className="text-muted-foreground" />
              )}
              <span className="text-[10px] text-muted-foreground">{battery}%</span>
            </div>
          )}
          <div className={`flex items-center gap-1 ${statusInfo.color}`}>
            <StatusIcon size={14} />
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
        {name}
      </h4>
      {location && (
        <p className="text-xs text-muted-foreground mb-3">
          {location}
        </p>
      )}

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-sm text-muted-foreground">
            {unit}
          </span>
        </div>

        {optimal && (
          <div className={`
            inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-sm text-[10px] font-medium
            ${isOptimal
              ? 'bg-success-tint text-success'
              : 'bg-warning-tint text-warning'
            }
          `}>
            {isOptimal ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
            {isOptimal ? 'Optimal' : 'Attention needed'}
          </div>
        )}
      </div>

      {min !== undefined && max !== undefined && (
        <div className="mb-3">
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOptimal ? 'bg-success' : 'bg-warning'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>{min}{unit}</span>
            <span>{max}{unit}</span>
          </div>
        </div>
      )}

      {lastUpdate && (
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock size={10} />
          <span>Updated {lastUpdate}</span>
        </div>
      )}
    </div>
  );
};

export default SensorCard;
