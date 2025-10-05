/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
import Arabica from './filters/Arabica';
import {Ava} from './filters/Ava';
import {Vintage1} from './filters/Vintage1';
import {Vintage2} from './filters/Vintage2';
import {BlackAndWhite} from './filters/B&W';
import {ColdShade} from './filters/ColdShade';
import {VintageVibe} from './filters/VintageVibe';
import {Sunset} from './filters/Sunset';
import {Azrael} from './filters/Azrael';
import {Grf} from './filters/Grf';

export const {width, height} = Dimensions.get('window');

export const imageFiltersWithCategory = [
  {
    category: 'Digital',
    filters: [
      {
        name: 'Arabica',
        Element: Arabica,
        icon: require('../assets/images/icons/coffee.png'),
      },
      {
        name: 'Ava',
        Element: Ava,
        icon: require('../assets/images/icons/cloudy.png'),
      },
      {
        name: 'Azrael',
        Element: Azrael,
        icon: require('../assets/images/icons/moon.png'),
      },
      {
        name: 'Vintage1',
        Element: Vintage1,
        icon: require('../assets/images/icons/vintage1.png'),
      },
      {
        name: 'Vintage2',
        Element: Vintage2,
        icon: require('../assets/images/icons/vintage2.png'),
      },
      {
        name: 'B&W',
        Element: BlackAndWhite,
        icon: require('../assets/images/icons/b&w.png'),
      },
      {
        name: 'ColdShade',
        Element: ColdShade,
        icon: require('../assets/images/icons/cold-shade.png'),
      },
      {
        name: 'VintageVibe',
        Element: VintageVibe,
        icon: require('../assets/images/icons/cassette.png'),
      },
      {
        name: 'Sunset',
        Element: Sunset,
        icon: require('../assets/images/icons/sunset.png'),
      },
      {
        name: 'Grf',
        Element: Grf,
        icon: require('../assets/images/icons/grf.png'),
      },
    ],
  },
];

export const imageFilters = imageFiltersWithCategory.flatMap(
  category => category.filters,
);
