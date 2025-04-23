import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from './apiConfig';


// List User Miner 
export const useListUserMiner = () => {

  const [minerData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchUserMiner = async () => {
    try {
      // Retrieve token from storage
      const token = await AsyncStorage.getItem("userToken");

      const response = await fetch(API_ENDPOINTS.MINERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token if required
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch earnings");
      }

      const minerData = await response.json();
      setData(minerData);
    

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserMiner();
 }, []);

 return { minerData };
};



// List cloud Miner 
export const useListMiner = () => {

    const [listMiner, setMiner] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchMiner = async () => {
      try {
        // Retrieve token from storage
        const token = await AsyncStorage.getItem("userToken");
  
        const response = await fetch(API_ENDPOINTS.LIST_MINERS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token if required
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch earnings");
        }
  
        const listMiner = await response.json();
        setMiner(listMiner);
      
  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMiner();
   }, []);
  
   return { listMiner };
  };



  export const ExtendMiner = async (cloud_miner_id, numMonths, currency) => {
    try {

       // Retrieve token from storage
       const token = await AsyncStorage.getItem("userToken");
       
      const response = await fetch(API_ENDPOINTS.EXTEND_MINER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token if required
        },
        body: JSON.stringify({
          cloud_miner_id,
          num_months: parseInt(numMonths), // Ensure it's a number
          currency,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || "Order creation failed." };
      }
    } catch (error) {
      return { success: false, error: "Something went wrong!" };
    }
  };
  