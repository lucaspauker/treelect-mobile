import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Location',
  };
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      addresses: null,
      legislators: null,
      error: null,
    }
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    console.log(this.findLegislators());
    this.state.legislators = this.findLegislators();
  }
  findLegislators = async () => {
    let api_key = '2e1uvo7yeX50ZGHvctPxi8ZWubhggyOydlWvOa5c';
    let url = 'http://q4ktfaysw3.execute-api.us-east-1.amazonaws.com/treehacks/legislators?address=';
    url += '450+Serra+Mall,+Stanford,+CA+94305';
    url += '&level=NATIONAL_LOWER';
    console.log(url)
    return fetch(url, {
      method: 'GET',
      headers: {
        'X-API-Key': api_key,
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.latitude}</Text>
        <Text>{this.state.longitude}</Text>
        <Text>{this.state.addresses}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  mapView: {
    height: 400,
    width: 400,
  },
});
