/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
import Testing from './dazzfilters/Testing';
import IR from './omarfiltersv2/IR';
import OFMR from './omarfiltersv2/OFMR';
import Hoga from './omarfiltersv2/Hoga';

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
      {
        name: 'IR',
        Element: IR,
        icon: require('../assets/images/icons/b&w.png'),
      },

      {
        name: 'OFMR',
        Element: OFMR,
        icon: require('../assets/images/icons/cassette.png'),
      },

      {
        name: 'Hoga',
        Element: Hoga,
        icon: require('../assets/images/icons/sunset.png'),
      },
    ],
  },
];

export const imageFilters = imageFiltersWithCategory.flatMap(
  category => category.filters,
);
