import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '', username: '', password: '', confirmPassword: '', firstName: '', lastName: ''
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleRegister = () => {
    if (!formData.email || !formData.username || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    dispatch(registerUser(formData));
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {error && <Text style={styles.error}>{typeof error === 'string' ? error : 'Registration failed'}</Text>}

      <TextInput style={styles.input} placeholder="Email *" value={formData.email} onChangeText={(v) => updateFormData('email', v)} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Username *" value={formData.username} onChangeText={(v) => updateFormData('username', v)} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="First Name" value={formData.firstName} onChangeText={(v) => updateFormData('firstName', v)} />
      <TextInput style={styles.input} placeholder="Last Name" value={formData.lastName} onChangeText={(v) => updateFormData('lastName', v)} />
      <TextInput style={styles.input} placeholder="Password *" value={formData.password} onChangeText={(v) => updateFormData('password', v)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password *" value={formData.confirmPassword} onChangeText={(v) => updateFormData('confirmPassword', v)} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  error: { color: '#E53935', marginBottom: 15, textAlign: 'center' },
  link: { color: '#007AFF', marginTop: 10, fontSize: 16, textAlign: 'center' },
});

export default RegisterScreen;
