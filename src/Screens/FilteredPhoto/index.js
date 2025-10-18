import React, {memo, useContext, useMemo, useCallback} from 'react';
import {AppContext, imageFilters} from '../../utils/constants';
import {SafeAreaView, StyleSheet, Button, View, Alert} from 'react-native';
import {useCanvasRef} from '@shopify/react-native-skia';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

const FilteredPhoto = ({navigation, route}) => {
  const ref = useCanvasRef();
  const {path} = route.params;
  const {selectedFilter} = useContext(AppContext);

  const {Element} = useMemo(
    () =>
      imageFilters.find(
        imageFilter => imageFilter.name === selectedFilter.name,
      ),
    [selectedFilter?.name],
  );

  const saveImage = useCallback(async () => {
    try {
      const image = ref.current?.makeImageSnapshot();

      if (!image) {
        Alert.alert('Error');
        return;
      }

      const filteredImageBase64 = image.encodeToBase64();
      const tmpFile = `file://${RNFS.TemporaryDirectoryPath}${Date.now}.png`;

      await RNFS.writeFile(tmpFile, filteredImageBase64, 'base64');
      await CameraRoll.save(tmpFile, {
        type: 'photo',
        album: 'DazzClone',
      });
      // !! Note: Dazz Cam saves pictures in the FileSystem and gallery, and retrieves them from the FileSystem (for now, I'm deleting them since I don't need them)
      await RNFS.unlink(tmpFile);
      if (Array.isArray(path)) {
        await RNFS.unlink(path[0]);
        await RNFS.unlink(path[1]);
      } else if (typeof path === 'string') {
        await RNFS.unlink(path);
      }

      Alert.alert('Success');
    } catch (error) {
      console.log(error);
      Alert.alert('Error Saving image');
    }
  }, [ref, path]);

  return (
    <SafeAreaView style={styles.container}>
      <Element path={path} canvasRef={ref} />
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <View style={styles.saveButton}>
          <Button title="Save" onPress={saveImage} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(FilteredPhoto);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    marginLeft: 10,
  },
});
