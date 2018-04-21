import { Platform } from 'react-native';

export default {
    container: {
      backgroundColor: "#FFF",
      ...Platform.select({
        android: {
          marginTop: 24
        }
      })  
    },
    cameraContainer: {
      flex: 1,
      backgroundColor: '#000',
    },
    text: {
      alignSelf: "center",
      marginBottom: 7
    },
    mb: {
      marginBottom: 15
    },
    flipButton: {
      flex: 0.3,
      height: 40,
      marginHorizontal: 2,
      marginBottom: 10,
      marginTop: 20,
      borderRadius: 8,
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flipText: {
      color: 'white',
      fontSize: 15,
    },
    picButton: {
      backgroundColor: 'darkseagreen',
    },  
  };
  