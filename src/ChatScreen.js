
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// const ChatScreen = ({ route }) => {
//   const { userName } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const handleSend = () => {
//     if (inputMessage.trim()) {
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { id: Date.now().toString(), text: inputMessage, sender: 'me' }
//       ]);
//       setInputMessage('');
//       setTimeout(() => {
//         setMessages(prevMessages => [
//           ...prevMessages,
//           { id: (Date.now() + 1).toString(), text: `Reply from ${userName}`, sender: userName }
//         ]);
//       }, 1000); 
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={[
//       styles.messageContainer,
//       item.sender === 'me' ? styles.myMessage : styles.userMessage
//     ]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Chat with {userName}</Text>
//       </View>
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.messagesList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={inputMessage}
//           onChangeText={setInputMessage}
//           placeholder="Type a message"
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     padding: 15,
//     backgroundColor: '#007bff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   messagesList: {
//     flexGrow: 1,
//     justifyContent: 'flex-start',
//     padding: 10,
//   },
//   messageContainer: {
//     marginVertical: 5,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   myMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#dcf8c6',
//   },
//   userMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#ececec',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: '#007bff',
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default ChatScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://172.19.64.1:3000/'); 

const ChatScreen = ({ route }) => {
  const { userName } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSocketConnected, setIsSocketConnected] = useState(false);
console.log("socket,,,",socket);
console.log("isSocketConnected,,,",isSocketConnected);

//   useEffect(() => {
//     socket.on('receiveMessage', (message) => {
//         console.log("socket onn >>>>");
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, []);
  useEffect(() => {
    // Event listener for socket connection
    socket.on('connect', () => {
      console.log('Socket connected');
      setIsSocketConnected(true);
    });

    // Event listener for socket disconnection
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsSocketConnected(false);
    });

    // Cleanup function to remove event listeners
    // return () => {
    //   socket.off('connect');
    //   socket.off('disconnect');
    // };
  }, []);

  const handleSend = () => {
    if (inputMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'me'
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit('sendMessage', message);
      setInputMessage('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessage : styles.userMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with {userName}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ececec',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;

