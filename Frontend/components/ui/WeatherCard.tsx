// =====================================================
// Weather Card Component - RwandaBeyond Agri-Business
// =====================================================

import React from 'react';
import {
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle,
  Wind, Droplets, Thermometer, Eye, Gauge, Sunrise, Sunset,
  MapPin, RefreshCw
} from 'lucide-react';

type WeatherCondition = 'clear' | 'cloudy' | 'rain' | 'drizzle' | 'storm' | 'snow' | 'fog';

interface WeatherData {
  location: string;
  temperature: number;
  feelsLike?: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection?: string;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  sunrise?: string;
  sunset?: string;
}

interface ForecastDay {
  day: string;
  date?: string;
  tempHigh: number;
  tempLow: number;
  condition: WeatherCondition;
  precipitation?: number;
}

interface WeatherCardProps {
  weather: WeatherData;
  forecast?: ForecastDay[];
  onRefresh?: () => void;
  isLoading?: boolean;
  variant?: 'full' | 'compact' | 'minimal';
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  forecast,
  onRefresh,
  isLoading = false,
  variant = 'full',
  className = ''
}) => {
  const conditionConfig: Record<WeatherCondition, {
    icon: typeof Sun;
    bgColor: string;
    iconColor: string;
  }> = {
    clear: {
      icon: Sun,
      bgColor: 'bg-accent-tint',
      iconColor: 'text-accent'
    },
    cloudy: {
      icon: Cloud,
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-500'
    },
    rain: {
      icon: CloudRain,
      bgColor: 'bg-info-tint',
      iconColor: 'text-info'
    },
    drizzle: {
      icon: CloudDrizzle,
      bgColor: 'bg-info-tint',
      iconColor: 'text-info'
    },
    storm: {
      icon: CloudLightning,
      bgColor: 'bg-slate-200 dark:bg-slate-700',
      iconColor: 'text-slate-600'
    },
    snow: {
      icon: CloudSnow,
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-400'
    },
    fog: {
      icon: Cloud,
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-400'
    }
  };

  const config = conditionConfig[weather.condition];
  const WeatherIcon = config.icon;

  if (variant === 'minimal') {
    return (
      <div className={`
        flex items-center gap-3 p-3 rounded-md
        bg-white dark:bg-card
        border border-border
        ${className}
      `}>
        <WeatherIcon className={config.iconColor} size={28} />
        <div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {weather.temperature}°C
          </p>
          <p className="text-xs text-muted-foreground">{weather.location}</p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`
        ${config.bgColor}
        rounded-md p-5
        ${className}
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <MapPin size={14} />
            <span className="text-sm font-medium">{weather.location}</span>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-1.5 rounded-sm bg-white/60 hover:bg-white/80 transition-colors"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold">{weather.temperature}°C</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm capitalize">{weather.description}</p>
          </div>
          <WeatherIcon className={config.iconColor} size={48} />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <Droplets size={16} className="mx-auto mb-1 text-info" />
            <p className="text-sm font-semibold">{weather.humidity}%</p>
            <p className="text-[10px] text-muted-foreground">Humidity</p>
          </div>
          <div className="text-center">
            <Wind size={16} className="mx-auto mb-1 text-slate-500" />
            <p className="text-sm font-semibold">{weather.windSpeed} km/h</p>
            <p className="text-[10px] text-muted-foreground">Wind</p>
          </div>
          <div className="text-center">
            <Thermometer size={16} className="mx-auto mb-1 text-accent" />
            <p className="text-sm font-semibold">{weather.feelsLike || weather.temperature}°</p>
            <p className="text-[10px] text-muted-foreground">Feels Like</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      bg-white dark:bg-card
      border border-border
      rounded-md overflow-hidden shadow-sm
      ${className}
    `}>
      <div className={`${config.bgColor} p-6 relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <MapPin size={14} />
              <span className="text-sm font-medium">{weather.location}</span>
            </div>
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="p-2 rounded-sm bg-white/60 hover:bg-white/80 transition-colors"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold leading-none">{weather.temperature}°</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 capitalize">{weather.description}</p>
              {weather.feelsLike && (
                <p className="text-slate-500 text-xs mt-1">
                  Feels like {weather.feelsLike}°C
                </p>
              )}
            </div>
            <WeatherIcon className={`${config.iconColor}`} size={64} />
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted rounded-md">
          <Droplets className="mx-auto mb-2 text-info" size={20} />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{weather.humidity}%</p>
          <p className="text-xs text-muted-foreground">Humidity</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-md">
          <Wind className="mx-auto mb-2 text-slate-500" size={20} />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{weather.windSpeed} km/h</p>
          <p className="text-xs text-muted-foreground">Wind</p>
        </div>
        {weather.pressure && (
          <div className="text-center p-3 bg-muted rounded-md">
            <Gauge className="mx-auto mb-2 text-slate-500" size={20} />
            <p className="text-lg font-bold text-slate-900 dark:text-white">{weather.pressure} hPa</p>
            <p className="text-xs text-muted-foreground">Pressure</p>
          </div>
        )}
        {weather.visibility && (
          <div className="text-center p-3 bg-muted rounded-md">
            <Eye className="mx-auto mb-2 text-slate-500" size={20} />
            <p className="text-lg font-bold text-slate-900 dark:text-white">{weather.visibility} km</p>
            <p className="text-xs text-muted-foreground">Visibility</p>
          </div>
        )}
      </div>

      {(weather.sunrise || weather.sunset) && (
        <div className="px-4 pb-4">
          <div className="flex justify-center gap-8 p-3 bg-muted rounded-md">
            {weather.sunrise && (
              <div className="flex items-center gap-2">
                <Sunrise className="text-accent" size={20} />
                <div>
                  <p className="text-xs text-muted-foreground">Sunrise</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{weather.sunrise}</p>
                </div>
              </div>
            )}
            {weather.sunset && (
              <div className="flex items-center gap-2">
                <Sunset className="text-secondary" size={20} />
                <div>
                  <p className="text-xs text-muted-foreground">Sunset</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{weather.sunset}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {forecast && forecast.length > 0 && (
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            7-Day Forecast
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {forecast.map((day, index) => {
              const DayIcon = conditionConfig[day.condition].icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 text-center p-3 bg-muted rounded-md min-w-[70px]"
                >
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    {day.day}
                  </p>
                  <DayIcon
                    size={24}
                    className={`mx-auto mb-2 ${
                      day.condition === 'clear' ? 'text-accent' :
                      day.condition === 'rain' ? 'text-info' :
                      day.condition === 'cloudy' ? 'text-slate-400' :
                      'text-slate-500'
                    }`}
                  />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {day.tempHigh}°
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {day.tempLow}°
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
