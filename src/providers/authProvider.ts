import { AuthProvider } from "@refinedev/core";
import { activityLogService } from "../services/activityLogService";

// Función para obtener la URL base de la API
const getApiUrl = () => {
  // Si estamos en producción, usar URLs relativas
  if (import.meta.env.PROD) {
    return "";
  }
  
  // En desarrollo, usar la variable de entorno o fallback
  return import.meta.env.VITE_API_URL || "http://127.0.0.1:3001";
};

// Use environment variable or fallback to localhost
const API_URL = getApiUrl();

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      // In production, this would call your API
      // For demo, we'll accept specific credentials
      const validCredentials = [
        { 
          email: "demo@lamattressstore.com", 
          password: "demo123", 
          role: "agent", 
          name: "Demo Usuario", 
          id: "emp-demo",
          firstName: "Demo",
          lastName: "Usuario",
          storeId: "store-001",
          employeeId: "EMP-DEMO"
        },
        { 
          email: "maria.garcia@lamattressstore.com", 
          password: "demo123", 
          role: "agent", 
          name: "María García", 
          id: "emp-001",
          firstName: "María",
          lastName: "García",
          storeId: "store-001",
          employeeId: "EMP-001"
        },
        { 
          email: "john.smith@lamattressstore.com", 
          password: "demo123", 
          role: "manager", 
          name: "John Smith", 
          id: "emp-002",
          firstName: "John",
          lastName: "Smith",
          storeId: "store-001",
          employeeId: "EMP-002"
        },
        { 
          email: "admin@lamattressstore.com", 
          password: "admin123", 
          role: "admin", 
          name: "Admin User", 
          id: "admin-001",
          firstName: "Admin",
          lastName: "User",
          storeId: "store-001",
          employeeId: "ADMIN-001"
        },
      ];

      const user = validCredentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (user) {
        let userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          storeId: user.storeId,
          avatar: `/avatars/${user.firstName.toLowerCase()}.jpg`,
          employeeId: user.employeeId,
        };

        // Try to fetch employee data from the API, but don't fail if it's not available
        try {
          const response = await fetch(`${API_URL}/employees/${user.id}`);
          if (response.ok) {
            const employeeData = await response.json();
            userData = {
              ...userData,
              firstName: employeeData.firstName || userData.firstName,
              lastName: employeeData.lastName || userData.lastName,
              storeId: employeeData.storeId || userData.storeId,
              avatar: employeeData.avatar || userData.avatar,
              employeeId: employeeData.employeeId || userData.employeeId,
            };
          }
        } catch (error) {
          console.warn('Could not fetch employee data from API, using local data:', error);
        }

        localStorage.setItem("auth", JSON.stringify(userData));
        
        // Log login activity (but don't fail login if it errors)
        try {
          await activityLogService.logLogin({
            email: user.email,
            role: user.role,
            storeId: userData.storeId
          });
        } catch (error) {
          console.warn('Activity logging not available:', error);
        }
        
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "An error occurred during login",
        },
      };
    }
  },

  logout: async () => {
    // Log logout activity before removing auth
    try {
      await activityLogService.logLogout();
    } catch (error) {
      console.error('Error logging logout:', error);
    }
    
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    try {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const user = JSON.parse(auth);
        // Ensure user has required fields
        if (user && user.role && user.id) {
          return {
            authenticated: true,
          };
        }
      }

      return {
        authenticated: false,
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getPermissions: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        const user = JSON.parse(auth);
        return user.role || null;
      } catch {
        return null;
      }
    }
    return null;
  },

  getIdentity: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        const user = JSON.parse(auth);
        // Ensure we return a valid user object
        if (user && user.role) {
          return user;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    return null;
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};