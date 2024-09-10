import React from 'react'
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {router} from 'expo-router'

const MyLogin = () => {
  const hardcodedPassword = 'jirehPSA2024!';

  const passwordRequirements = {
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  };
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!passwordRequirements.hasUppercase.test(pass)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!passwordRequirements.hasLowercase.test(pass)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!passwordRequirements.hasNumber.test(pass)) {
      return 'Password must include at least one number.';
    }
    if (!passwordRequirements.hasSpecialCharacter.test(pass)) {
      return 'Password must include at least one special character.';
    }
    return ''; 
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
    const validationMessage = validatePassword(newPassword);
    setIsValid(!validationMessage);
  };

  const handleSubmit = () => {
    if (password !== hardcodedPassword) {
      Alert.alert('Password is incorrect.');
      return;
    }
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      Alert.alert(validationMessage);
      return;
    }
    Alert.alert('Login Successful.');
    router.push('/(tabs)');
  };
    return(
        <SafeAreaView>
         <TextInput
        style={[styles.input /*, isDarkTheme && styles.darkInput*/]}
        onChangeText={handleChangePassword}
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
        // placeholderTextColor={placeholderColor}
      />
      <TouchableOpacity
        style={[styles.button /*, isDarkTheme && styles.darkButton*/]}
        onPress={handleSubmit}>
      <Text style={{fontSize: 20}}>Submit</Text>
      </TouchableOpacity>
        {/* <Button
          title='Go to tabs'
          onPress={() => {router.push('/(tabs)')}}/>*/}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  input:{
    fontSize:16,
          borderBottomWidth: 1,
          padding: 5,
          width: '50%'},
})
export default MyLogin;