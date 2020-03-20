import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Audio } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";

const PlayScreen = ({ navigation }) => {
  //   console.log("rendering");
  // const [soundObject, setSoundObject] = useState();
  const [soundObject, setSoundObject] = useState(new Audio.Sound());

  const [state, setState] = useState({
    isLoaded: false,
    isPlaying: false,
    positionMillis: 0
  });

  // console.log(`status:${state.isPlaying}  ${state.isLoaded}`);
  const _onPlaybackStatusUpdate = playbackStatus => {
    // console.log("status updated");
    setState({
      isPlaying: playbackStatus.isPlaying,
      isLoaded: playbackStatus.isLoaded,
      positionMillis: playbackStatus.positionMillis
    });
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });

      const trackURI = navigation.getParam("trackURI");
      await soundObject.loadAsync({ uri: trackURI });
      soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    };
    asyncFunc();
    return () => {
      setSoundObject(null);
      soundObject.stopAsync();
      soundObject.setOnPlaybackStatusUpdate(null);
      soundObject.unloadAsync();
    };
  }, []);

  const playPause = () => {
    if (!state.isPlaying) {
      setState({ ...state, isPlaying: true });
      soundObject.playAsync();
    } else {
      setState({ ...state, isPlaying: false });
      soundObject.pauseAsync();
    }
  };

  const backward = async mills => {
    const currentPosition = state.positionMillis;
    soundObject.setPositionAsync(currentPosition - 6000);
  };

  const forward = mills => {
    const currentPosition = state.positionMillis;
    soundObject.setPositionAsync(currentPosition + 6000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.playPause}>
        <TouchableOpacity
          style={{ height: 30, alignSelf: "flex-end" }}
          onPress={async () => {
            await soundObject.setPositionAsync(0);
          }}
        >
          <View>
            <Text>beggining</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 20, alignSelf: "flex-end" }}
          onPress={async () => {
            const soundStatus = await soundObject.getStatusAsync();
            const duration = soundStatus.durationMillis;
            console.log(duration);
            const middle = Math.floor(duration / 2);
            await soundObject.setPositionAsync(middle);
            const soundStatus2 = await soundObject.getStatusAsync();
            // console.log(soundStatus2);
            const currentPosition = soundStatus2.positionMillis;
            console.log(currentPosition);
          }}
        >
          <View>
            <Text>middle</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.coveringTouchableOpacity}
          onPress={playPause}
        >
          {state.isPlaying ? (
            <Icon
              type="MaterialCommunityIcons"
              name="pause"
              style={{ fontSize: 200 }}
            />
          ) : (
            <Icon
              type="MaterialCommunityIcons"
              name="play-circle-outline"
              style={{ fontSize: 200, opacity: state.isLoaded ? 1 : 0.1 }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.seeker}>
        <View style={styles.backward}>
          <TouchableOpacity
            style={styles.coveringTouchableOpacity}
            onPress={backward}
          >
            <Icon
              type="MaterialCommunityIcons"
              name="step-backward"
              style={{ fontSize: 100 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.forward}>
          <TouchableOpacity
            style={styles.coveringTouchableOpacity}
            onPress={forward}
          >
            <Icon
              type="MaterialCommunityIcons"
              name="step-forward"
              style={{ fontSize: 100 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch"
    // borderColor: "red",
    // borderWidth: 5
  },
  coveringTouchableOpacity: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    height: "100%"
  },
  playPause: {
    // height: 400,
    flex: 3
    // borderColor: "blue",
    // borderWidth: 5
  },
  seeker: {
    flexDirection: "row",
    flex: 1
    // borderColor: "green",
    // borderWidth: 5
  },
  backward: {
    flex: 0.5
    // borderColor: "pink",
    // borderWidth: 5
  },
  forward: {
    flex: 0.5
    // borderColor: "purple",
    // borderWidth: 5
  }
});

export default PlayScreen;
