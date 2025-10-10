import {createContext} from 'react';
import {Dimensions} from 'react-native';
import Testing from './dazzfilters/Testing';
import IR from './omarfiltersv2/IR';
import OFMR from './omarfiltersv2/OFMR';
import Hoga from './omarfiltersv2/Hoga';
import NE135WithLayer from './omarfiltersv3/NE135WithLayer';
import NE135 from './omarfiltersv3/NE135';
import FQS from './omarfiltersv3/FQS';
import KIV88 from './omarfiltersv3/KIV88';

export const {width, height} = Dimensions.get('window');

export const AppContext = createContext();

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

      {
        name: 'NE135WithLayer',
        Element: NE135WithLayer,
        icon: require('../assets/images/icons/vintage2.png'),
      },
      {
        name: 'NE135',
        Element: NE135,
        icon: require('../assets/images/icons/moon.png'),
      },
      {
        name: 'FQS',
        Element: FQS,
        icon: require('../assets/images/icons/coffee.png'),
      },
      {
        name: 'KIV88',
        Element: KIV88,
        icon: require('../assets/images/icons/cloudy.png'),
      },
    ],
  },
];

export const imageFilters = imageFiltersWithCategory.flatMap(
  category => category.filters,
);
