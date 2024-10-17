import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function HealthParametersScreen({ navigation }) {
  const [healthDetails, setHealthDetails] = useState({
    numConceived: '',
    liveBirth: '',
    abortion: '',
    childDeath: '',
    deliveries: '',
  });
  const [loading, setLoading] = useState(true);
  const [state] = useContext(AuthContext); // Access token and user data from context

  useEffect(() => {
    const fetchHealthDetails = async () => {
      try {
        const response = await axios.get(`/ques/details`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setHealthDetails({
          numConceived: String(response.data.numConceived),
          liveBirth: String(response.data.liveBirth),
          abortion: String(response.data.abortion),
          childDeath: String(response.data.childDeath),
          deliveries: String(response.data.deliveries),
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health details:', error);
        Alert.alert('Error', 'Could not fetch health details');
        setLoading(false);
      }
    };

    fetchHealthDetails();
  }, [state.user._id, state.token]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/ques/update-details`, healthDetails, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      Alert.alert('Success', 'Health details updated successfully');
      navigation.goBack(); // Navigate back after updating
    } catch (error) {
      console.error('Error updating health details:', error);
      Alert.alert('Error', 'Could not update health details');
    }
  };

  const handleChange = (field, value) => {
    setHealthDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Update <Text style={styles.headerTextBold}>Health Parameters</Text></Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.labelText}>Number of Times Conceived</Text>
        <TextInput
          style={styles.input}
          placeholder="Number of Times Conceived"
          value={healthDetails.numConceived}
          onChangeText={(text) => handleChange('numConceived', text)}
          keyboardType="numeric"
        />

        <Text style={styles.labelText}>Number of Deliveries</Text>
        <TextInput
          style={styles.input}
          placeholder="Deliveries"
          value={healthDetails.deliveries}
          onChangeText={(text) => handleChange('deliveries', text)}
          keyboardType="numeric"
        />

        <Text style={styles.labelText}>Number of Live Births</Text>
        <TextInput
          style={styles.input}
          placeholder="Live Births"
          value={healthDetails.liveBirth}
          onChangeText={(text) => handleChange('liveBirth', text)}
          keyboardType="numeric"
        />

        <Text style={styles.labelText}>Number of Abortions</Text>
        <TextInput
          style={styles.input}
          placeholder="Abortions"
          value={healthDetails.abortion}
          onChangeText={(text) => handleChange('abortion', text)}
          keyboardType="numeric"
        />

        <Text style={styles.labelText}>Number of Child Deaths</Text>
        <TextInput
          style={styles.input}
          placeholder="Child Deaths"
          value={healthDetails.childDeath}
          onChangeText={(text) => handleChange('childDeath', text)}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  topContainer: {
    height: 190,
    backgroundColor: '#fcd8df',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  labelText: {
    marginBottom: 8,
    color: '#555',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: '#a0d468',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
