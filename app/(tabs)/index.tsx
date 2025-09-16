import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { router } from 'expo-router';
import { Scan, Play, Shield, Award, TrendingUp, Clock, Target, Star, Zap, Users, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface QuickAction {
  title: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  description: string;
}

interface Badge {
  name: string;
  icon: string;
  color: string;
  date: string;
}

export default function DashboardScreen() {
  const { user, updateUserProgress } = useAuth();
  const { t } = useLanguage();
  const [dailyProgress, setDailyProgress] = useState(75);
  const [weeklyXP, setWeeklyXP] = useState(1250);
  const [recentBadges, setRecentBadges] = useState<Badge[]>([
    { name: 'Safety First', icon: '🛡️', color: '#10B981', date: '2 days ago' },
    { name: 'Quick Learner', icon: '⚡', color: '#F59E0B', date: '1 week ago' },
    { name: 'Team Player', icon: '👥', color: '#3B82F6', date: '2 weeks ago' },
  ]);

  const quickActions: QuickAction[] = [
    {
      title: t('dashboard.scanMachine'),
      icon: <Scan size={28} color="#FFFFFF" strokeWidth={2} />,
      color: '#10B981',
      route: '/scanner',
      description: 'Identify machinery and get instructions'
    },
    {
      title: t('dashboard.startTraining'),
      icon: <Play size={28} color="#FFFFFF" strokeWidth={2} />,
      color: '#3B82F6',
      route: '/training',
      description: 'Continue your VR learning modules'
    },
    {
      title: t('dashboard.safetyCheck'),
      icon: <Shield size={28} color="#FFFFFF" strokeWidth={2} />,
      color: '#EF4444',
      route: '/safety',
      description: 'Verify safety compliance status'
    },
    {
      title: 'Performance',
      icon: <TrendingUp size={28} color="#FFFFFF" strokeWidth={2} />,
      color: '#F59E0B',
      route: '/analytics',
      description: 'View your training analytics'
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.goodMorning');
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleQuickAction = (route: string) => {
    if (route === '/safety') {
      Alert.alert('Safety Check', 'All safety protocols are up to date!', [
        { text: 'OK', onPress: () => updateUserProgress(50) }
      ]);
    } else {
      router.push(route as any);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>{getGreeting()}</Text>
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text style={styles.roleText}>{user?.role.toUpperCase()} • {user?.employeeId}</Text>
          </View>
          
          <View style={styles.levelContainer}>
            <View style={styles.levelBadge}>
              <Star size={16} color="#F59E0B" />
              <Text style={styles.levelText}>Level {user?.level}</Text>
            </View>
            <Text style={styles.xpText}>{user?.xp} XP</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Progress Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('dashboard.trainingProgress')}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressInfo}>
                <Target size={20} color="#3B82F6" />
                <Text style={styles.progressLabel}>{t('dashboard.dailyGoal')}</Text>
              </View>
              <Text style={styles.progressPercentage}>{dailyProgress}%</Text>
            </View>
            
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${dailyProgress}%` }]} />
            </View>
            
            <Text style={styles.progressSubtext}>3 of 4 modules completed today</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Zap size={20} color="#F59E0B" />
              </View>
              <Text style={styles.statValue}>{weeklyXP}</Text>
              <Text style={styles.statLabel}>Weekly XP</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Clock size={20} color="#10B981" />
              </View>
              <Text style={styles.statValue}>12.5h</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <CheckCircle2 size={20} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('dashboard.quickActions')}</Text>
        
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={() => handleQuickAction(action.route)}
            >
              <LinearGradient
                colors={[action.color, `${action.color}CC`]}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.quickActionIcon}>
                  {action.icon}
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>{action.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('dashboard.recentBadges')}</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.badgesContainer}>
            {recentBadges.map((badge, index) => (
              <View key={index} style={styles.badgeCard}>
                <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
                  <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDate}>{badge.date}</Text>
              </View>
            ))}
            
            <TouchableOpacity style={styles.viewAllBadges}>
              <Award size={24} color="#6B7280" />
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Safety Alert */}
      <View style={styles.section}>
        <View style={styles.safetyAlert}>
          <View style={styles.safetyAlertHeader}>
            <AlertTriangle size={20} color="#F59E0B" />
            <Text style={styles.safetyAlertTitle}>Safety Reminder</Text>
          </View>
          <Text style={styles.safetyAlertText}>
            Remember to wear your safety equipment before operating machinery. 
            Your safety is our priority.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  levelContainer: {
    alignItems: 'flex-end',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 4,
  },
  levelText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  xpText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  progressContainer: {
    gap: 16,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginLeft: 8,
  },
  progressPercentage: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 52) / 2,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  quickActionIcon: {
    alignSelf: 'flex-start',
  },
  quickActionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
  },
  badgeCard: {
    alignItems: 'center',
    width: 100,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDate: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  viewAllBadges: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  safetyAlert: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  safetyAlertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyAlertTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginLeft: 8,
  },
  safetyAlertText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#78350F',
    lineHeight: 20,
  },
});