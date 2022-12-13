import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from 'react-native';
import {
  ActivityIndicator,
  Title,
  Modal,
  Portal,
  Button,
  Provider,
  Card,
  Avatar,
  IconButton,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, showImagePicker} from 'react-native-image-picker';

export default function App({navigation, route}) {
  const [imageSource, setImageSource] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 10, margin: 10};

  const selectCameraImage = () => {
    launchCamera({}, response => {
      console.log({response});

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.uri);
        let source = {uri: response.uri};
        console.log({source});
      }
    });
  };

  const selectGalleryImage = () => {
    showImagePicker(
      {
        maxWidth: 256,
        maxHeight: 256,
      },
      response => {
        console.log({response});

        if (response.didCancel) {
          console.log('User cancelled photo picker');
          Alert.alert('You did not select any image');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = {uri: response.assets[0].uri};
          console.log(response.assets[0].uri);
        }
      },
    );
  };

  return (
      <Provider>
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={showModal}
          style={styles.selectButtonContainer}>
          <Text style={styles.selectButtonTitle}>Product image</Text>
        </TouchableOpacity>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <Title>Pick Product Image</Title>
            <TouchableOpacity onPress={selectCameraImage}>
              <Card.Title
                style={{
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#f6f6f6',
                  paddingHorizontal: 10,
                  marginTop: 15,
                }}
                subtitle="Take Photo"
                subtitleStyle={{
                  fontSize: 18,
                  marginLeft: 40,
                  textTransform: 'capitalize',
                }}
                left={props => (
                  <Image
                    source={
                      'https://www.yorkartgallery.org.uk/wp-content/uploads/sites/5/2019/06/CAG_New_Art_Installs_York_Museums-0029-scaled.jpg'
                    }
                    style={{
                      width: 80,
                      height: 40,
                    }}
                    resizeMode="center"
                  />
                )}
                leftStyle={{marginLeft: -20}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={selectGalleryImage}>
              <Card.Title
                style={{
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderColor: 'f7f7f7',
                  paddingHorizontal: 10,
                }}
                subtitle="Pick from Gallery"
                subtitleStyle={{
                  fontSize: 18,
                  marginLeft: 40,
                }}
                left={props => (
                  <Image
                    source={
                      'https://www.yorkartgallery.org.uk/wp-content/uploads/sites/5/2019/06/CAG_New_Art_Installs_York_Museums-0029-scaled.jpg'
                    }
                    style={{
                      width: 80,
                      height: 40,
                    }}
                    resizeMode="center"
                  />
                )}
                leftStyle={{marginLeft: -20}}
              />
            </TouchableOpacity>
          </Modal>
        </Portal>
    </SafeAreaView>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectButtonTitle: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    fontSize: 16,
    width: '40%',
    borderColor: 'f7f7f7',
    borderStyle: 'dashed',
    borderRadius: 5,
    borderWidth: 2,
    textAlign: 'center',
  },
  selectButtonContainer: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'f7f7f7',
    flexShrink: 1,
  },
  containerStyle: {backgroundColor: 'white', padding: 20, margin: 20},
  optionStyles: {
    backgroundColor: 'f7f7f7',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  titleStyle: {
    textAlign: 'center',
  },
});
