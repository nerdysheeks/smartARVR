import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '@/providers/LanguageProvider';
import { useAuth } from '@/providers/AuthProvider';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { availableLanguages, changeLanguage, currentLanguage, t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [languageSelected, setLanguageSelected] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setLanguageSelected(true);
    setTimeout(() => {
      router.replace('/auth/login');
    }, 1000);
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6', '#60A5FA']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>SAITAP</Text>
          </View>
          <Text style={styles.subtitle}>Smart AR/VR Industrial Training</Text>
          <Text style={styles.tagline}>& Assistance Platform</Text>
        </View>

        {/* Language Selection */}
        {!languageSelected && (
          <View style={styles.languageSection}>
            <Text style={styles.languageTitle}>Select Your Language</Text>
            <Text style={styles.languageSubtitle}>Selecciona tu idioma</Text>
            
            <View style={styles.languageOptions}>
              {availableLanguages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageButton,
                    currentLanguage === language.code && styles.selectedLanguage
                  ]}
                  onPress={() => handleLanguageSelect(language.code)}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                  <Text style={styles.languageName}>{language.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Loading State */}
        {languageSelected && (
          <View style={styles.loadingSection}>
            <Text style={styles.loadingText}>{t('common.loading')}</Text>
            <View style={styles.loadingBar}>
              <View style={styles.loadingProgress} />
            </View>
          </View>
        )}

        {/* Features List */}
        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔍</Text>
            <Text style={styles.featureText}>AR Machine Recognition</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🥽</Text>
            <Text style={styles.featureText}>VR Training Modules</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <Text style={styles.featureText}>Safety Compliance</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Progress Analytics</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  languageSection: {
    alignItems: 'center',
  },
  languageTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  languageSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  languageOptions: {
    width: '100%',
    gap: 15,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedLanguage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  flag: {
    fontSize: 32,
    marginRight: 20,
  },
  languageName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  loadingSection: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  loadingBar: {
    width: 200,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 3,
  },
  featuresSection: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
});