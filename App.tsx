import React from 'react';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/apollo';
import { CartProvider } from '@/context/CartContext';
import RootNavigator from '@/navigation/RootNavigator';
import {
  useFonts,
  PlayfairDisplay_400Regular as PlayfairDisplay,
  PlayfairDisplay_700Bold as PlayfairDisplayBold,
} from '@expo-google-fonts/playfair-display';
import {
  Inter_400Regular as Inter,
  Inter_500Medium as InterMedium,
} from '@expo-google-fonts/inter';
import LoadingState from '@/components/LoadingState';

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay,
    'PlayfairDisplay-Bold': PlayfairDisplayBold,
    Inter,
    'Inter-Medium': InterMedium,
  });

  if (!fontsLoaded) {
    return <LoadingState />;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CartProvider>
          <RootNavigator />
        </CartProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
