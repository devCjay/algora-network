import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from './apiConfig';


// List User Orders
export const useListUserOders = () => {

  const [orderData, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        // Retrieve token from storage
        const token = await AsyncStorage.getItem("userToken");

        const response = await fetch(API_ENDPOINTS.LIST_ORDERS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token if required
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user orders");
        }

        const orderData = await response.json();

        if (Array.isArray(orderData)) {
          setOrders(orderData); // ✅ Only set `orders` if `data` is an array
        } else {
          // console.error("Unexpected API response:", data);
          setOrders([]); // ✅ Fallback to an empty array if response is not an array
        }


      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  return { orderData };
};


export const createOrder = async (id, numMonths, currency) => {
  try {

    // Retrieve token from storage
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(API_ENDPOINTS.CREATE_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token if required
      },
      body: JSON.stringify({
        id,
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



