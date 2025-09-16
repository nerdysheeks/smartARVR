import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Translation {
  [key: string]: string | Translation;
}

interface Translations {
  [language: string]: Translation;
}

const translations: Translations = {
  en: {
    common: {
      welcome: 'Welcome',
      login: 'Login',
      logout: 'Logout',
      settings: 'Settings',
      back: 'Back',
      next: 'Next',
      save: 'Save',
      cancel: 'Cancel',
      loading: 'Loading...',
    },
    auth: {
      employeeId: 'Employee ID',
      companyCode: 'Company Code',
      biometricLogin: 'Use Biometric Login',
      loginButton: 'Sign In',
      invalidCredentials: 'Invalid credentials',
    },
    dashboard: {
      goodMorning: 'Good Morning',
      trainingProgress: 'Training Progress',
      dailyGoal: 'Daily Goal',
      recentBadges: 'Recent Badges',
      quickActions: 'Quick Actions',
      scanMachine: 'Scan Machine',
      startTraining: 'Start Training',
      safetyCheck: 'Safety Check',
    },
    training: {
      modules: 'Training Modules',
      inProgress: 'In Progress',
      completed: 'Completed',
      notStarted: 'Not Started',
      startModule: 'Start Module',
      resumeModule: 'Resume Module',
    },
  },
  es: {
    common: {
      welcome: 'Bienvenido',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      settings: 'Configuración',
      back: 'Atrás',
      next: 'Siguiente',
      save: 'Guardar',
      cancel: 'Cancelar',
      loading: 'Cargando...',
    },
    auth: {
      employeeId: 'ID de Empleado',
      companyCode: 'Código de Empresa',
      biometricLogin: 'Usar Inicio de Sesión Biométrico',
      loginButton: 'Iniciar Sesión',
      invalidCredentials: 'Credenciales inválidas',
    },
    dashboard: {
      goodMorning: 'Buenos Días',
      trainingProgress: 'Progreso de Entrenamiento',
      dailyGoal: 'Meta Diaria',
      recentBadges: 'Insignias Recientes',
      quickActions: 'Acciones Rápidas',
      scanMachine: 'Escanear Máquina',
      startTraining: 'Comenzar Entrenamiento',
      safetyCheck: 'Control de Seguridad',
    },
    training: {
      modules: 'Módulos de Entrenamiento',
      inProgress: 'En Progreso',
      completed: 'Completado',
      notStarted: 'No Iniciado',
      startModule: 'Iniciar Módulo',
      resumeModule: 'Continuar Módulo',
    },
  },
};

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('saitap_language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = async (language: string) => {
    try {
      await AsyncStorage.setItem('saitap_language', language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to English if translation not found
        current = translations.en;
        for (const fallbackKey of keys) {
          if (current && typeof current === 'object' && fallbackKey in current) {
            current = current[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof current === 'string' ? current : key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      availableLanguages,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};