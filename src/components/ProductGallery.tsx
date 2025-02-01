import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { theme } from '@/theme';
import { haptics } from '@/utils/haptics';

interface ProductGalleryProps {
  images: Array<{
    largeProduct: string;
    zoom?: string;
  }>;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbnailPress = (index: number) => {
    haptics.light();
    setSelectedIndex(index);
  };

  if (!images?.length) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: images[selectedIndex].zoom }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailsContainer}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleThumbnailPress(index)}
            style={[
              styles.thumbnailWrapper,
              selectedIndex === index && styles.selectedThumbnail,
            ]}
          >
            <Image
              source={{ uri: image.largeProduct }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  mainImage: {
    width: '100%',
    aspectRatio: 1/1,
    backgroundColor: theme.colors.background.light,
  },
  thumbnailsContainer: {
    padding: theme.spacing.m,
  },
  thumbnailWrapper: {
    marginRight: theme.spacing.s,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: theme.colors.primary,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
});
