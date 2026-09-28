import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onHide: () => void;
}

export default function Toast({ message, type = 'error', onHide }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(-50);
    
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => onHide());
    }, 4500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const getColors = () => {
    switch (type) {
      case 'error': return { bg: '#FFEBEE', border: '#E53935', text: '#C62828', icon: 'alert-circle' as const };
      case 'success': return { bg: '#E8F5E9', border: '#43A047', text: '#2E7D32', icon: 'checkmark-circle' as const };
      default: return { bg: '#E3F2FD', border: '#1E88E5', text: '#1565C0', icon: 'information-circle' as const };
    }
  };

  const colors = getColors();

  return (
    <Animated.View style={[
      styles.container,
      { 
        backgroundColor: colors.bg, 
        borderColor: colors.border,
        opacity,
        transform: [{ translateY }]
      }
    ]}>
      <Ionicons name={colors.icon} size={24} color={colors.text} style={styles.icon} />
      <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 320,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 9999,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontFamily: 'Gilmer-Regular',
    fontSize: 16,
    flexShrink: 1,
    lineHeight: 22,
  }
});
