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
import firebase, {auth, googleProvider, facebookProvider, twitterProvider} from '../components/fire';

export default class SettingsScreen extends React.Component {
    constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      email: '',
      password: '',
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    //auth.signInWithCredential(googleProvider)
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        {this.state.user ?
          <View style={styles.container}>
            <Button
              onPress={this.login}
              title="Logout"
            />
            <View style={styles.container}>
              <Text>{this.state.user.displayName}</Text>
            </View>
          </View>
          :
          <Button
            onPress={this.login}
            title="Login"
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})
