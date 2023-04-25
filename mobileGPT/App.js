import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { getChatGptResponse } from './chatAPI';

export default function ChatBot() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInput = async () => {
    if (inputText !== '') {
      const chatGptResponse = await getChatGptResponse(inputText);
      setMessages([...messages, { message: inputText, isUser: true }]);
      setMessages([...messages, { message: chatGptResponse, isUser: false }]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.responseContainer,
              { alignSelf: message.isUser ? 'flex-end' : 'flex-start' },
            ]}
          >
            <Text style={styles.responseText}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Type your message here..."
          value={inputText}
          onChangeText={setInputText}
          rightIcon={
            <Button
              title="Send"
              onPress={handleInput}
              buttonStyle={styles.sendButton}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  responseContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    maxWidth: '80%',
  },
  responseText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
