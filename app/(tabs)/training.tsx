import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock, CircleCheck as CheckCircle2, Lock, Star, Users, Trophy } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  status: 'completed' | 'in-progress' | 'locked' | 'available';
  xpReward: number;
  participants: number;
  rating: number;
}

export default function VRTrainingScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Industrial Safety Basics',
      description: 'Learn fundamental safety protocols and emergency procedures in industrial environments.',
      duration: '25 min',
      difficulty: 'Beginner',
      progress: 100,
      status: 'completed',
      xpReward: 150,
      participants: 1247,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Machine Operation: Lathe',
      description: 'Master the operation of industrial lathes with hands-on VR simulation.',
      duration: '45 min',
      difficulty: 'Intermediate',
      progress: 65,
      status: 'in-progress',
      xpReward: 300,
      participants: 892,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Quality Control Procedures',
      description: 'Understanding quality standards and inspection processes.',
      duration: '30 min',
      difficulty: 'Intermediate',
      progress: 0,
      status: 'available',
      xpReward: 200,
      participants: 654,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Advanced Welding Techniques',
      description: 'Master complex welding procedures in a risk-free virtual environment.',
      duration: '60 min',
      difficulty: 'Advanced',
      progress: 0,
      status: 'locked',
      xpReward: 500,
      participants: 423,
      rating: 4.9
    },
    {
      id: '5',
      title: 'Emergency Response Training',
      description: 'Practice emergency scenarios and response protocols.',
      duration: '35 min',
      difficulty: 'Intermediate',
      progress: 0,
      status: 'available',
      xpReward: 250,
      participants: 789,
      rating: 4.6
    }
  ];

  const categories = [
    { id: 'all', name: 'All Modules', count: trainingModules.length },
    { id: 'safety', name: 'Safety', count: 2 },
    { id: 'operations', name: 'Operations', count: 2 },
    { id: 'quality', name: 'Quality', count: 1 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#3B82F6';
      case 'available': return '#F59E0B';
      case 'locked': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={20} color="#10B981" />;
      case 'in-progress': return <Play size={20} color="#3B82F6" />;
      case 'available': return <Play size={20} color="#F59E0B" />;
      case 'locked': return <Lock size={20} color="#6B7280" />;
      default: return <Play size={20} color="#6B7280" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'Continue';
      case 'available': return 'Start Module';
      case 'locked': return 'Locked';
      default: return 'Start';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
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
        <Text style={styles.headerTitle}>VR Training Modules</Text>
        <Text style={styles.headerSubtitle}>Immersive learning experiences</Text>
      </LinearGradient>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name} ({category.count})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Training Modules */}
      <ScrollView style={styles.modulesContainer} showsVerticalScrollIndicator={false}>
        {trainingModules.map((module) => (
          <View key={module.id} style={styles.moduleCard}>
            {/* Module Header */}
            <View style={styles.moduleHeader}>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>
              </View>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(module.difficulty) }
              ]}>
                <Text style={styles.difficultyText}>{module.difficulty}</Text>
              </View>
            </View>

            {/* Module Stats */}
            <View style={styles.moduleStats}>
              <View style={styles.statItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.statText}>{module.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Star size={16} color="#F59E0B" />
                <Text style={styles.statText}>{module.rating}</Text>
              </View>
              <View style={styles.statItem}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.statText}>{module.participants}</Text>
              </View>
              <View style={styles.statItem}>
                <Trophy size={16} color="#F59E0B" />
                <Text style={styles.statText}>{module.xpReward} XP</Text>
              </View>
            </View>

            {/* Progress Bar */}
            {module.progress > 0 && (
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressPercentage}>{module.progress}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${module.progress}%`,
                        backgroundColor: getStatusColor(module.status)
                      }
                    ]} 
                  />
                </View>
              </View>
            )}

            {/* Action Button */}
            <TouchableOpacity 
              style={[
                styles.actionButton,
                module.status === 'locked' && styles.actionButtonDisabled
              ]}
              disabled={module.status === 'locked'}
            >
              <LinearGradient
                colors={
                  module.status === 'locked' 
                    ? ['#9CA3AF', '#6B7280']
                    : [getStatusColor(module.status), getStatusColor(module.status) + 'CC']
                }
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {getStatusIcon(module.status)}
                <Text style={styles.actionButtonText}>
                  {getStatusText(module.status)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
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
  filtersContainer: {
    paddingVertical: 16,
    paddingLeft: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  modulesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  moduleInfo: {
    flex: 1,
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  moduleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  moduleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  progressPercentage: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#374151',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionButton: {
    width: '100%',
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});