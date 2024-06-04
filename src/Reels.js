// import React, {useState, useRef, useCallback, useEffect} from 'react';
// import {View, Button,ActivityIndicator, Dimensions, StyleSheet, Text,FlatList} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// import SingleReel from './components/SingleReel';

// const {height} = Dimensions.get('window');

// const remoteVideos = [
//   {
//     id: '1',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo3.mp4?alt=media&token=fcf9755a-40c8-4945-b64c-c5a0199f6bfb',
//   },
//   {
//     id: '2',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo4.mp4?alt=media&token=a67f971e-343e-413b-a101-9f80818996ef',
//   },
//   {
//     id: '3',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo5.mp4?alt=media&token=e4f9f467-73ab-4cfd-a23c-f3ca77d9ff7f',
//   },
//   {
//     id: '4',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo6.mp4?alt=media&token=4431f24c-b4da-4923-8004-71d46a3dc35f',
//   },
//   {
//     id: '5',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo3.mp4?alt=media&token=fcf9755a-40c8-4945-b64c-c5a0199f6bfb',
//   },
//   {
//     id: '6',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo4.mp4?alt=media&token=a67f971e-343e-413b-a101-9f80818996ef',
//   },
//   {
//     id: '7',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo5.mp4?alt=media&token=e4f9f467-73ab-4cfd-a23c-f3ca77d9ff7f',
//   },
//   {
//     id: '8',
//     url: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/reels%2Fvideo6.mp4?alt=media&token=4431f24c-b4da-4923-8004-71d46a3dc35f',
//   },
// ];

// const Reels = () => {
//   const videoRefs = useRef([]);
//   const [videos, setVideos] = useState([]);

//   const [cachedFiles, setCachedFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   // console.log("currentIndex>>>", currentIndex);
//   // console.log("loading>>>", videos);
//   // console.log("data>>>", data);


 
//   useEffect(() => {
//     cacheVideos();
//   }, []);
// console.log("videosssss",videos);
//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     console.log("viewableItems>>>>>", viewableItems);
//     if (viewableItems.length > 0) {
//       const currentIndex = viewableItems[0].index;
//       setCurrentIndex(currentIndex);
//     }
//   }, []);
//   const cacheVideos = async () => {
//     const cachedVideos = await Promise.all(
//       remoteVideos.map(async video => {
//         const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${video.id}.mp4`;
//         const exists = await RNFetchBlob.fs.exists(localPath);

//         if (!exists) {
//           await RNFetchBlob.config({path: localPath}).fetch('GET', video.url);
//         }
//         return {...video, url: 'file://' + localPath};
//       }),
//     );

//     setVideos(cachedVideos);
//   };

  
//   const listCachedFiles = async () => {
//     const files = await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DocumentDir);
//     setCachedFiles(files);
//   };
 
//   return (
//     <View style={styles.container}>
//       <FlatList
//         pagingEnabled
//         data={videos}
//         renderItem={({item, index}) => (
//           <SingleReel item={item} index={index} currentIndex={currentIndex} />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={{itemVisiblePercentThreshold: 50}}
//       />
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:"black"
//   },
//   videoContainer: {
//     height: height,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   video: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });

// export default Reels;



// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import {
//   View,
//   ActivityIndicator,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// import SingleReel from './components/SingleReel';
// const Reels = () => {
//   const videoRefs = useRef([]);
//   const [videos, setVideos] = useState([]);
//   const [cachedFiles, setCachedFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [fetching, setFetching] = useState(false); // New state for tracking fetch operation

//   useEffect(() => {
//     fetchInitialVideos();
//   }, []);
//   console.log("videos::::::::", videos);
//   // useEffect(() => {
//     console.log("CACHEDFILES::::::::", cachedFiles);
//   // }, [cachedFiles]);
//   const fetchInitialVideos = async () => {
//     try {
//       const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         const initialVideos = data?.slice(0, 5); // Fetch initial 5 videos
//         console.log("data::::::::", initialVideos);
//         await cacheVideos(initialVideos);
//         setVideos(initialVideos);
//       } else {
//         throw new Error('Unexpected data format');
//       }
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMoreVideos = async () => {
//     if (fetching) return; // Prevent multiple fetches
//     setFetching(true); // Set fetching state to true

//     try {
//       const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         const newVideos = data.slice(videos.length, videos.length + 5); // Fetch next set of 5 videos
//         await cacheVideos(newVideos);
//         setVideos((prevVideos) => [...prevVideos, ...newVideos]);
//       } else {
//         throw new Error('Unexpected data format');
//       }
//     } catch (error) {
//       console.error('Error fetching more videos:', error);
//     } finally {
//       setFetching(false); // Reset fetching state
//     }
//   };


// const cacheVideos = async (videoList) => {
//   const cachedVideos = await Promise.all(
//     videoList.map(async (video) => {
//       if (!video.video_url) {
//         console.error(`Video URL is null or undefined for video ID: ${video.video_id}`);
//         return null;
//       }

//       const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${video.video_id}.mp4`;
//       console.log("localPath", localPath); 

//       try {
//         const exists = await RNFetchBlob.fs.exists(localPath);

//         if (!exists) {
//           await RNFetchBlob.config({ path: localPath }).fetch('GET', video.video_url);
//         }
//         return { ...video, url: 'file://' + localPath };
//       } catch (error) {
//         console.error('Error caching video:', error);
//         return null; 
//       }
//     })
//   );
//   const validCachedVideos = cachedVideos.filter(Boolean);
//   console.log("validCachedVideos", validCachedVideos);
//   setCachedFiles((prevCachedFiles) => [...prevCachedFiles, ...validCachedVideos]);
// };

  
//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       const currentIndex = viewableItems[0].index;
//       setCurrentIndex(currentIndex);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#fff" />
//         </View>
//       ) : (
//         <FlatList
//           pagingEnabled
//           data={cachedFiles}
//           renderItem={({ item, index }) => {
//             console.log("itemitemitem",item);
//             return(
//             <SingleReel item={item} index={index} currentIndex={currentIndex} />
//           )}}
//           keyExtractor={(item, index) => index.toString()}
//           onViewableItemsChanged={onViewableItemsChanged}
//           viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
//           initialNumToRender={2}
//           maxToRenderPerBatch={2}
//           windowSize={5}
//           onEndReached={fetchMoreVideos}
//           onEndReachedThreshold={0.5}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Reels;

// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import {
//   View,
//   ActivityIndicator,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// import SingleReel from './components/SingleReel';

// const MAX_CACHE_SIZE = 20;

// const Reels = () => {
//   const videoRefs = useRef([]);
//   const [videos, setVideos] = useState([]);
//   const [cachedFiles, setCachedFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [fetching, setFetching] = useState(false);
// console.log("VIDEOS>>>>>:::", videos );
//   useEffect(() => {
//     fetchInitialVideos();
//   }, []);

//   const fetchInitialVideos = async () => {
//     try {
//       const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         const initialVideos = data.slice(0, 5);
//         await cacheVideos(initialVideos);
//         setVideos(initialVideos);
//       } else {
//         throw new Error('Unexpected data format');
//       }
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMoreVideos = async () => {
//     if (fetching) return;
//     setFetching(true);
//     try {
//       const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         const newVideos = data.slice(videos.length, videos.length + 5);
//         await cacheVideos(newVideos);
//         setVideos((prevVideos) => [...prevVideos, ...newVideos]);
//       } else {
//         throw new Error('Unexpected data format');
//       }
//     } catch (error) {
//       console.error('Error fetching more videos:', error);
//     } finally {
//       setFetching(false);
//     }
//   };

//   const cacheVideos = async (videoList) => {
//     const cachedVideos = await Promise.all(
//       videoList.map(async (video) => {
//         if (!video.video_url) {
//           console.error(`Video URL is null or undefined for video ID: ${video.video_id}`);
//           return null;
//         }

//         const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${video.video_id}.mp4`;
//         try {
//           const exists = await RNFetchBlob.fs.exists(localPath);
//           if (!exists) {
//             await RNFetchBlob.config({ path: localPath }).fetch('GET', video.video_url);
//           }
//           return { ...video, url: 'file://' + localPath, lastAccessed: Date.now() };
//         } catch (error) {
//           console.error('Error caching video:', error);
//           return null;
//         }
//       })
//     );
//     const validCachedVideos = cachedVideos.filter(Boolean);
//     setCachedFiles((prevCachedFiles) => [...prevCachedFiles, ...validCachedVideos]);

//     // Check if cache size exceeds the limit and evict least recently used videos if necessary
//     evictOldVideosIfNeeded();
//   };

//   const evictOldVideosIfNeeded = () => {
//     if (cachedFiles.length > MAX_CACHE_SIZE) {
//       const sortedCache = [...cachedFiles].sort((a, b) => a.lastAccessed - b.lastAccessed);
//       setCachedFiles(sortedCache.slice(0, MAX_CACHE_SIZE));
//     }
//   };

//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       const currentIndex = viewableItems[0].index;
//       setCurrentIndex(currentIndex);
//       updateLastAccessedTime(viewableItems[0].item);
//     }
//   }, [cachedFiles]);

//   const updateLastAccessedTime = (video) => {
//     const updatedCachedFiles = cachedFiles.map((item) =>
//       item === video ? { ...item, lastAccessed: Date.now() } : item
//     );
//     setCachedFiles(updatedCachedFiles);
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#fff" />
//         </View>
//       ) : (
//         <FlatList
//           pagingEnabled
//           data={cachedFiles}
//           renderItem={({ item, index }) => (
//             <SingleReel item={item} index={index} currentIndex={currentIndex} />
//           )}
//           keyExtractor={(item, index) => index.toString()}
//           onViewableItemsChanged={onViewableItemsChanged}
//           viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
//           initialNumToRender={2}
//           maxToRenderPerBatch={2}
//           windowSize={5}
//           onEndReached={fetchMoreVideos}
//           onEndReachedThreshold={0.5}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import RNFetchBlob from 'rn-fetch-blob';
import SingleReel from './components/SingleReel';

const MAX_CACHE_SIZE = 20;

const Reels = () => {
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [cachedFiles, setCachedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchInitialVideos();
  }, []);
console.log("videos", videos);
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

  // const fetchMoreVideos = async () => {
  //   if (fetching) return;
  //   setFetching(true);
  //   try {
  //     const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
  //     const data = await response.json();
  //     if (Array.isArray(data)) {
  //       // await cacheVideos(data.slice(videos.length, videos.length + 5));
  //       setVideos((prevVideos) => [...prevVideos, ...data.slice(prevVideos.length, prevVideos.length + 5)]);
  //     } else {
  //       throw new Error('Unexpected data format');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching more videos:', error);
  //   } finally {
  //     setFetching(false);
  //   }
  // }

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
  
  // const fetchMoreVideos = async () => {
  //   if (fetching) return;
  //   setFetching(true);
  //   try {
  //     const response = await fetch('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
  //     const data = await response.json();
  //     if (Array.isArray(data)) {
  //       const newVideos = data.slice(videos.length, videos.length + 5);
  //       // await cacheVideos(newVideos);
  //       setVideos((prevVideos) => [...prevVideos, ...newVideos]);
  //     } else {
  //       throw new Error('Unexpected data format');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching more videos:', error);
  //   } finally {
  //     setFetching(false);
  //   }
  // };

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
    updateLastAccessedTime(cachedFiles[currentIndex]);

    // Trigger fetching more videos when reaching near the end of the list
    if (currentIndex >= videos.length - 1) {
      fetchMoreVideos();
    }
  }, [videos, cachedFiles]);

  const updateLastAccessedTime = (video) => {
    const updatedCachedFiles = cachedFiles.map((item) =>
      item === video ? { ...item, lastAccessed: Date.now() } : item
    );
    setCachedFiles(updatedCachedFiles);
  };

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
          scrollEnabled
          orientation="vertical"
        >
          {videos?.map((item, index) => (
              <SingleReel item={item} index={index} currentIndex={currentIndex} />
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

export default Reels;





