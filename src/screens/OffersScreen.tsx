import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { haptics } from '@/utils/haptics';

interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: {
    type: 'percentage' | 'fixed' | 'gift';
    value: number;
    description: string;
  };
  validUntil: string;
  brand?: {
    name: string;
    logo: string;
  };
}

const offers: Offer[] = [
  {
    id: 'summer-skincare',
    title: 'Summer Skincare Essentials',
    description: 'Get ready for summer with our luxury skincare collection',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    discount: {
      type: 'percentage',
      value: 20,
      description: '20% off on selected skincare',
    },
    validUntil: '2025-08-31',
    brand: {
      name: 'Lancôme',
      logo: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200',
    },
  },
  {
    id: 'luxury-fragrances',
    title: 'Luxury Fragrance Collection',
    description: 'Discover our exclusive collection of luxury fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    discount: {
      type: 'gift',
      value: 0,
      description: 'Free luxury pouch with any fragrance purchase',
    },
    validUntil: '2025-07-15',
  },
  {
    id: 'premium-makeup',
    title: 'Premium Makeup Sets',
    description: 'Create stunning looks with our premium makeup collection',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
    discount: {
      type: 'fixed',
      value: 50,
      description: '£50 off when you spend £200',
    },
    validUntil: '2025-06-30',
    brand: {
      name: 'Dior',
      logo: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=200',
    },
  },
];

export default function OffersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOfferPress = (offer: Offer) => {
    haptics.light();
    if (offer.brand) {
      navigation.navigate('Category', {
        category: `brand-${offer.brand.name.toLowerCase()}`,
        title: offer.brand.name,
      });
    } else {
      navigation.navigate('Category', {
        category: offer.id,
        title: 'Special Offer',
      });
    }
  };

  const renderItem = ({ item }: { item: Offer }) => (
    <Pressable
      style={styles.offerCard}
      onPress={() => handleOfferPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.offerImage}
        resizeMode="cover"
      />
      <View style={styles.offerContent}>
        {item.brand && (
          <Image
            source={{ uri: item.brand.logo }}
            style={styles.brandLogo}
            resizeMode="contain"
          />
        )}
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerDescription}>{item.description}</Text>
        <View style={styles.discountContainer}>
          <Ionicons
            name={
              item.discount.type === 'percentage'
                ? 'pricetag'
                : item.discount.type === 'gift'
                ? 'gift'
                : 'cash'
            }
            size={20}
            color={theme.colors.primary}
            style={styles.discountIcon}
          />
          <Text style={styles.discountText}>
            {item.discount.description}
          </Text>
        </View>
        <Text style={styles.validUntil}>
          Valid until {new Date(item.validUntil).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Offers</Text>
      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  title: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    padding: theme.spacing.m,
  },
  list: {
    padding: theme.spacing.m,
  },
  offerCard: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  offerImage: {
    width: '100%',
    height: 200,
  },
  offerContent: {
    padding: theme.spacing.m,
  },
  brandLogo: {
    width: 100,
    height: 30,
    marginBottom: theme.spacing.s,
  },
  offerTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  offerDescription: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.m,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.light,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.s,
  },
  discountIcon: {
    marginRight: theme.spacing.s,
  },
  discountText: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
    flex: 1,
  },
  validUntil: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
});
