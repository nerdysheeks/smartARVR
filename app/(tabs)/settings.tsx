import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { router } from 'expo-router';
import { User, Bell, Globe, Shield, Download, CircleHelp as HelpCircle, LogOut, ChevronRight, Moon, Volume2, Wifi, Smartphone } from 'lucide-react-native';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  type: 'navigation' | 'toggle' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { currentLanguage, availableLanguages, changeLanguage, t } = useLanguage();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/auth/splash');
          }
        }
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      availableLanguages.map(lang => ({
        text: `${lang.flag} ${lang.name}`,
        onPress: () => changeLanguage(lang.code)
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  };

  const handleOfflineDownload = () => {
    Alert.alert(
      'Download Training Content',
      'Download training modules for offline use. This may take several minutes.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => {
            Alert.alert('Success', 'Training content downloaded successfully!');
          }
        }
      ]
    );
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile Settings',
          subtitle: `${user?.name} • ${user?.role}`,
          icon: <User size={20} color="#3B82F6" />,
          type: 'navigation',
          onPress: () => Alert.alert('Profile', 'Profile settings coming soon!')
        }
      ] as SettingItem[]
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'language',
          title: 'Language',
          subtitle: availableLanguages.find(lang => lang.code === currentLanguage)?.name,
          icon: <Globe size={20} color="#10B981" />,
          type: 'navigation',
          onPress: handleLanguageChange
        },
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Get training reminders and updates',
          icon: <Bell size={20} color="#F59E0B" />,
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: <Moon size={20} color="#6B7280" />,
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode
        },
        {
          id: 'sound',
          title: 'Sound Effects',
          subtitle: 'Enable audio feedback',
          icon: <Volume2 size={20} color="#8B5CF6" />,
          type: 'toggle',
          value: soundEnabled,
          onToggle: setSoundEnabled
        }
      ] as SettingItem[]
    },
    {
      title: 'Training',
      items: [
        {
          id: 'offline',
          title: 'Offline Mode',
          subtitle: 'Use app without internet connection',
          icon: <Wifi size={20} color="#EF4444" />,
          type: 'toggle',
          value: offlineMode,
          onToggle: setOfflineMode
        },
        {
          id: 'download',
          title: 'Download Content',
          subtitle: 'Download training modules for offline use',
          icon: <Download size={20} color="#3B82F6" />,
          type: 'navigation',
          onPress: handleOfflineDownload
        }
      ] as SettingItem[]
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          icon: <HelpCircle size={20} color="#10B981" />,
          type: 'navigation',
          onPress: () => Alert.alert('Help', 'Help documentation coming soon!')
        },
        {
          id: 'privacy',
          title: 'Privacy & Security',
          subtitle: 'Manage your privacy settings',
          icon: <Shield size={20} color="#F59E0B" />,
          type: 'navigation',
          onPress: () => Alert.alert('Privacy', 'Privacy settings coming soon!')
        }
      ] as SettingItem[]
    }
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingContent}>
          <View style={styles.settingIcon}>
            {item.icon}
          </View>
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.settingAction}>
          {item.type === 'toggle' && (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
            />
          )}
          {item.type === 'navigation' && (
            <ChevronRight size={20} color="#9CA3AF" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>{t('common.settings')}</Text>
        <Text style={styles.headerSubtitle}>Manage your preferences</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>
              {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userRole}>{user?.role.toUpperCase()}</Text>
            <Text style={styles.userCompany}>{user?.companyId}</Text>
          </View>
          <View style={styles.userLevel}>
            <Text style={styles.levelText}>Level {user?.level}</Text>
            <Text style={styles.xpText}>{user?.xp} XP</Text>
          </View>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsContainer}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.logoutGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <LogOut size={20} color="#FFFFFF" />
              <Text style={styles.logoutText}>Sign Out</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>SAITAP</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Smart AR/VR Industrial Training & Assistance Platform
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitials: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 2,
  },
  userCompany: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  userLevel: {
    alignItems: 'flex-end',
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  xpText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 12,
    marginLeft: 4,
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 16,
  },
  settingAction: {
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 12,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
});