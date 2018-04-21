import React, { Component } from "react";
import { FileSystem } from 'expo';

import {
  Container,  Header,  Title,  Content,  Button,  Icon,  Text,
  Left,  Right,  Body,  List,  ListItem} 
from "native-base";

import styles from "./styles";

const datas = [
  {
    route: "Camerascreen",
    text: "Camera"
  },
  {
    route: "Galleryscreen",
    text: "Gallery"
  },
];

class HomeScreen extends Component {
  state = {
    images: {},
    photos: [],
  };

  constructor(props) {
    super(props);
    
    this.readPhotoDirectory = this.readPhotoDirectory.bind(this);
    this.updatePhotoInfo = this.updatePhotoInfo.bind(this);
  }

  readPhotoDirectory() {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      this.setState(
        {
          photos,
        },
      );
    });
  }

  componentDidMount() { 
    this.readPhotoDirectory();
  }


  updatePhotoInfo(photoID) {
    this.readPhotoDirectory();
  }

  handlePressItem = route => {
    this.props.navigation.navigate(route, 
        { 
          Photos: this.state.photos,
        });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("HomeScreen")
                }
            >
            </Button>
          </Left>
          <Body>
            <Title>Camera App</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.handlePressItem(data.route)
                  }
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
