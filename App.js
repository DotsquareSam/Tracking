import React, { Component } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import DeviceInfo from 'react-native-device-info';

class AppStateExample extends Component {
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    DeviceInfo.getDisplay().then((display) => {
      // "OPM2.171026.006.G1"
      console.log(display)
    });
    this.appStateSubscription = AppState.addEventListener(
      "change",
      nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
        }
        this.setState({ appState: nextAppState });
      }
    );
  }

  componentWillUnmount() {
    this.appStateSubscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Current state is: {this.state.appState}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AppStateExample;