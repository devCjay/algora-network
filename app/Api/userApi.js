import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation} from '@react-navigation/native';
import { API_ENDPOINTS } from './apiConfig';

export const useUserData = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [usdbalance, setUsdbalance] = useState(null);
  const [machineinitcode, setMachineinitcode] = useState(null);
  const [supportphrase, setSupportphrase] = useState(null);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(API_ENDPOINTS.USER_DATA, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Set state with user data
          setUsername(data.username); // Note: Corrected the typo (`usrename` -> `username`)
          setEmail(data.email);
          setUsdbalance(data.usd_balance);
          setMachineinitcode(data.machine_init_code);
          setSupportphrase(data.support_phrase);
          setUid(data.uid);
        } else {
          //console.error("Error fetching user data:", data.message);
          await AsyncStorage.removeItem("userToken");
          navigation.replace("SignIn");

        }
      } catch (error) {
       // console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { username, email, usdbalance, machineinitcode, supportphrase, uid, loading };
};


// Fetch Miner Rate
export const useRate = () => {
 const [cminer, setCminer] = useState(null)
 const [cminerAmount, setCminerAmount] = useState(null)
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchCurrencyRate = async () => {
     try {
       const token = await AsyncStorage.getItem("userToken");
       if (!token) {
         throw new Error("No authentication token found");
       }
 
       const response = await fetch(API_ENDPOINTS.CURRENCY_RATE, {
         method: "GET",
         headers: {
           "Authorization": `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       });
 
       const data = await response.json();
       //console.log(data);
 
       if (response.ok) {
         
         setCminer(data.cloud_miner_count.toString());
         setCminerAmount(data.amount.toString());
 
       } else {
        // console.error("Error fetching currency rate:", data.message);
       }
     } catch (error) {
       //console.error("Fetch error:", error.message);
     } finally {
       setLoading(false);
     }
   };
 
   fetchCurrencyRate();
  }, []);

  return { cminer, cminerAmount };
};


// Get user Earing 
export const useEarnings = () => {

    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        // Retrieve token from storage
        const token = await AsyncStorage.getItem("userToken");

        const response = await fetch(API_ENDPOINTS.EARNINGS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token if required
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch earnings");
        }

        const data = await response.json();
        console.log(data.earnings);

        setEarnings(data.earnings); // Assuming API returns an array of earnings
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
   }, []);
 
   return { earnings };
 };




 // Get user Refarral
export const useRefarral = () => {

  const [data, setData] = useState([]);
  const [userRefCount, setUserRefCount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchUserRef = async () => {
    try {
      // Retrieve token from storage
      const token = await AsyncStorage.getItem("userToken");

      const response = await fetch(API_ENDPOINTS.REFERRALS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token if required
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch earnings");
      }

      const data = await response.json();
      
      setData(data);
      setUserRefCount(data.length);

       // Calculate the sum of amount field
       const sum = data.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.earnings || 0);
      }, 0);
      
      setTotalAmount(sum);
    
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserRef();
 }, []);

 return { data, userRefCount, totalAmount };
};


// Fund Account Request
export const fundAccount = async (currency, amount) => {
  try {
    // Retrieve token from AsyncStorage
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Make the POST request
    const response = await fetch(API_ENDPOINTS.FUND_ACCOUNT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token for authentication
      },
      body: JSON.stringify({
        currency,
        amount,
      }),
    });

    // Parse the response
    const data = await response.json();

    if (response.ok) {
      return { success: true, data }; // Return success response
    } else {
      return { success: false, error: data?.message || "Failed to fund account" }; // Handle API errors
    }
  } catch (error) {
    console.error("Error funding account:", error.message);
    return { success: false, error: "Network error. Please try again later." }; // Handle network errors
  }
};
