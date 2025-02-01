declare module 'react-native' {
  export * from '@types/react-native';
  
  // Add any additional type definitions if needed
  export interface StyleSheetStatic {
    create<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
      styles: T | StyleSheet.NamedStyles<T>
    ): T;
  }
  
  export const StyleSheet: StyleSheetStatic;
}
