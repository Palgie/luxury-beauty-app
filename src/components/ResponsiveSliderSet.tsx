import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { theme } from '@/theme';

interface SlideContent {
  id: string;
  content: React.ReactNode;
}

interface ResponsiveSliderSetProps {
  slides: SlideContent[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
}

export const ResponsiveSliderSet: React.FC<ResponsiveSliderSetProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
  showDots = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      autoPlayRef.current = setInterval(() => {
        const nextIndex = (activeIndex + 1) % slides.length;
        setActiveIndex(nextIndex);
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, autoPlay, interval, slides.length, width]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleDotPress = (index: number) => {
    setActiveIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            {slide.content}
          </View>
        ))}
      </ScrollView>
      {showDots && slides.length > 1 && (
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              style={styles.dotButton}
            >
              <View
                style={[
                  styles.dot,
                  index === activeIndex && styles.activeDot,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  scrollView: {
    flexGrow: 0,
  },
  slide: {
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: theme.spacing.m,
    left: 0,
    right: 0,
  },
  dotButton: {
    padding: theme.spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.background.main,
    opacity: 0.4,
    marginHorizontal: 4,
  },
  activeDot: {
    opacity: 1,
  },
});
