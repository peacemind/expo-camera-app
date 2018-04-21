import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { FileSystem } from 'expo';

import { Icon, Button } from 'native-base';

const pictureSize = 150;

class GalleryScreen extends React.Component {
  state = {
    images: {},
    photos: [],
  };

  constructor(props) {
    super(props);

    this.showAlertDialog = this.showAlertDialog.bind(this);
    this.dialogCancel = this.dialogCancel.bind(this);
    this.dialogOK = this.dialogOK.bind(this);
    this.renderGallery = this.renderGallery.bind(this);
  }

  dialogCancel = () => {
    console.log('Cancel Button Pressed');
  }

  dialogOK = (photoUri) => {
    console.log('OK ButtonPressed = ', photoUri);
    console.log('OK ButtonPressed = ', `${FileSystem.documentDirectory}photos/${photoUri}`);
    Expo.FileSystem.deleteAsync(`${FileSystem.documentDirectory}photos/${photoUri}`);

    //Expo.FileSystem.deleteAsync(key);
    console.log("Update Gallery");
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      console.log("Delete read Phtot Dir = ", photos);
      console.log(" photo length = ", photos.length);  
      this.setState(
        {
          photos,
        },
      );
    });
  }

  showAlertDialog(message,key) {
    message2 = message + "  " + key;

    Alert.alert( 
      //This is Alert Dialog Title
      'Image Gallery',
      //This is Alert Dialog Message
      //'Confirmation the Action',
      message2,
      [
        // First Text Button in Alert Dialog.
        //{text: 'Ask me later', onPress: () => console.log('Ask me later Button Clicked')},
 
        // Second Cancel Button in Alert Dialog.
        //{text: 'Cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
        {text: 'Cancel', onPress: () => this.dialogCancel(), style: 'cancel'},
 
        // Third OK Button in Alert Dialog
        {text: 'OK', onPress: () => this.dialogOK(key)},
      ]

    )
  }

  componentDidMount() {
    console.log("Gallery Screen Mount")
    console.log("FileSystem doc =",FileSystem.documentDirectory + 'photos' )
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      console.log("photos = ", photos);
      this.setState(
        {
          photos,
        },
        //this.detectFaces
      );
    });
  }

  getImageDimensions = ({ width, height }) => {
    if (width > height) {
      const scaledHeight = pictureSize * height / width;
      return {
        width: pictureSize,
        height: scaledHeight,

        scaleX: pictureSize / width,
        scaleY: scaledHeight / height,

        offsetX: 0,
        offsetY: (pictureSize - scaledHeight) / 2,
      };
    } else {
      const scaledWidth = pictureSize * width / height;
      return {
        width: scaledWidth,
        height: pictureSize,

        scaleX: scaledWidth / width,
        scaleY: pictureSize / height,

        offsetX: (pictureSize - scaledWidth) / 2,
        offsetY: 0,
      };
    }
  };
  
  renderGallery() {
    return (
      <View style={styles.pictures}>
        {this.state.photos.map(photoUri => (
          <View style={styles.pictureWrapper} key={photoUri}>
            <Image
              key={photoUri}
              style={styles.picture}
              source={{
                uri: `${FileSystem.documentDirectory}photos/${photoUri}`,
              }}
            />              
            <Button danger transparent 
              style={{ marginBottom: 20, marginLeft: 10 }}
              onPress = {() => this.showAlertDialog("Delete Image File", photoUri)}
            >
              <Icon active name="trash" />
            </Button>
          </View>
        ))}
    </View>
  )
}

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} 
            onPress={() => this.props.navigation.goBack()}> 
          <Text>Back</Text>
        </TouchableOpacity>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          {this.renderGallery()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    margin: 5,
  },
  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: 'indianred',
  },
});

export default GalleryScreen;
