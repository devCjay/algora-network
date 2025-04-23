import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINTS } from "../Api/apiConfig"; // Import API endpoints


// Fetch All Raffles Function
export const getAllRaffles = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      return { success: false, error: "User is not authenticated." };
    }

    const response = await fetch(API_ENDPOINTS.RAFFLE_LIST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      return { success: false, error: "Invalid response from server." };
    }

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Failed to fetch raffles." };
    }
  } catch (error) {
    // console.error("Get All Raffles Error:", error);
    return { success: false, error: "Network error. Please try again later." };
  }
};

// Purchase Ticket Function
export const purchaseTicket = async (raffle_id, amount) => {
  try {
    if (!raffle_id || !amount || amount <= 0) {
      return { success: false, error: "Invalid raffle ID or amount." };
    }

    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      return { success: false, error: "User is not authenticated." };
    }

    const response = await fetch(API_ENDPOINTS.PURCHASE_TICKET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, raffle_id }),
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      return { success: false, error: "Invalid response from server." };
    }

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Ticket purchase failed." };
    }
  } catch (error) {
    //console.error("Purchase Ticket Error:", error);
    return { success: false, error: "Network error. Please try again later." };
  }
};

// Fetch My Tickets Function
export const getMyTickets = async (raffle_id) => {
  try {
    if (!raffle_id) {
      return { success: false, error: "Invalid raffle ID." };
    }

    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      return { success: false, error: "User is not authenticated." };
    }

    const response = await fetch(API_ENDPOINTS.MY_TICKETS(raffle_id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      return { success: false, error: "Invalid response from server." };
    }

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Failed to fetch tickets." };
    }
  } catch (error) {
    // console.error("Get My Tickets Error:", error);
    return { success: false, error: "Network error. Please try again later." };
  }
};

// Fetch Raffle Stats Function
export const getRaffleStats = async (raffle_id) => {
  try {
    if (!raffle_id) {
      return { success: false, error: "Invalid raffle ID." };
    }

    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      return { success: false, error: "User is not authenticated." };
    }

    const response = await fetch(API_ENDPOINTS.RAFFLE_STATS(raffle_id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      return { success: false, error: "Invalid response from server." };
    }

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Failed to fetch raffle stats." };
    }
  } catch (error) {
    // console.error("Get Raffle Stats Error:", error);
    return { success: false, error: "Network error. Please try again later." };
  }
};

