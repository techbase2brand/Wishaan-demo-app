// import React, {useRef, useState} from 'react';
// import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
// import Video from 'react-native-video';

// const SingleReel = ({item, index, currentIndex}) => {
//   console.log("Ittems", item);
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;

//   const videoRef = useRef(null);

//   const onBuffer = buffer => {
//     console.log('buffring', buffer);
//   };
//   const onError = error => {
//     console.log('error///', error);
//   };

//   const [mute, setMute] = useState(false);

//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={() => setMute(!mute)}
//       style={{
//         width: windowWidth,
//         height: windowHeight,
//       }}>
//       <Video
//         videoRef={videoRef}
//         onBuffer={onBuffer}
//         onError={onError}
//         repeat={true}
//         resizeMode="cover"
//         paused={currentIndex == index ? false : true}
//         source={{uri: item.url}}
//         muted
//         style={{
//           width: windowWidth,
//           height: windowHeight,
//         }}
//       />
//     </TouchableOpacity>
//   );
// };

// export default SingleReel;



// import React, { useRef, useState, useEffect } from 'react';
// import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
// import Video from 'react-native-video';

// const MAX_RETRY_ATTEMPTS = 3; 
// const RETRY_DELAY = 1000; 

// const SingleReel = ({ item, index, currentIndex }) => {
//   console.log("item////",item.video_url);
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const videoRef = useRef(null);
//   const [mute, setMute] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);
//   const [key, setKey] = useState(0); // Key to force component re-render

//   useEffect(() => {
//     if (index === currentIndex && videoRef.current) {
//       videoRef.current.seek(0);
//     }
//   }, [currentIndex]);

//   const onError = (error) => {
//     console.log('Video error:', error);
//     setRetryCount((prevRetryCount) => {
//       if (prevRetryCount < MAX_RETRY_ATTEMPTS) {
//         // Increment retry count and force component re-render
//         setKey((prevKey) => prevKey + 1);
//         return prevRetryCount + 1;
//       } else {
//         return prevRetryCount;
//       }
//     });
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={() => setMute(!mute)}
//       style={{
//         width: windowWidth,
//         height: windowHeight,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//       }}
//     >
//       <Video
//         key={key} // Force re-render when key changes
//         ref={videoRef}
//         onBuffer={() => {}}
//         onError={onError}
//         repeat={true}
//         resizeMode="cover"
//         paused={currentIndex !== index}
//         source={{ uri: item.video_url }}
//         muted={mute}
//         style={{
//           width: windowWidth,
//           height: windowHeight,
//         }}
//       />
//     </TouchableOpacity>
//   );
// };

// export default SingleReel;


import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
const MAX_RETRY_ATTEMPTS = 3; 
const RETRY_DELAY = 1000; 

const SingleReel = ({ item, index, currentIndex, downloadNextVideo }) => {
  // console.log("item////",item);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [key, setKey] = useState(0); // Key to force component re-render

  useEffect(() => {
    if (index === currentIndex && videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (index === currentIndex && downloadNextVideo) {
      downloadNextVideo(item, index);
    }
  }, [currentIndex, downloadNextVideo, item, index]);

  const onError = (error) => {
    console.log('Video error:', error);
    setRetryCount((prevRetryCount) => {
      if (prevRetryCount < MAX_RETRY_ATTEMPTS) {
        // Increment retry count and force component re-render
        setKey((prevKey) => prevKey + 1);
        return prevRetryCount + 1;
      } else {
        return prevRetryCount;
      }
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setMute(!mute)}
      style={{
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Video
        key={key}
        ref={videoRef}
        bufferConfig={{
          minBufferMs: 2000,
          maxBufferMs: 5000,
          bufferForPlaybackMs: 1000,
          bufferForPlaybackAfterRebufferMs: 1500,
        }}
        poster={"https://media.istockphoto.com/id/1447176711/photo/expanding-global-connection-lines-at-night-global-business-financial-network-flight-routes.webp?b=1&s=170667a&w=0&k=20&c=Q55UjO3q3R4Y81eYXgvwURDcaqPUaw6QotA5n34o5Z4="}
          posterResizeMode={"cover"}
        repeat={true}
        resizeMode="cover"
        paused={currentIndex !== index}
        source={{ uri: convertToProxyURL(item.video_url)}}
        muted={mute}
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      />
    </TouchableOpacity>
  );
};

export default SingleReel;



