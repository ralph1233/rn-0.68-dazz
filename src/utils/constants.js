import {Dimensions} from 'react-native';
import {Arabica} from './filters/Arabica';
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
        element: Arabica,
        icon: require('../assets/images/icons/coffee.png'),
      },
      {
        name: 'Ava',
        element: Ava,
        icon: require('../assets/images/icons/cloudy.png'),
      },
      {
        name: 'Azrael',
        element: Azrael,
        icon: require('../assets/images/icons/moon.png'),
      },
      {
        name: 'Vintage1',
        element: Vintage1,
        icon: require('../assets/images/icons/vintage1.png'),
      },
      {
        name: 'Vintage2',
        element: Vintage2,
        icon: require('../assets/images/icons/vintage2.png'),
      },
      {
        name: 'B&W',
        element: BlackAndWhite,
        icon: require('../assets/images/icons/b&w.png'),
      },
      {
        name: 'ColdShade',
        element: ColdShade,
        icon: require('../assets/images/icons/cold-shade.png'),
      },
      {
        name: 'VintageVibe',
        element: VintageVibe,
        icon: require('../assets/images/icons/cassette.png'),
      },
      {
        name: 'Sunset',
        element: Sunset,
        icon: require('../assets/images/icons/sunset.png'),
      },
      {
        name: 'Grf',
        element: Grf,
        icon: require('../assets/images/icons/grf.png'),
      },
    ],
  },
];

export const imageFilters = imageFiltersWithCategory.flatMap(
  category => category.filters,
);
