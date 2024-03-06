import 'react-native-url-polyfill/auto'
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { supabase } from '../../../lib/supbase';
import { useEffect, useState, useRef } from 'react';
import Toast from 'react-native-root-toast'
import Button from '../../../components/ui/Button';
import { User } from '../../../components/User';
import FeatherIcons from '@expo/vector-icons/Feather';

const ChatScreen = () => {
   const [content, setContent] = useState('')
   const [messages, setMessages] = useState('')
   const [newMessage, setNewMessage] = useState('')
   const [user, setUser] = useState('')
   const [rerun, setRerun] = useState('')
   const listRef = useRef(null);

   // Dane usera
   useEffect(() => {
      User().then((data) => setUser(data))
      setRerun(false)
   }, [rerun])

   supabase
   .channel('chat')
   .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
      setNewMessage(payload.new)
   })
   .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, (payload) => {
      setRerun(true)
   })
  .subscribe()

   useEffect(() => {
      async function getData() {
         const { data, error } = await supabase
         .from('messages')
         .select('*, profiles(username)')
         .limit(40)
         
         setMessages(data)
      }

      getData();
   }, [newMessage])

  async function sendMessage() {
      if (content.length > 1) {
         const { error } = await supabase
         .from('messages')
         .insert({ author_id: user.id, content: content })

         this.textInput.clear()

         if (error) {
            Toast.show(error.message, {
               duration: Toast.durations.LONG,
               position: Toast.positions.BOTTOM,
            });
         }
      } else {
         Toast.show('Wiadomość musi mieć conajmniej 2 znaki!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
         });
      }
  }

  const Item = ({content, username, id}) => (
   <View style={styles.item}>
     <Text style={styles.itemTitle}><Text style={user.id === id ? styles.itemCurrentUserTitle : styles.itemUserTitle}>{username}:</Text> {content}</Text>
   </View>
   );

  return (
   <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={0}>

      <View style={styles.widthContainer}>
         <View style={styles.inner}>
            <Text style={styles.headerTitle}>Czat knurownii</Text>
               <FlatList
                  ref={listRef}
                  data={messages}
                  renderItem={({item}) => <Item content={item.content} username={item.profiles.username} id={item.author_id} />}
                  keyExtractor={item => item.id}
                  style={styles.list}
                  onContentSizeChange={() => listRef.current.scrollToEnd() }
                  onLayout={() => listRef.current.scrollToEnd() }
               />
            <View style={styles.inline}>
               <View style={styles.verticallySpaced}>
                  <TextInput
                     style={styles.inputStyle}
                     onChangeText={(text) => setContent(text)}
                     placeholder="Wpisz swoją wiadomość"
                     placeholderTextColor="#fff"
                     autoCapitalize={'none'}
                     ref={input => { this.textInput = input }}
                     editable={user.username ? true : false}
                     selectTextOnFocus={user.username ? true : false}
                  />
               </View>
               <Button onPress={() => sendMessage()} type="icon" text={<FeatherIcons name="arrow-right" size={24} color={'#FFFFFF'} style={styles.iconStyle} />}   disabled={!user.username} />
            </View>
            {!user.username ? 
               <View style={styles.alertContainer}>
                  <Text style={styles.alert}>Aby wysyłać wiadomości na tym elitarnym czacie, ustaw nazwę w ustawieniach!</Text>
               </View>
               : ''}
         </View>
         
      </View>

   </KeyboardAvoidingView>
  );
};

export default ChatScreen;


const styles = StyleSheet.create({
   alert: {
      color: 'white',
      fontFamily: 'DMSans_500Medium',
   },
   alertContainer: {
      position: 'absolute',
      bottom: 140,
      right: 20,
      left: 20,
      borderRadius: 8,
      padding: 14,
      display: 'flex',
      color: 'white',
      backgroundColor: '#431111',
   },
   inline: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: 6,
      alignContent: 'center',
      justifyContent: 'center'
   },
   headerTitle: {
      marginTop: 30,
      color: 'white',
      fontSize: 20,
      fontFamily: 'DMSans_500Medium',
      letterSpacing: -1,
      textAlign: 'center',
      width: '80%',
      display: 'flex',
      alignContent: 'center',
      alignSelf: 'center'
    },
   list: {
      flexGrow: 0,
      display: 'flex',
      color: 'white'
   },
   container: {
      padding: 0,
      alignItems: 'center',
      backgroundColor: '#0D0D0D',
      height: '100%',
      flex: 1
    },
    itemCurrentUserTitle: {
      color: '#00F077'
    },
    itemUserTitle: {
      color: '#5c8dc9'
    },
    itemTitle: {
      color: 'white',
      fontFamily: 'DMSans_500Medium',
      paddingVertical: 2,
      fontSize: 14
   },
   verticallySpaced: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%'
    },
    inputStyle: {
      flex: 1,
      fontFamily: 'DMSans_500Medium',
      padding: 20,
      borderColor: '#2D2D2D',
      borderWidth: 2,
      borderRadius: 8,
      color: 'white',
      backgroundColor: '#0D0D0D',
      fontSize: 16,
      height: '100%'
    },
    inner: {
      display: 'flex',
      alignItems: 'stretch',
      padding: 24,
      flex: 1,
      justifyContent: 'space-around',
      gap: 10
    },
    innerContainer: {
      gap: 20
    },
    header: {
      fontSize: 36,
      marginBottom: 48,
    },
    textInput: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36,
    },
    btnContainer: {
      backgroundColor: 'white',
      marginTop: 12,
    }
 })