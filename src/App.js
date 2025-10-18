import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppContext, imageFilters} from './utils/constants';
import {Alert} from 'react-native';
import Camera from './Screens/Camera';
import FilteredPhoto from './Screens/FilteredPhoto';
// import Collage from './Screens/Collage';
import memoizeOne from 'memoize-one';

const Stack = createNativeStackNavigator();

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      selectedFilter: imageFilters[0],
      multiplePhotos: [],
    };
  }

  setSelectedFilter = filter => {
    this.setState({
      selectedFilter: filter,
    });
  };

  takePhoto = async (cameraRef, navigation) => {
    try {
      const {selectedFilter, multiplePhotos} = this.state;

      const photo = await cameraRef.current.takePhoto();

      const {path} = photo;

      if (selectedFilter.requiredPhotoCount > 1) {
        if (multiplePhotos.length < selectedFilter.requiredPhotoCount - 1) {
          this.setState({
            multiplePhotos: [...multiplePhotos, path],
          });
          Alert.alert('Error', 'Please take another photo');
          return;
        }
      }

      navigation.navigate('FilteredPhoto', {
        path:
          selectedFilter.requiredPhotoCount > 1
            ? [...multiplePhotos, path]
            : path,
      });

      this.setState({
        multiplePhotos: [],
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  // 👇 memoized context value
  getContextValue = memoizeOne((selectedFilter, multiplePhotos) => ({
    selectedFilter,
    multiplePhotos,
    setSelectedFilter: this.setSelectedFilter,
    takePhoto: this.takePhoto,
  }));

  render() {
    const {selectedFilter, multiplePhotos} = this.state;

    return (
      <AppContext.Provider
        value={this.getContextValue(selectedFilter, multiplePhotos)}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="FilteredPhoto" component={FilteredPhoto} />
            {/* <Stack.Screen
              name="Collage"
              component={Collage}
              options={{
                headerShown: true,
              }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  }
}

export default App;
