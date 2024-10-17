// HomeScreen.js
import React, { useContext,useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [state] = useContext(AuthContext);
  const [username, setUsername] = useState(state?.user?.name || '');

  // Listen for any changes to state.user and update the username accordingly
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/ques/details`, { // Adjust the endpoint according to your backend
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      setUsername(response.data.name); // Assuming the API returns an object with the user's name
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Fetch user details when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (state.token) {
        fetchUserDetails();
      }
    }, [state.token])
  );
  return (
    <Provider>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg' }} 
              style={styles.profileImage} 
            />
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('chatbot')} style={{ marginLeft: 10 }}>
              {/* <Fontisto name="smiley" size={30} color="#000" />  */}
              <FontAwesome5 name="robot" size={28} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('History')} style={{ marginLeft: 10 }}>
                <Fontisto name="history" size={28} color="black" />
              </TouchableOpacity>
              {/* Menu Button */}
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={openMenu} style={{marginLeft:10}}>
                    <Ionicons name="menu" size={28} color="black" />
                  </TouchableOpacity>
                }
                contentStyle={styles.menuContent} // Custom styles for dropdown
              >
                <Menu.Item 
                  onPress={() => { 
                    navigation.navigate('PersonalInfoScreen'); 
                    closeMenu(); 
                  }} 
                  title="Personal Details" 
                  titleStyle={styles.menuItemText} // Custom text style for menu items
                />
                <Menu.Item 
                  onPress={() => { 
                    navigation.navigate('HealthParametersScreen'); 
                    closeMenu(); 
                  }} 
                  title="Health Parameters" 
                  titleStyle={styles.menuItemText} 
                />
              </Menu>
            </View>
          </View>
          <Text style={styles.greeting}>Good Morning,</Text>
          {/* Display updated username */}
          <Text style={styles.username}>{username ? username : 'Guest'}!</Text>
          
          <View style={styles.grid}>
            <TouchableOpacity 
              style={[styles.card, styles.card1]} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('riskNumConceived')}
            >
              <Text style={styles.cardText}>Track your health with AI</Text>
              <Image 
                source={icon1} 
                style={styles.bottomLeftIcon} 
              />
              <TouchableOpacity style={[styles.iconWrapper, styles.card1Icon]} activeOpacity={0.7} onPress={() => navigation.navigate('riskNumConceived')} >
                <Ionicons 
                  name="arrow-forward-outline" 
                  size={30} 
                  color="rgba(48, 63, 159, 0.7)" 
                  style={styles.rotatedIcon} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.card, styles.card2]} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('History')}
            >
              <Text style={styles.cardText}>History</Text>
              <Image 
                source={icon2} 
                style={styles.bottomLeftIcon} 
              />
              <TouchableOpacity style={[styles.iconWrapper, styles.card2Icon]} activeOpacity={0.7} onPress={() => navigation.navigate('History')}>
                <Ionicons 
                  name="arrow-forward-outline" 
                  size={30} 
                  color="rgba(255, 193, 7, 0.7)" 
                  style={styles.rotatedIcon} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.card, styles.card3]} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('MaternalGuide')}
            >
              <Text style={styles.cardText}>Refer the Maternal Guide</Text>
              <Image 
                source={icon3} 
                style={styles.bottomLeftIcon} 
              />
              <TouchableOpacity style={[styles.iconWrapper, styles.card3Icon]} activeOpacity={0.7} onPress={() => navigation.navigate('MaternalGuide')}>
                <Ionicons 
                  name="arrow-forward-outline" 
                  size={30} 
                  color="rgba(76, 175, 80, 0.7)" 
                  style={styles.rotatedIcon} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.card, styles.card4]} 
              onPress={() => navigation.navigate('chatbot')}
              activeOpacity={0.7}
            >
              <Text style={styles.cardText}>Ask MomBuddy anything!</Text>
              <Image 
                source={icon4} 
                style={styles.bottomLeftIcon} 
              />
              <TouchableOpacity 
                style={[styles.iconWrapper, styles.card4Icon]} 
                onPress={() => navigation.navigate('chatbot')}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name="arrow-forward-outline" 
                  size={30} 
                  color="rgba(244, 67, 54, 0.7)" 
                  style={styles.rotatedIcon} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="home-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('riskNumConceived')}>
          <Ionicons name="heart-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MaternalGuide')}>
          <Ionicons name="book-outline" size={25} color="black" />
          </TouchableOpacity>
          
          
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E6EFF8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6EFF8',
    marginTop: 25,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  username: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
    height: 150,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0.2, height: 2 },
    shadowRadius: 20,
    elevation: 5,
    position: 'relative',
  },
  card1: {
    backgroundColor: '#D0E1FF',
  },
  card2: {
    backgroundColor: '#FFECB3',
  },
  card3: {
    backgroundColor: '#D1F2EB',
  },
  card4: {
    backgroundColor: '#FDEDEC',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card1Icon: {
    backgroundColor: 'rgba(48, 63, 159, 0.2)',
  },
  card2Icon: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
  },
  card3Icon: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  card4Icon: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  rotatedIcon: {
    transform: [{ rotate: '-30deg' }],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    position: 'absolute',
    bottom: 8,
    width: width,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomLeftIcon: {
    width: 90,
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 10,
    opacity: 0.5,
  },
  menuContent: {
    backgroundColor: '#fff', // White background for the menu
    borderRadius: 12,           // Rounded corners
    elevation: 6,               // Adds depth with shadow (for Android)
    shadowColor: '#000',        // Shadow for iOS
    shadowOpacity: 0.15,        // Slight opacity for a subtle shadow
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    paddingVertical: 5,         // Padding inside the menu to make it look spacious
  },

  // Menu item text style
  menuItemText: {
    fontSize: 16,               // Text size
    fontWeight: '500',          // Medium weight for readability
    color: '#333',              // Dark gray color to match the rest of the UI
    paddingVertical: 8,         // Padding inside each menu item for touch comfort
    paddingHorizontal: 5,      // Horizontal padding for spacing from the edges
  },

  // Menu button style (trigger button for dropdown)
  menuButton: {
    backgroundColor: '#305F9F', // Same color as the first card for consistency
    padding: 10,                // Padding around the button
    borderRadius: 10,           // Rounded edges
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});


export default HomeScreen;
