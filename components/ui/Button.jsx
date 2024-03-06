import React, { useState } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';


const Button = props => {
   const [isPress, setIsPress] = useState(false);

   let buttonStyle;
   let buttonStyleHover;

   switch (props.type) {
   case 'grey':
      buttonStyle = styles.buttonGrey
      buttonStyleHover = styles.buttonGreyHover
      break;
   case 'normal':
      buttonStyle = styles.button
      buttonStyleHover = styles.buttonHover
      break;
   case 'icon':
         buttonStyle = styles.buttonIcon
         buttonStyleHover = styles.buttonIconHover
         break;
   default:
      buttonStyle = styles.button
      buttonStyleHover = styles.buttonHover
   }

   const touchProps = {
      onHideUnderlay: () => setIsPress(false),
      onShowUnderlay: () => setIsPress(true),
      style: isPress ? buttonStyleHover : buttonStyle,
   }

   return (
      <TouchableHighlight {...touchProps} onPress={props.onPress} disabled={props.disabled}>
         <Text style={{ fontFamily: 'DMSans_700Bold', fontSize: 18, color: 'white' }}>{props.text}</Text>
      </TouchableHighlight>
   );
};

const styles = StyleSheet.create({
  button: {
   paddingVertical: 20,
   width: '80%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 12,
   borderWidth: 2,
   borderColor: '#00F077', 
   backgroundColor: '#0C1F15',
   shadowColor: "#00F077",
   shadowOffset: {
      width: 0,
      height: 5,
   },
   shadowOpacity: 1,
   shadowRadius: 0,
   elevation: 1
  },
  buttonHover: {
   paddingVertical: 20,
   width: '80%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderRadius: 12,
   borderWidth: 2,
   borderColor: '#00F077', 
   shadowColor: "#00F077",
   shadowOffset: {
      width: 0,
      height: 7,
   },
   shadowOpacity: 1,
   shadowRadius: 0,
   elevation: 1,
   position: 'relative',
   top: 7
  },

  //Grey button
  buttonGrey: {
   paddingVertical: 10,
   width: '80%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 12,
   borderWidth: 2,
   borderColor: '#3e3e3e', 
   backgroundColor: '#181818',
   shadowColor: "#3e3e3e",
   shadowOffset: {
      width: 0,
      height: 5,
   },
   
   shadowOpacity: 1,
   shadowRadius: 0,
   elevation: 1
  },
  buttonGreyHover: {
   paddingVertical: 10,
   width: '80%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderRadius: 12,
   borderWidth: 2,
   borderColor: '#3e3e3e', 
   shadowColor: "#3e3e3e",
   shadowOffset: {
      width: 0,
      height: 7,
   },
   shadowOpacity: 1,
   shadowRadius: 0,
   elevation: 1,
   position: 'relative',
   top: 5
  },

  //Icon button
  buttonIcon: {
   flex: 1,
   padding: 0,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 12,
   borderWidth: 2,
   borderColor: '#3e3e3e', 
   backgroundColor: '#181818',
   elevation: 1
  },
  buttonIconHover: {
   flex: 1,
   padding: 0,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderRadius: 12,
   borderWidth: 2,
   borderColor: '#3e3e3e', 
   shadowColor: "#3e3e3e",
   shadowOffset: {
      width: 0,
      height: 3,
   },
   shadowOpacity: 1,
   shadowRadius: 0,
   elevation: 1,
   position: 'relative',
   top: 2
  },
});


export default Button;
