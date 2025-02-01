import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import ProductListScreen from './ProductListScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Collection'>;

export default function CollectionScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <ProductListScreen
        title={route.params.title}
        initialSort={route.params.initialSort}
        handle={route.params.handle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
