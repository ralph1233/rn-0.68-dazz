import RNFS from 'react-native-fs';
import {useEffect} from 'react';
import {Alert} from 'react-native';

const Cleanup = () => {
  useEffect(() => {
    (async () => {
      try {
        const files = await RNFS.readDir(RNFS.TemporaryDirectoryPath);
        console.log(files);
        const mediaFileRegex = /\.(jpg|jpeg|mp4|png)$/i;

        const mediaFiles = files.filter(
          file => file.isFile() && mediaFileRegex.test(file.name),
        );

        for (const file of mediaFiles) {
          await RNFS.unlink(file.path);
        }

        Alert.alert('Cleanup complete');
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to cleanup');
      }
    })();
  }, []);

  return null;
};

export default Cleanup;
