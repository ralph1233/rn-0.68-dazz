import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppContext, imageFilters} from './utils/constants';
import {Alert} from 'react-native';
import Camera from './Screens/Camera';
import FilteredPhoto from './Screens/FilteredPhoto';
import RNFS from 'react-native-fs';

const Stack = createNativeStackNavigator();

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      selectedFilter: imageFilters[0],
      ne135: [],
    };
  }

  setSelectedFilter = filter => {
    this.setState({
      selectedFilter: filter,
    });
  };

  takePhoto = async (cameraRef, navigation) => {
    try {
      const {selectedFilter, ne135} = this.state;

      const photo = await cameraRef.current.takePhoto();

      const {path} = photo;

      const base64 = await RNFS.readFile(path, 'base64');

      if (selectedFilter.name === 'NE135WithLayer') {
        if (ne135.length === 0) {
          this.setState({
            ne135: [base64],
          });
          Alert.alert('Error', 'Please take another photo');
          return;
        }
      }

      navigation.navigate('FilteredPhoto', {
        base64:
          selectedFilter.name === 'NE135WithLayer'
            ? [...ne135, base64]
            : base64,
      });

      this.setState({
        ne135: [],
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setSelectedFilter: this.setSelectedFilter,
          takePhoto: this.takePhoto,
        }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="FilteredPhoto" component={FilteredPhoto} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  }
}

export default App;
