import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, TouchableHighlight, Image, Modal, Alert } from 'react-native';
import { HEADERIMAGE, LOGO, FOTY } from '../image/image';
import Button from '../../components/ui/Button';


const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Image
         source={ HEADERIMAGE }
         />
      </View>

         <Image
         style={styles.headerLogo}
         source={ LOGO }
         resizeMode="contain"
         />

      <View style={styles.photosContainer}>
         <Image
         style={styles.photos}
         source={ FOTY }
         resizeMode="contain"
         />
      </View>
      <Button text="WCHODZĘ *HRUM*" onPress={() => navigation.navigate("Auth")} />
      <Pressable
          style={[styles.btnReg, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Regulamin aplikacji</Text>
      </Pressable>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Postanowienie</Text>
              <Text style={styles.modalText}>Ja, fvlvte, postanawiam uznać uzytkownika "delalegion" za zwycięzce konkursu ogłoszonego 01.09.2023, w którym do wygrania jest nintendo słicz. Uznaję, aplikację uzytkownika "delalegion" za najlepszą, lepszą od konkurencji i postanawiam wręczyć mu nagrodę jako znak zwycięstwa. Konkurs rostrzygnięto 10.02.2024 na twich.tv/fvlvte na którym osoba fvlvte dalej znany jako Kacper F. ogłosi zwyięzce konkursu uzytkownika "delalegion"</Text>
              <Button text="Akceptuję warunki" onPress={() => setModalVisible(!modalVisible)} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  btnReg: {
    marginVertical: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 6
  },
  buttonOpen: {
    backgroundColor: '#000',
  },
  buttonClose: {
    backgroundColor: '#000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalTitle: {
    color: 'white',
    marginBottom: 15,
    fontSize: 28,
    textAlign: 'center',
  },
  photos: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    margin: 0,
    padding: 0
  },
  headerLogo: {
    width: '70%',
    margin: 0,
    padding: 0,
    height: 100
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  container: {
    paddingBottom: 50,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#000',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between'
  },
  text: {
   color: 'white',
   fontSize: 18,
   letterSpacing: '0.5%',
   textTransform: 'uppercase',
   fontWeight: 600,
   fontFamily: 'DMSans_700Bold'
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
  },
});

export default HomeScreen;
