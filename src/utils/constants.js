/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
import Testing from './dazzfilters/Testing';

export const {width, height} = Dimensions.get('window');

export const imageFiltersWithCategory = [
  {
    category: 'Digital',
    filters: [
      {
        name: 'Testing',
        Element: Testing,
        icon: require('../assets/images/icons/vintage1.png'),
      },
    ],
  },
];

export const imageFilters = imageFiltersWithCategory.flatMap(
  category => category.filters,
);
