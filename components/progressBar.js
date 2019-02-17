import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class ProgressBar extends Component {
  render() {
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor
    } = this.props;

    const widthVari = 140;

    return(
      <View style={{flex: 1, flexDirection: "row", height}}>
        <View style={{flex: 1, borderColor, borderWidth, borderRadius}}>
          <View
            style={[StyleSheet.absoluteFill, {backgroundColor: fillColor}]}
          />
          <View
            style = {{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: widthVari,
              backgroundColor: barColor
            }}
          />
        </View>
      </View>
    )
  }
}

ProgressBar.defaultProps = {
  height: 20,
  borderColor: '#000',
  borderWidth: 1,
  borderRadius: 2,
  barColor: '#FF0000',
  fillColor: '#0015BC'
}

class Progress_Bar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Text style={{padding: 3}}>Against</Text>
            <ProgressBar/>
          <Text style={{padding: 3}}>For</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  progressContainer: {
    alignItems: "center",
    flexDirection: "row"
  }
});

export default Progress_Bar