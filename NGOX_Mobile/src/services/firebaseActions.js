import firestore from '@react-native-firebase/firestore';

/**
 * USERS: Storing Profile Information
 */
export const saveUserProfile = async (uid, userData) => {
  try {
    await firestore()
      .collection('Users')
      .doc(uid)
      .set({
        ...userData,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    console.log('[Firebase] User Profile Saved');
  } catch (error) {
    console.error('[Firebase] Error saving profile:', error);
    throw error;
  }
};

/**
 * NGOs: Adding a new NGO to the Global List
 */
export const registerNGO = async (ngoData) => {
  try {
    const newNgoRef = firestore().collection('NGOs').doc();
    await newNgoRef.set({
      id: newNgoRef.id,
      ...ngoData,
      isActive: true,
      registeredAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('[Firebase] NGO Registered successfully');
  } catch (error) {
    console.error('[Firebase] Error registering NGO:', error);
    throw error;
  }
};

import { saveUserProfile } from '../services/firebaseActions';

// Inside your Signup function
const handleSignup = async (user) => {
  const profile = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    language: "hi"
  };
  
  await saveUserProfile(user.uid, profile);
};