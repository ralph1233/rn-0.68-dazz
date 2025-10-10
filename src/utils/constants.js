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
import GRF from './omarfiltersv3/GRF';
import DQS from './omarfiltersv3/DQS';
import CPM from './omarfiltersv3/CPM';
import DFUN from './omarfiltersv4/DFUN';

export const {width, height} = Dimensions.get('window');

export const AppContext = createContext();

export const imageFiltersWithCategory = [
  {
    category: 'Digital',
    filters: [
      {
        name: 'Testing',
        Element: Testing,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/vintage1.png'),
      },
      {
        name: 'IR',
        Element: IR,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/b&w.png'),
      },

      {
        name: 'OFMR',
        Element: OFMR,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/cassette.png'),
      },

      {
        name: 'Hoga',
        Element: Hoga,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/sunset.png'),
      },

      {
        name: 'NE135WithLayer',
        Element: NE135WithLayer,
        requiredPhotoCount: 2,
        // icon: require('../assets/images/icons/vintage2.png'),
      },
      {
        name: 'NE135',
        Element: NE135,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/moon.png'),
      },
      {
        name: 'FQS',
        Element: FQS,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/coffee.png'),
      },
      {
        name: 'KIV88',
        Element: KIV88,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/cloudy.png'),
      },
      {
        name: 'GRF',
        Element: GRF,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/tint.png'),
      },
      {
        name: 'DQS',
        Element: DQS,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/dqs.png'),
      },
      {
        name: 'CPM',
        Element: CPM,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/cpm.png'),
      },
      {
        name: 'DFUN',
        Element: DFUN,
        requiredPhotoCount: 1,
        // icon: require('../assets/images/icons/dfun.png'),
      },
    ],
  },
];

export const imageFilters = imageFiltersWithCategory.flatMap(
  category => category.filters,
);
