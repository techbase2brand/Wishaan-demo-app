// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import React,{useState, useCallback} from 'react';
// import VideoItem from './components/VideoItem';

// const HomeScreen = ({ navigation }) => {
//   const videos = [
//     { id: '1', url: require('./assests/video3.mp4') },
//     { id: '2', url: require('./assests/video4.mp4') },
//     { id: '3', url: require('./assests/video5.mp4') },
//     { id: '4', url: require('./assests/video6.mp4') },

//   ];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const handleChangeIndexValue = ({index}) => {
//     console.log("Index Changed:", index);
//     setCurrentIndex(index);
//   };
//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       const currentIndex = viewableItems[0].index;
//       setCurrentIndex(currentIndex);
//     }
//   }, []);
//   return (
//     <View style={styles.container}>
//       <FlatList
//        pagingEnabled
//         data={videos}
//         renderItem={({ item, index }) => {
//          return( <VideoItem
//             videoUri={item.url}
//             onPress={() => navigation.navigate('ReelScreen')}
//             index={index}
//             currentIndex={currentIndex} 
//             navigation={navigation}
//           />)
//         }}
//         initialNumToRender={4}
//         onViewableItemsChanged={onViewableItemsChanged}
//         keyExtractor={(item) => item.id}
//         style={{ flex: 1 ,width: '100%', backgroundColor:'black'}}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;


import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import RNFetchBlob from 'rn-fetch-blob';
import VideoItem from './components/VideoItem';

const MAX_CACHE_SIZE = 20;

const HomeScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [cachedFiles, setCachedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
console.log("viderssss", videos );
  useEffect(() => {
    fetchInitialVideos();
  }, []);

  const fetchInitialVideos = async () => {
    try {
      const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        console.log("datadatadata",data.length);
        const initialVideos = data.slice(0, 5);
        await cacheVideos(initialVideos);
        setVideos(initialVideos); 
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreVideos = async () => {
    if (fetching) return;
    setFetching(true);
    try {
      const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        const newVideos = data.slice(videos.length, videos.length + 5);
        console.log('New videos to add:', newVideos); // Debug log
        await cacheVideos(newVideos);
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
        console.log('Total videos after update:', [...videos, ...newVideos]);
      }
    } catch (error) {
      console.error('Error fetching more videos:', error);
    } finally {
      setFetching(false);
    }
  }

  const cacheVideos = async (videoList) => {
    const cachedVideos = await Promise.all(
      videoList.map(async (video) => {
        if (!video.video_url) {
          console.error(`Video URL is null or undefined for video ID: ${video.video_id}`);
          return null;
        }

        const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${video.video_id}.mp4`;
        try {
          const exists = await RNFetchBlob.fs.exists(localPath);
          if (!exists) {
            await RNFetchBlob.config({ path: localPath }).fetch('GET', video.video_url);
          }
          return { ...video, url: 'file://' + localPath, lastAccessed: Date.now() };
        } catch (error) {
          console.error('Error caching video:', error);
          return null;
        }
      })
    );
    const validCachedVideos = cachedVideos.filter(Boolean);
    setCachedFiles((prevCachedFiles) => [...prevCachedFiles, ...validCachedVideos]);
    evictOldVideosIfNeeded();
  };
  const evictOldVideosIfNeeded = () => {
    if (cachedFiles.length > MAX_CACHE_SIZE) {
      const sortedCache = [...cachedFiles].sort((a, b) => a.lastAccessed - b.lastAccessed);
      setCachedFiles(sortedCache.slice(0, MAX_CACHE_SIZE));
    }
  };
  const onPageSelected = useCallback((event) => {
    const currentIndex = event.nativeEvent.position;
    setCurrentIndex(currentIndex);
    if (currentIndex >= videos.length - 1) {
      fetchMoreVideos();
    }
  }, [videos, cachedFiles]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={onPageSelected}
          orientation="vertical"
        >
          {videos.map((item, index) => (
            // <View key={index.toString()} style={styles.page}>
              <VideoItem item={item} index={index} currentIndex={currentIndex}  onPress={() => navigation.navigate('ReelScreen')} />
            // </View>
          ))}
        </PagerView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

export default HomeScreen;
