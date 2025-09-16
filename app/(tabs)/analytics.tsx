import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartBar as BarChart3, TrendingUp, Clock, Award, Users, Target, Calendar, ChevronDown } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface AnalyticsData {
  completedModules: number;
  totalHours: number;
  averageScore: number;
  rank: number;
  weeklyProgress: number[];
  skillDistribution: { skill: string; level: number }[];
}

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const analyticsData: AnalyticsData = {
    completedModules: 18,
    totalHours: 42.5,
    averageScore: 87,
    rank: 12,
    weeklyProgress: [2, 4, 3, 5, 6, 4, 7],
    skillDistribution: [
      { skill: 'Safety', level: 9 },
      { skill: 'Operations', level: 7 },
      { skill: 'Quality', level: 6 },
      { skill: 'Maintenance', level: 4 },
    ]
  };

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' },
  ];

  const achievements = [
    { title: 'Safety Champion', description: 'Completed all safety modules', icon: '🛡️', color: '#10B981' },
    { title: 'Quick Learner', description: 'Finished 5 modules in one week', icon: '⚡', color: '#F59E0B' },
    { title: 'Perfect Score', description: 'Achieved 100% in 3 assessments', icon: '🎯', color: '#3B82F6' },
  ];

  const getProgressColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return '#10B981';
    if (percentage >= 60) return '#F59E0B';
    return '#EF4444';
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
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Analytics Dashboard</Text>
          <Text style={styles.headerSubtitle}>Track your learning progress</Text>
        </View>
        
        {/* Period Selector */}
        <TouchableOpacity 
          style={styles.periodSelector}
          onPress={() => setShowPeriodDropdown(!showPeriodDropdown)}
        >
          <Text style={styles.periodText}>
            {periods.find(p => p.id === selectedPeriod)?.name}
          </Text>
          <ChevronDown size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Metrics</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Award size={24} color="#3B82F6" />
              </View>
              <Text style={styles.metricValue}>{analyticsData.completedModules}</Text>
              <Text style={styles.metricLabel}>Completed Modules</Text>
              <View style={styles.metricChange}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={styles.metricChangeText}>+3 this week</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Clock size={24} color="#F59E0B" />
              </View>
              <Text style={styles.metricValue}>{analyticsData.totalHours}h</Text>
              <Text style={styles.metricLabel}>Training Hours</Text>
              <View style={styles.metricChange}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={styles.metricChangeText}>+8.5h this week</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Target size={24} color="#10B981" />
              </View>
              <Text style={styles.metricValue}>{analyticsData.averageScore}%</Text>
              <Text style={styles.metricLabel}>Average Score</Text>
              <View style={styles.metricChange}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={styles.metricChangeText}>+5% this week</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Users size={24} color="#EF4444" />
              </View>
              <Text style={styles.metricValue}>#{analyticsData.rank}</Text>
              <Text style={styles.metricLabel}>Team Rank</Text>
              <View style={styles.metricChange}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={styles.metricChangeText}>↑3 positions</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly Progress Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Modules Completed</Text>
              <Text style={styles.chartSubtitle}>Last 7 days</Text>
            </View>
            
            <View style={styles.barChart}>
              {analyticsData.weeklyProgress.map((value, index) => {
                const maxValue = Math.max(...analyticsData.weeklyProgress);
                const height = (value / maxValue) * 100;
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={styles.barWrapper}>
                      <View 
                        style={[
                          styles.bar,
                          { 
                            height: `${height}%`,
                            backgroundColor: index === 6 ? '#3B82F6' : '#E5E7EB'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.barLabel}>{days[index]}</Text>
                    <Text style={styles.barValue}>{value}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Skills Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills Development</Text>
          
          <View style={styles.skillsContainer}>
            {analyticsData.skillDistribution.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <View style={styles.skillHeader}>
                  <Text style={styles.skillName}>{skill.skill}</Text>
                  <Text style={styles.skillLevel}>{skill.level}/10</Text>
                </View>
                
                <View style={styles.skillProgressBar}>
                  <View 
                    style={[
                      styles.skillProgressFill,
                      { 
                        width: `${(skill.level / 10) * 100}%`,
                        backgroundColor: getProgressColor(skill.level, 10)
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                  <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Learning Streak */}
        <View style={styles.section}>
          <View style={styles.streakCard}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.streakGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.streakEmoji}>🔥</Text>
              <Text style={styles.streakNumber}>7</Text>
              <Text style={styles.streakText}>Day Learning Streak</Text>
              <Text style={styles.streakSubtext}>Keep it up! You're on fire!</Text>
            </LinearGradient>
          </View>
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
  headerContent: {
    marginBottom: 16,
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
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginRight: 6,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricIcon: {
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChangeText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    marginLeft: 2,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    height: 80,
    width: 20,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 2,
  },
  barLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  skillsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  skillItem: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  skillLevel: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#6B7280',
  },
  skillProgressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  skillProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 16,
  },
  streakCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  streakGradient: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  streakEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  streakText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  streakSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});