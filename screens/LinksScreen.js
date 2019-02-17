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
import Progress_Bar from '../components/progressBar.js';
import { Ionicons } from '@expo/vector-icons';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      bills: ['CASES Act', 'Social Media Use in Clearance Investigations Act of 2019', 'To amend title 5, United States Code, to allow whistleblowers to disclose information to certain recipients'],
    }
  }
  render() {
    return (


      <View style={styles.container}>
        <Text style={styles.title}>Bills</Text>

        {this.state.bills.map(bill => (
          <Card style={styles.card}>
            <Text style={styles.paragraph} key={bill}>
              {bill}.
              <Ionicons name="ios-call" size={22}/>

            </Text>
            <Progress_Bar/>
          </Card>
        ))}
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
  text: {
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
      backgroundColor: 'red'
    },
  });
