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
import { Card, Divider } from 'react-native-elements';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      bills: ['Bill one lorem ipsum dolor sit amet askdjlaskjd', 'Bill two', 'Bill three'],
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bills</Text>
        <Card style={styles.card}>
          {this.state.bills.map(bill => (
            <Text style={styles.paragraph} key={bill}>
              {bill}
            </Text>
          ))}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
    textAlign: 'center',
    color: '#ff0000',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
