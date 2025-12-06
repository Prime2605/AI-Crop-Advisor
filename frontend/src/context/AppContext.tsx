import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Location, WeatherData, CropRecommendation } from '../types';

interface AppContextType {
  state: AppState;
  setSelectedLocation: (location: Location | null) => void;
  setWeatherData: (data: WeatherData | null) => void;
  setCropRecommendations: (recommendations: CropRecommendation[]) => void;
  setLoading: (key: 'weather' | 'crops', value: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState: AppState = {
  selectedLocation: null,
  weatherData: null,
  cropRecommendations: [],
  loading: {
    weather: false,
    crops: false,
  },
  error: null,
};

type AppAction =
  | { type: 'SET_LOCATION'; payload: Location | null }
  | { type: 'SET_WEATHER'; payload: WeatherData | null }
  | { type: 'SET_CROPS'; payload: CropRecommendation[] }
  | { type: 'SET_LOADING'; payload: { key: 'weather' | 'crops'; value: boolean } }
  | { type: 'SET_ERROR'; payload: string | null };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, selectedLocation: action.payload };
    case 'SET_WEATHER':
      return { ...state, weatherData: action.payload };
    case 'SET_CROPS':
      return { ...state, cropRecommendations: action.payload };
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setSelectedLocation = (location: Location | null) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  };

  const setWeatherData = (data: WeatherData | null) => {
    dispatch({ type: 'SET_WEATHER', payload: data });
  };

  const setCropRecommendations = (recommendations: CropRecommendation[]) => {
    dispatch({ type: 'SET_CROPS', payload: recommendations });
  };

  const setLoading = (key: 'weather' | 'crops', value: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: { key, value } });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setSelectedLocation,
        setWeatherData,
        setCropRecommendations,
        setLoading,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

