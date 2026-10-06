import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder, Text, TouchableOpacity, Modal } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

type Point = { x: number; y: number };

const WIDTH = 260;
const HEIGHT = 100;
const HANDLE_RADIUS = 15;
const TOLERANCE = 30; // pixels of leeway

export default function ZigZagCaptcha({ onVerify }: { onVerify: (success: boolean) => void }) {
  const [points, setPoints] = useState<Point[]>([]);
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const position = useRef({ x: 0, y: 0 });
  const isVerifiedRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const generatePath = () => {
    const segments = 3;
    const newPoints: Point[] = [];
    const startX = HANDLE_RADIUS + 5;
    const endX = WIDTH - HANDLE_RADIUS - 5;
    const segmentWidth = (endX - startX) / segments;
    for (let i = 0; i <= segments; i++) {
      newPoints.push({
        x: startX + (i * segmentWidth),
        y: 20 + Math.random() * (HEIGHT - 40),
      });
    }
    setPoints(newPoints);
    setVerified(false);
    setFailed(false);
    isVerifiedRef.current = false;
    isAnimatingRef.current = false;
    pan.setValue({ x: 0, y: 0 });
    pan.setOffset({ x: 0, y: 0 });
    position.current = { x: 0, y: 0 };
    onVerify(false);
  };

  useEffect(() => {
    generatePath();
  }, []);

  useEffect(() => {
    if (points.length === 0) return;

    const id = pan.addListener((value) => {
      if (isVerifiedRef.current || isAnimatingRef.current) return;
      position.current = value;

      const currentX = value.x + points[0].x;
      if (currentX < points[0].x) return;

      let segIndex = 0;
      for (let i = 0; i < points.length - 1; i++) {
        if (currentX >= points[i].x && currentX <= points[i + 1].x) {
          segIndex = i;
          break;
        }
      }

      if (segIndex >= points.length - 1) return;

      const p1 = points[segIndex];
      const p2 = points[segIndex + 1];

      const progress = (currentX - p1.x) / (p2.x - p1.x);
      const expectedY = p1.y + progress * (p2.y - p1.y);
      const actualY = value.y + points[0].y;

      if (Math.abs(actualY - expectedY) > TOLERANCE) {
        // Fall off the path
        isAnimatingRef.current = true;
        setFailed(true);
        setModalVisible(false);
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start(() => {
          isAnimatingRef.current = false;
        });
      } else {
        // Success check
        if (currentX >= points[points.length - 1].x - 5) {
          if (isVerifiedRef.current) return;
          isVerifiedRef.current = true;
          setVerified(true);
          onVerify(true);
          Animated.spring(pan, {
            toValue: {
              x: points[points.length - 1].x - points[0].x,
              y: points[points.length - 1].y - points[0].y,
            },
            useNativeDriver: false,
          }).start(() => {
            // Delay closing modal so they can see success
            setTimeout(() => setModalVisible(false), 500);
          });
        }
      }
    });

    return () => pan.removeListener(id);
  }, [points, verified, pan, onVerify]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isVerifiedRef.current,
      onMoveShouldSetPanResponder: () => !isVerifiedRef.current,
      onPanResponderGrant: () => {
        isAnimatingRef.current = false;
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        if (!isVerifiedRef.current) {
          isAnimatingRef.current = true;
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            isAnimatingRef.current = false;
          });
        }
      },
    })
  ).current;

  if (points.length === 0) return null;

  // Generate SVG path string
  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.mainButton, 
          verified && styles.mainButtonVerified,
          failed && styles.mainButtonFailed
        ]}
        onPress={() => {
          if (!verified && !failed) {
            generatePath();
            setModalVisible(true);
          }
        }}
        disabled={verified || failed}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[
            styles.checkbox, 
            verified && styles.checkboxVerified,
            failed && styles.checkboxFailed
          ]}>
            {verified && <Text style={styles.checkmark}>✓</Text>}
            {failed && <Text style={styles.crossmark}>✕</Text>}
          </View>
          <Text style={[
            styles.mainButtonText, 
            verified && styles.mainButtonTextVerified,
            failed && styles.mainButtonTextFailed
          ]}>
            {verified ? 'Verified Human' : failed ? 'Clanker Detected. Get Out' : 'Verify you are human'}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Trace the path to verify</Text>
              <View style={styles.headerActions}>
                <TouchableOpacity onPress={generatePath} style={styles.refreshBtn}>
                  <Text style={styles.refreshText}>↻</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.trackContainer}>
              <Svg width={WIDTH} height={HEIGHT}>
                <Path
                  d={pathD}
                  stroke={verified ? '#4DD0E1' : '#E0E0E0'}
                  strokeWidth={TOLERANCE * 1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <Path
                  d={pathD}
                  stroke={verified ? '#26C6DA' : '#A3A3A3'}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>

              <Animated.View
                style={[
                  styles.handle,
                  {
                    backgroundColor: verified ? '#4DD0E1' : '#9580FF',
                    left: points[0].x - HANDLE_RADIUS,
                    top: points[0].y - HANDLE_RADIUS,
                    transform: pan.getTranslateTransform(),
                  },
                ]}
                {...panResponder.panHandlers}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'stretch',
    marginBottom: 8,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  mainButtonVerified: {
    borderColor: '#4DD0E1',
    backgroundColor: '#F0FBFC',
  },
  mainButtonFailed: {
    borderColor: '#E53935',
    backgroundColor: '#FFEBEE',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#A3A3A3',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checkboxVerified: {
    borderColor: '#4DD0E1',
    backgroundColor: '#4DD0E1',
  },
  checkboxFailed: {
    borderColor: '#E53935',
    backgroundColor: '#E53935',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crossmark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mainButtonText: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    fontSize: 16,
    color: '#333',
  },
  mainButtonTextVerified: {
    color: '#00838F',
  },
  mainButtonTextFailed: {
    color: '#D32F2F',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: WIDTH + 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: 'GoogleSansFlex-9pt-Medium',
    color: '#333',
    fontSize: 16,
  },
  refreshBtn: {
    padding: 4,
  },
  refreshText: {
    fontSize: 22,
    color: '#666',
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    fontSize: 20,
    color: '#999',
  },
  trackContainer: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  handle: {
    position: 'absolute',
    width: HANDLE_RADIUS * 2,
    height: HANDLE_RADIUS * 2,
    borderRadius: HANDLE_RADIUS,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#FFF',
  },
});
