import 'react-native-url-polyfill/auto'
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Modal, SafeAreaView, ScrollView } from 'react-native';
import { supabase } from '../../../lib/supbase';
import { useEffect, useState, useRef } from 'react';
import { User } from '../../../components/User';
import Button from '../../../components/ui/Button';
import DropDownPicker from 'react-native-dropdown-picker';

const TodoScreen = () => {
   const [title, setTitle] = useState('')
   const [desc, setDesc] = useState('')
   const [todos, setTodos] = useState('')
   const [newTodos, setNewTodos] = useState('')
   const [user, setUser] = useState('')
   const [modalVisible, setModalVisible] = useState(false);
   const listRef = useRef(null);
   const [rerun, setRerun] = useState('')

   const [open, setOpen] = useState(false);
   const [value, setValue] = useState();
   const [items, setItems] = useState([
      {label: 'Nowe', value: 'Nowe'},
      {label: 'Do zrobienia', value: 'Do zrobienia'},
      {label: 'W trakcie', value: 'W trakcie'},
      {label: 'Zrobione', value: 'Zrobione'},
      {label: 'W przyszłości', value: 'W przyszlosci'},
   ]);

   useEffect(() => {
      User().then((data) => setUser(data))
      setRerun(false)
   }, [])

   supabase
   .channel('todos')
   .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, (payload) => {
      setRerun(true)
   })
  .subscribe()

   useEffect(() => {
      async function getData() {
         const { data, error } = await supabase
         .from('todos')
         .select('*')
         .limit(20)
         .order('created_at', { ascending: false })
         
         setTodos(data)
      }

      getData();
      setRerun(false);
   }, [rerun])


   async function addTodo() {
      const { error } = await supabase
      .from('todos')
      .insert({ name: title, description: desc, priority: value, author_id: user.id })

      if (error) {
         Toast.show(error.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
         });
      }

      setRerun(true)

      setModalVisible(!modalVisible)
   }

   const Item = ({content, priority, name}) => (
      <View style={styles.item}>
         <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{name}</Text>
            <Text style={styles.itemTitle}>
               {(() => {
                  switch (priority) {
                    case "Do zrobienia": return <View style={styles.todoOne}><Text style={styles.todoOneText}>Do zrobienia</Text></View>;
                    case "W trakcie": return <View style={styles.todoTwo}><Text style={styles.todoTwoText}>W trakcie</Text></View>;
                    case "Zrobione": return <View style={styles.todoThree}><Text style={styles.todoThreeText}>Zrobione</Text></View>;
                    case "W przyszlosci": return <View style={styles.todoFour}><Text style={styles.todoFourText}>W przyszłości</Text></View>;
                    default: return <View style={styles.todoFive}><Text style={styles.todoFiveText}>Nowe</Text></View>;
                  }
                })()}
            </Text>
         </View>
         <View style={styles.desc}>
            <Text style={styles.descText}>{content}</Text>
         </View>
      </View>
   );

   return (
      <View style={styles.container}>
      <View style={styles.widthContainer}>
         <View style={styles.inner}>
            <Text style={styles.headerTitle}>Lista todo knurka</Text>
            {todos.length === 0 ? <Text style={styles.loading}>Nie masz zadnych tasków mordo</Text> :
               <FlatList
               ref={listRef}
               data={todos}
               renderItem={({item}) => <Item content={item.description} name={item.name} priority={item.priority} />}
               keyExtractor={item => item.id}
               style={styles.list}
               onContentSizeChange={() => listRef.current.scrollToEnd() }
               onLayout={() => listRef.current.scrollToEnd() }
               inverted />
            }
            <View style={styles.inline}>
               {/* <View style={styles.verticallySpaced}>
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
               </View> */}
               <Button onPress={() => setModalVisible(true)} type="grey" text="Dodaj nową notatke"  />
            </View>
         </View>

      </View>

      <View style={styles.centeredView}>
            <Modal
               animationType="slide"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                  setModalVisible(!modalVisible);
               }}>
               <KeyboardAvoidingView behavior="padding" style={styles.modalContainer} keyboardVerticalOffset={40}>

               <View style={styles.modalwidthContainer}>
                  <View style={styles.verticallySpaced}>
                     <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Tytuł zadania"
                        placeholderTextColor="#fff"
                        autoCapitalize={'none'}
                     />
                  </View>
                  <View style={styles.verticallySpaced}>
                     <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text) => setDesc(text)}
                        placeholder="Opis zadania"
                        placeholderTextColor="#fff"
                        autoCapitalize={'none'}
                     />
                  </View>
                  <View style={styles.picker}>
                     <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Wybierz status"
                        theme="DARK"
                        multiple={false}
                        mode="BADGE"
                        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                        />
                  </View>
                  <Button text="Dodaj zadanko" onPress={() => addTodo()} />
                  <Button text="Anuluj" type="grey" onPress={() => setModalVisible(!modalVisible)} />
               </View>

               </KeyboardAvoidingView>
            </Modal>
         </View>
      </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
   loading: {
      color: 'white',
      width: '100%',
      textAlign: 'center'
   },
   modalContainer: {
      width: '100%',
      backgroundColor: '#0D0D0D',
      flex: 1,
      height: '100%',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center'
   },
   picker: {
      padding: 20,
      color: 'white',
      zIndex: 10
   },
   modalwidthContainer: {
      width: '80%',
      flex: 1,
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10
   },
   centeredView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1
    },
    modalView: {
      margin: 20,
      backgroundColor: '#16181D',
      borderRadius: 20,
      width: '80%',
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      flexGrow: 0,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.6,
      shadowRadius: 8,
      elevation: 5,
    },
   desc: {
      paddingVertical: 4
   },
   descText: {
      color: '#a9a9a9',
      fontSize: 12,
      fontFamily: 'DMSans_700Bold'
   },
   itemHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 2,
      borderColor: '#2d2d2d',
      paddingBottom: 0
   },
   todoOne: {
      backgroundColor: '#482F2F',
      padding: 4,
      borderRadius: 4,
   },
   todoOneText: {
      color: '#E55F5F',
      fontSize: 11,
      fontFamily: 'DMSans_700Bold'
   },
   todoTwo: {
      color: '#4DD0EC',
      backgroundColor: '#314655',
      padding: 4,
      borderRadius: 4
   },
   todoTwoText: {
      color: '#4DD0EC',
      fontSize: 11,
      fontFamily: 'DMSans_700Bold'
   },
   todoThree: {
      color: '#CDBBAD',
      backgroundColor: '#48423C',
      padding: 4,
      borderRadius: 4
   },
   todoThreeText: {
      color: '#CDBBAD',
      fontSize: 11,
      fontFamily: 'DMSans_700Bold'
   },
   todoFour: {
      color: '#D87FCA',
      backgroundColor: '#513655',
      padding: 4,
      borderRadius: 4
   },
   todoFourText: {
      color: '#D87FCA',
      fontSize: 11,
      fontFamily: 'DMSans_700Bold'
   },
   todoFive: {
      color: '#ABDF83',
      backgroundColor: '#535F3F',
      padding: 4,
      borderRadius: 4
   },
   todoFiveText: {
      color: '#ABDF83',
      fontSize: 11,
      fontFamily: 'DMSans_700Bold'
   },
   itemTitle: {
      color: 'white',
      fontFamily: 'DMSans_500Medium',
      paddingVertical: 2,
      fontSize: 13
   },
   item: {
      padding: 10,
      borderWidth: 2,
      borderRadius: 8,
      marginBottom: 6,
      borderColor: '#2d2d2d'
   },
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
      flex: 1,
      width: '100%'
    },
    itemCurrentUserTitle: {
      color: '#00F077'
    },
    itemUserTitle: {
      color: '#5c8dc9'
    },
   verticallySpaced: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      gap: 10
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
      padding: 18,
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