// // components/VideoItem.js
// import React from 'react';
// import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
// import Video from 'react-native-video';

// const VideoItem = ({videoUri, onPress, index, currentIndex}) => {
//   return (
//     <View style={{ flex:1,  width:"100%", height:"100%"}}>
//       <Text style={{marginLeft: 20, fontSize: 25, color: '#fff', marginTop:20}}>
//         John Doe
//       </Text>
//       <Text style={{marginLeft: 20, fontSize: 20, color: '#fff'}}>
//         march, 20
//       </Text>
//       <TouchableOpacity onPress={onPress} style={styles.container}>
//         <Video
//           source={videoUri}
//           style={styles.video}
//           resizeMode="cover"
//           repeat={true}
//           paused={currentIndex == index ? false : true}
//           muted
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     // height:'100%',
//     marginBottom: 60,
//     marginTop: 80,
//   },
//   video: {
//     width: '100%',
//     height: 400,
//   },
// });

// export default VideoItem;

import React,{useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height} = Dimensions.get('window');

const VideoItem = ({
  videoUri,
  item,
  onPress,
  index,
  currentIndex,
  navigation,
}) => {
  const [cachedUri, setCachedUri] = useState(null);

  useEffect(() => {
    // Preload video when component mounts or when item.video_url changes
    const preloadVideo = async () => {
      const proxyUrl = convertToProxyURL(item.video_url);
      setCachedUri(proxyUrl);
    };

    preloadVideo();
  }, [item.video_url]);
  // console.log("cachedUri", cachedUri);
  // console.log("convertToProxyURL(item.video_url)", convertToProxyURL(item.video_url));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>John Doe</Text>
      <Text style={styles.date}>March, 20</Text>
      <TouchableOpacity onPress={onPress} style={styles.videoContainer}>
        <Video
         bufferConfig={{
          minBufferMs: 2000,
          maxBufferMs: 5000,
          bufferForPlaybackMs: 1000,
          bufferForPlaybackAfterRebufferMs: 1500,
        }}
          source={{uri: convertToProxyURL(item.video_url)}}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
          paused={currentIndex === index ? false : true}
          muted
        />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('UserListScreen')}>
        <Text style={{color:"red"}}>ChatScreen</Text>
      </TouchableOpacity> */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.iconContainer}>
          <AntDesign
            name="hearto"
            size={25}
            color="white"
            style={styles.icon}
          />
          <Icon name="comment-o" size={25} color="white" style={styles.icon} />
          <Icon name="share" size={25} color="white" style={styles.icon} />
        </View>
        <View style={styles.iconContainer}>
          <Icon name="save" size={25} color="white" style={styles.icon} />
        </View>
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={{color: 'white'}}>20 Likes</Text>
      </View>
      <View style={{marginVertical: 20, marginHorizontal: 10}}>
        <Text style={{color: 'white', fontSize:16, fontWeight: '800'}}>
          John Doe{' '}
          <Text style={{color: 'white',fontSize:14,fontWeight: '400'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: height,
  },
  title: {
    marginLeft: 20,
    fontSize: 25,
    color: '#fff',
    marginTop: 20,
  },
  date: {
    marginLeft: 20,
    fontSize: 20,
    color: '#fff',
  },
  videoContainer: {
    // flex: 1,
    width: '100%',
    marginTop: 40,
  },
  video: {
    width: '100%',
    height: 400,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
    // justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  icon: {
    marginVertical: 20,
  },
});

export default VideoItem;
