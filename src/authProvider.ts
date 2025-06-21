import { AuthProvider } from "@refinedev/core";

const mockUsers = [
  {
    email: "admin@sleepplus.com",
    roles: ["admin"],
  },
  {
    email: "doctor@sleepplus.com",
    roles: ["doctor"],
  },
];

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user && password === "demo123") {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...user,
          avatar: "https://ui-avatars.com/api/?name=Sleep+Plus",
        })
      );

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
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
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
