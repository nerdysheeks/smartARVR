import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Fingerprint, Building, User, Lock, ArrowRight } from 'lucide-react-native';

export default function LoginScreen() {
  const [employeeId, setEmployeeId] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleLogin = async () => {
    if (!employeeId.trim() || !companyCode.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const success = await login({
        employeeId: employeeId.trim(),
        companyCode: companyCode.trim(),
        biometric: biometricEnabled,
      });

      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', t('auth.invalidCredentials'));
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    // Simulate biometric authentication
    Alert.alert(
      'Biometric Authentication',
      'Place your finger on the sensor',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Authenticate', 
          onPress: async () => {
            setLoading(true);
            // Simulate biometric success
            setTimeout(async () => {
              const success = await login({
                employeeId: 'biometric_user',
                companyCode: 'DEMO001',
                biometric: true,
              });
              if (success) {
                router.replace('/(tabs)');
              }
              setLoading(false);
            }, 1500);
          }
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>{t('common.welcome')}</Text>
            <Text style={styles.subtitleText}>Sign in to continue your training</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Employee ID Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <User size={20} color="#6B7280" />
              </View>
              <TextInput
                style={styles.input}
                placeholder={t('auth.employeeId')}
                placeholderTextColor="#9CA3AF"
                value={employeeId}
                onChangeText={setEmployeeId}
                autoCapitalize="none"
                autoComplete="username"
              />
            </View>

            {/* Company Code Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Building size={20} color="#6B7280" />
              </View>
              <TextInput
                style={styles.input}
                placeholder={t('auth.companyCode')}
                placeholderTextColor="#9CA3AF"
                value={companyCode}
                onChangeText={setCompanyCode}
                autoCapitalize="characters"
                autoComplete="organization"
              />
            </View>

            {/* Biometric Toggle */}
            <TouchableOpacity 
              style={styles.biometricToggle}
              onPress={() => setBiometricEnabled(!biometricEnabled)}
            >
              <View style={styles.toggleContainer}>
                <Fingerprint size={24} color={biometricEnabled ? '#F97316' : '#6B7280'} />
                <Text style={[styles.toggleText, biometricEnabled && styles.toggleTextActive]}>
                  {t('auth.biometricLogin')}
                </Text>
              </View>
              <View style={[styles.toggle, biometricEnabled && styles.toggleActive]}>
                <View style={[styles.toggleButton, biometricEnabled && styles.toggleButtonActive]} />
              </View>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? t('common.loading') : t('auth.loginButton')}
              </Text>
              {!loading && <ArrowRight size={20} color="#FFFFFF" />}
            </TouchableOpacity>

            {/* Biometric Login Button */}
            {biometricEnabled && (
              <TouchableOpacity 
                style={styles.biometricButton}
                onPress={handleBiometricLogin}
                disabled={loading}
              >
                <Fingerprint size={24} color="#F97316" />
                <Text style={styles.biometricButtonText}>Use Biometric Login</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Demo Credentials */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>Employee ID: worker001 or mgr001</Text>
            <Text style={styles.demoText}>Company Code: DEMO001</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    padding: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingRight: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  biometricToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 12,
  },
  toggleTextActive: {
    color: '#F97316',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#F97316',
  },
  toggleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButtonActive: {
    alignSelf: 'flex-end',
  },
  loginButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  biometricButton: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  biometricButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F97316',
    marginLeft: 8,
  },
  demoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
});