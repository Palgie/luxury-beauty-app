import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { theme } from '@/theme';

interface ContentItem {
  type: string;
  content: string;
}

interface ProductDescriptionProps {
  content: ContentItem[];
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ content }) => {
  const { width } = useWindowDimensions();

  if (!content?.length) return null;
  const htmlContent = content
    .filter(item => item.type.toLowerCase() === 'html' || item.type.toLowerCase() === 'text')
    .map(item => item.content)
    .join('');
  console.log(htmlContent);
  if (!htmlContent) return null;

  const tagsStyles = {
    body: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.body,
      lineHeight: 24,
    },
    p: {
      marginBottom: theme.spacing.m,
    },
    ul: {
      marginBottom: theme.spacing.m,
    },
    li: {
      marginBottom: theme.spacing.xs,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Description</Text>
      <RenderHtml
        contentWidth={width}
        source={{ html: htmlContent }}
        tagsStyles={tagsStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
  },
  heading: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.serifBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
});
