import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera, QrCode, Zap, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface MachineryInfo {
  name: string;
  type: string;
  safetyLevel: 'high' | 'medium' | 'low';
  instructions: string[];
  lastMaintenance: string;
}

export default function ARScannerScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedMachine, setDetectedMachine] = useState<MachineryInfo | null>(null);

  const mockMachinery: MachineryInfo = {
    name: 'Industrial Lathe Model X200',
    type: 'Precision Cutting Equipment',
    safetyLevel: 'high',
    instructions: [
      'Wear safety goggles and gloves',
      'Check coolant levels before operation',
      'Ensure workpiece is properly secured',
      'Set appropriate cutting speed'
    ],
    lastMaintenance: '2024-01-15'
  };

  const handleScanMachine = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setDetectedMachine(mockMachinery);
      setIsScanning(false);
      Alert.alert('Machine Detected!', 'Industrial Lathe Model X200 has been identified.');
    }, 2000);
  };

  const handleQRScan = () => {
    Alert.alert(
      'QR Code Scanner',
      'Point your camera at the QR code on the machine',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Scan', 
          onPress: () => {
            setDetectedMachine(mockMachinery);
            Alert.alert('Success!', 'Machine information loaded from QR code.');
          }
        }
      ]
    );
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
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
        <Text style={styles.headerTitle}>AR Machine Scanner</Text>
        <Text style={styles.headerSubtitle}>Point camera at machinery for instant recognition</Text>
      </LinearGradient>

      {/* Camera Viewport Simulation */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraViewport}>
          {!isScanning && !detectedMachine && (
            <View style={styles.scanningOverlay}>
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
              <Text style={styles.scanText}>Position machine within the frame</Text>
            </View>
          )}

          {isScanning && (
            <View style={styles.scanningOverlay}>
              <View style={styles.scanningAnimation}>
                <LinearGradient
                  colors={['transparent', '#10B981', 'transparent']}
                  style={styles.scanLine}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
              </View>
              <Text style={styles.scanText}>Scanning machinery...</Text>
            </View>
          )}

          {detectedMachine && (
            <View style={styles.detectionOverlay}>
              <View style={styles.machineHighlight}>
                <View style={styles.detectionBadge}>
                  <CheckCircle size={16} color="#FFFFFF" />
                  <Text style={styles.detectionText}>Machine Detected</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={handleScanMachine}
            disabled={isScanning}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.scanButtonGradient}
            >
              <Camera size={24} color="#FFFFFF" />
              <Text style={styles.scanButtonText}>
                {isScanning ? 'Scanning...' : 'Scan Machine'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.qrButton} onPress={handleQRScan}>
            <QrCode size={20} color="#3B82F6" />
            <Text style={styles.qrButtonText}>QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Machine Information */}
      {detectedMachine && (
        <View style={styles.infoContainer}>
          <View style={styles.machineCard}>
            <View style={styles.machineHeader}>
              <View style={styles.machineInfo}>
                <Text style={styles.machineName}>{detectedMachine.name}</Text>
                <Text style={styles.machineType}>{detectedMachine.type}</Text>
              </View>
              <View style={[
                styles.safetyBadge, 
                { backgroundColor: getSafetyColor(detectedMachine.safetyLevel) }
              ]}>
                <AlertCircle size={16} color="#FFFFFF" />
                <Text style={styles.safetyText}>
                  {detectedMachine.safetyLevel.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.maintenanceInfo}>
              <Text style={styles.maintenanceLabel}>Last Maintenance:</Text>
              <Text style={styles.maintenanceDate}>{detectedMachine.lastMaintenance}</Text>
            </View>

            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Safety Instructions:</Text>
              {detectedMachine.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.instructionBullet} />
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.trainingButton}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.trainingButtonGradient}
              >
                <Play size={20} color="#FFFFFF" />
                <Text style={styles.trainingButtonText}>Start Training Module</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  cameraContainer: {
    flex: 1,
  },
  cameraViewport: {
    flex: 1,
    backgroundColor: '#1F2937',
    position: 'relative',
  },
  scanningOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#10B981',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
  },
  scanningAnimation: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 4,
    position: 'absolute',
    top: '50%',
  },
  detectionOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  machineHighlight: {
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 3,
    borderColor: '#10B981',
    borderRadius: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  detectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  detectionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scanButton: {
    flex: 1,
    marginRight: 12,
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  scanButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  qrButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
    marginLeft: 6,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.6,
  },
  machineCard: {
    padding: 20,
  },
  machineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  machineInfo: {
    flex: 1,
  },
  machineName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  machineType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  safetyText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  maintenanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  maintenanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  maintenanceDate: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  instructionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F97316',
    marginTop: 6,
    marginRight: 10,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
  trainingButton: {
    width: '100%',
  },
  trainingButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  trainingButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});