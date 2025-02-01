import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductDescription } from '@/components/ProductDescription';
import { ProductPrice } from '@/components/ProductPrice';
import LoadingButton from '@/components/LoadingButton';
import { theme } from '@/theme';
import { useCart } from '@/hooks/useCart';
import { haptics } from '@/utils/haptics';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '@/services/queries/products';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

interface ContentItem {
  type: string;
  content: string;
}

interface RichContent {
  content: ContentItem[];
}

interface ProductContentValue {
  __typename: string;
  richContentValue?: {
    content: ContentItem[];
  };
  richContentListValue?: RichContent[];
}

interface ProductContent {
  key: string;
  value: ProductContentValue;
}

export default function ProductDetailsScreen({ route }: Props) {
  const { addItem } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { 
      sku: route.params.productId,
      currency: 'GBP',
      shippingDestination: 'GB'
    },
  });

  const handleAddToCart = async () => {
    if (!data?.product) return;

    haptics.light();
    setIsAddingToCart(true);
    try {
      await addItem({
        id: data.product.sku,
        title: data.product.title,
        brandName: data.product.brand.name,
        imageUrl: data.product.images[0]?.largeProduct || '',
        price: {
          now: data.product.variants[0]?.price.price.amount || 0,
          currency: data.product.variants[0]?.price.price.currency || 'GBP'
        },
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!data?.product) return null;

  const synopsisContent = data.product.content.find(
    (c: ProductContent) => c.key === 'synopsis'
  )?.value;

  const content = synopsisContent?.richContentListValue?.[0]?.content || [];

  const variant = data.product.variants[0];
  const price = variant?.price?.price;
  const rrp = variant?.price?.rrp;

  return (
    <KeyboardAvoidingView 
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductGallery images={data.product.images} />
        <View style={styles.container}>
          <Text style={styles.brand}>{data.product.brand.name}</Text>
          <Text style={styles.title}>{data.product.title}</Text>
          {price && (
            <ProductPrice 
              price={price}
              rrp={rrp}
            />
          )}
        </View>
          <ProductDescription content={content} />
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <SafeAreaView style={styles.footer}>
        <View style={styles.buttonContainer}>
          <LoadingButton
            title="Add to Cart"
            onPress={handleAddToCart}
            loading={isAddingToCart}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.m,
  },
  container: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
  },
  infoContainer: {
    backgroundColor: theme.colors.background.main,
    padding: theme.spacing.m,
  },
  brand: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.brand,
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.serifBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  bottomSpacer: {
    height: 80, // Space for the fixed button
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.main,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  buttonContainer: {
    padding: theme.spacing.m,
  },
  button: {
    width: '100%',
  },
});
