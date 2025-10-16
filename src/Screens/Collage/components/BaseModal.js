import React, {PureComponent} from 'react';
import {Modal, SafeAreaView, StyleSheet} from 'react-native';

class BaseModal extends PureComponent {
  render() {
    const {isModalVisible, setIsModalVisible, children} = this.props;

    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </Modal>
    );
  }
}

export default BaseModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
