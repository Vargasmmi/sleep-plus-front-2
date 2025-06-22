import { AuthProvider } from "@refinedev/core";
import { activityLogService } from "../services/activityLogService";

// Función para obtener la URL base de la API
const getApiUrl = () => {
  // Si estamos en producción, usar la URL del backend de EasyPanel
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || "https://sleep-plus-front-2-backend.dqyvuv.easypanel.host";
  }
  
  // En desarrollo, usar la variable de entorno o fallback
  return import.meta.env.VITE_API_URL || "http://127.0.0.1:3001";
};

// Use environment variable or fallback to localhost
const API_URL = getApiUrl();
// No agregamos /api porque json-server no lo usa
const FULL_API_URL = API_URL;

console.log('🔧 Auth API URL configured as:', FULL_API_URL);

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      console.log('🔐 Attempting login for:', email);
      
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
          console.log(`🔍 Fetching employee data from: ${FULL_API_URL}/employees/${user.id}`);
          
          const response = await fetch(`${FULL_API_URL}/employees/${user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          
          if (response.ok) {
            const employeeData = await response.json();
            console.log('✅ Employee data fetched successfully:', employeeData);
            
            userData = {
              ...userData,
              firstName: employeeData.firstName || userData.firstName,
              lastName: employeeData.lastName || userData.lastName,
              storeId: employeeData.storeId || userData.storeId,
              avatar: employeeData.avatar || userData.avatar,
              employeeId: employeeData.employeeId || userData.employeeId,
            };
          } else {
            console.warn(`⚠️ Employee API responded with status: ${response.status}`);
          }
        } catch (error) {
          console.warn('⚠️ Could not fetch employee data from API, using local data:', error);
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
          console.warn('⚠️ Activity logging not available:', error);
        }
        
        console.log('✅ Login successful for:', userData.email);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      console.log('❌ Invalid credentials for:', email);
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    } catch (error) {
      console.error('❌ Login error:', error);
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
    console.log('🚪 Logging out...');
    
    // Log logout activity before removing auth
    try {
      await activityLogService.logLogout();
    } catch (error) {
      console.error('Error logging logout:', error);
    }
    
    localStorage.removeItem("auth");
    console.log('✅ Logout successful');
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
