import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

class App extends PureComponent {
  render() {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
