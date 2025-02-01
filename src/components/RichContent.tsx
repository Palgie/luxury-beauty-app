import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RichContent as RichContentType } from '@/types/productList';
import { theme } from '@/theme';

interface RichContentProps {
  content: RichContentType[];
}

export default function RichContent({ content }: RichContentProps) {
  return (
    <>
      {content.map((item, index) => {
        switch (item.type) {
          case 'text':
            return (
              <Text key={index} style={styles.text}>
                {item.content}
              </Text>
            );
          case 'heading':
            return (
              <Text key={index} style={styles.heading}>
                {item.content}
              </Text>
            );
          default:
            return (
              <Text key={index} style={styles.text}>
                {item.content}
              </Text>
            );
        }
      })}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sans,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  heading: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.serifBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
});
