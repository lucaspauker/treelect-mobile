import React from 'react';
import { Platform, StyleSheet, View, Text, Image,
        Dimensions, Animated, PanResponder, ActivityIndicator} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
const SCREEN_WIDTH = Dimensions.get('window').width;

class SwipeableCard extends React.Component {
  constructor() {
    super();
    this.panResponder;
    this.state = {
      Xposition: new Animated.Value(0),
      RightText: false,
      LeftText: false,
    };
    this.Card_Opacity = new Animated.Value(1);
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.state.Xposition.setValue(gestureState.dx);
        if (gestureState.dx > SCREEN_WIDTH - 250) {
          this.setState({
            RightText: true,
            LeftText: false,
          });
        } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
          this.setState({
            LeftText: true,
            RightText: false,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (
          gestureState.dx < SCREEN_WIDTH - 150 &&
          gestureState.dx > -SCREEN_WIDTH + 150
        ) {
          this.setState({
            LeftText: false,
            RightText: false,
          });
          Animated.spring(
            this.state.Xposition,
            {
              toValue: 0,
              speed: 5,
              bounciness: 10,
            },
            { useNativeDriver: true }
          ).start();
        } else if (gestureState.dx > SCREEN_WIDTH - 150) {
          Animated.parallel(
            [
              Animated.timing(this.state.Xposition, {
                toValue: SCREEN_WIDTH,
                duration: 200,
              }),
              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
              }),
            ],
            { useNativeDriver: true }
          ).start(() => {
            this.setState({ LeftText: false, RightText: false }, () => {
              this.props.removeCard();
            });
          });
        } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
          Animated.parallel(
            [
              Animated.timing(this.state.Xposition, {
                toValue: -SCREEN_WIDTH,
                duration: 200,
              }),
              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
              }),
            ],
            { useNativeDriver: true }
          ).start(() => {
            this.setState({ LeftText: false, RightText: false }, () => {
              this.props.removeCard();
            });
          });
        }
      },
    });
  }
  render() {
    const rotateCard = this.state.Xposition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-20deg', '0deg', '20deg'],
    });
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.card_Style,
          {
            backgroundColor: this.props.item.backgroundColor,
            opacity: this.Card_Opacity,
            transform: [
              { translateX: this.state.Xposition },
              { rotate: rotateCard },
            ],
          },
        ]}>
        <Text style={styles.Card_Title}> {this.props.item.card_Title} </Text>
        {this.state.LeftText ? (
          <Text style={styles.Left_Text_Style}> Left Swipe </Text>
        ) : null}
        {this.state.RightText ? (
          <Text style={styles.Right_Text_Style}> Right Swipe </Text>
        ) : null}
      </Animated.View>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Sample_Card_Array: [{
          id: '1', card_Title: '', backgroundColor: '#92a8d1',
        },{
          id: '2', card_Title: '', backgroundColor: '#d6cbd3',
        },{
          id: '3', card_Title: '', backgroundColor: '#f7cac9',
        },{
          id: '4', card_Title: '', backgroundColor: '#eca1a6',
        },{
          id: '5', card_Title: '', backgroundColor: '#ada397',
        }],
      No_More_Card: false,
      bills: null,
      isLoading: true,
    };
    fetch('http://c1b2db33.ngrok.io')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          bills: responseJson,
        }, function(){
          {for (var i=0; i < this.state.Sample_Card_Array.length; i++) {
            card = this.state.Sample_Card_Array[i];
            card.card_Title = this.state.bills[i];
          }};
          console.log("Successfully loaded bills!");
          this.setState({
            isLoading: false,
          })
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  componentDidMount() {
    this.setState({
      Sample_Card_Array: this.state.Sample_Card_Array.reverse(),
    });
    if (this.state.Sample_Card_Array.length == 0) {
      this.setState({ No_More_Card: true });
    }
  }
  removeCard = id => {
    this.state.Sample_Card_Array.splice(
      this.state.Sample_Card_Array.findIndex(x => x.id == id),
      1
    );
    this.setState({ Sample_Card_Array: this.state.Sample_Card_Array }, () => {
      if (this.state.Sample_Card_Array.length == 0) {
        this.setState({ No_More_Card: true });
      }
    });
  };
  render() {
    if (this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.MainContainer}>
        <Image
          source={
              require('../assets/images/treelection_logo.png')
            }
          style={styles.welcomeImage}
        />
        {this.state.Sample_Card_Array.map((item, key) => (
          <SwipeableCard
            style={styles.swipe}
            key={key}
            item={item}
            removeCard={this.removeCard.bind(this, item.id)}
          />
        ))}
        {this.state.No_More_Card ? (
          <Text style={{ fontSize: 22, color: '#000' }}>Treelect</Text>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  card_Style: {
    width: '85%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
  Card_Title: {
    color: '#000',
    fontSize: 30,
    margin: 40,
    textAlign: 'center',
  },
  Left_Text_Style: {
    top: 22,
    right: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  Right_Text_Style: {
    top: 22,
    left: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});

