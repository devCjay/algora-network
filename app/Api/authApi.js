import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINTS } from "./apiConfig";


// User login function
export const loginUser = async (email, password) => {


  try {

    const response = await fetch(API_ENDPOINTS.USER_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem("userToken", data.token);
      return { success: true, message: "Login successful", token: data.token };

    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return { success: false, message: "Network error" };
  }
};


// 🌐 User registration function
export const registerUser = async (email, password, confirmPassword, username, ref_username) => {
  if (!email || !password || !confirmPassword || !username) {
    return { success: false, message: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  try {
   
    const body = {
      email,
      password,
      username,
      ref_username: ref_username || "twcjay",
    };

    console.log("Register body:", body);

    const response = await fetch(API_ENDPOINTS.USER_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || data?.success === false || data?.status === "error") {
      console.warn("API logic error:", data);
      return {
        success: false,
        message: data?.message || "Registration failed",
      };
    }

    await AsyncStorage.setItem("userToken", data.token);
    return {
      success: true,
      message: data?.message || "Registration successful",
      token: data?.token,
    };

  } catch (error) {
    console.error("Registration error:", error?.message || error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};



// Function to check if user is authenticated
export const checkAuthStatus = async () => {
  const token = await AsyncStorage.getItem("userToken");
  return token ? true : false;
};

// Function to log out the user
export const logoutUser = async () => {
  await AsyncStorage.removeItem("userToken");
};


// Function to delete user account
export const deleteUserAccount = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(API_ENDPOINTS.DELETE_ACCOUNT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      await AsyncStorage.removeItem("userToken");
      return { success: true, message: "Account deleted successfully" };
    } else {
      const data = await response.json();
      return { success: false, message: data.message || "Failed to delete account" };
    }
  } catch (error) {
    console.error("Delete account error:", error.message);
    return { success: false, message: "Network error" };
  }
}