import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { SortOption } from '@/types/productList';
import { haptics } from '@/utils/haptics';

interface SortHeaderProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  total: number;
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'POPULARITY', label: 'Most Popular' },
  { value: 'PRICE_LOW_TO_HIGH', label: 'Price: Low to High' },
  { value: 'PRICE_HIGH_TO_LOW', label: 'Price: High to Low' },
  { value: 'NEWEST_TO_OLDEST', label: 'Newest' },
  { value: 'DISCOUNT_PERCENTAGE_HIGH_TO_LOW', label: 'Biggest Discount' },
];

export default function SortHeader({
  currentSort,
  onSortChange,
  total,
}: SortHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSortPress = (sort: SortOption) => {
    haptics.light();
    onSortChange(sort);
    setModalVisible(false);
  };

  const currentSortLabel = sortOptions.find(option => option.value === currentSort)?.label;

  return (
    <View style={styles.container}>
      <Text style={styles.total}>{total} Products</Text>
      <Pressable
        style={({ pressed }) => [
          styles.sortButton,
          pressed && styles.sortButtonPressed,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.sortButtonText}>{currentSortLabel}</Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={20}
          color={theme.colors.text.primary}
        />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {sortOptions.map((option) => (
              <Pressable
                key={option.value}
                style={({ pressed }) => [
                  styles.sortOption,
                  option.value === currentSort && styles.sortOptionSelected,
                  pressed && styles.sortOptionPressed,
                ]}
                onPress={() => handleSortPress(option.value)}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    option.value === currentSort && styles.sortOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {option.value === currentSort && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color={theme.colors.brand}
                  />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  total: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.sans,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
  },
  sortButtonPressed: {
    opacity: 0.7,
  },
  sortButtonText: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.sansMedium,
    marginRight: theme.spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background.main,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
  },
  sortOptionPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  sortOptionSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  sortOptionText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.sans,
  },
  sortOptionTextSelected: {
    color: theme.colors.brand,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },
});
