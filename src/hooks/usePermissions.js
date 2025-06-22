import { useState, useEffect } from "react";
import { useGetIdentity } from "@refinedev/core";
// Función para obtener la URL base de la API
const getApiUrl = () => {
    // Si estamos en producción, usar URLs relativas
    if (import.meta.env.PROD) {
        return "";
    }
    // En desarrollo, usar la variable de entorno o fallback
    return import.meta.env.VITE_API_URL || "http://127.0.0.1:3001";
};
// Use environment variable or fallback
const API_URL = getApiUrl();
export const usePermissions = () => {
    const { data: identity } = useGetIdentity();
    const [permissions, setPermissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const fetchPermissions = async () => {
        if (!identity) {
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            // Fetch all permissions for this role
            const rolePermissionsResponse = await fetch(`${API_URL}/permissions?roleId=role-${identity.role}`);
            const rolePermissions = await rolePermissionsResponse.json();
            // Fetch user-specific overrides
            const overridesResponse = await fetch(`${API_URL}/userPermissionOverrides?userId=${identity.id}`);
            const overridesData = await overridesResponse.json();
            // Create a map of permissions
            const permissionMap = new Map();
            // First, add all role permissions
            rolePermissions.forEach((perm) => {
                const key = `${perm.resource}:${perm.action}`;
                permissionMap.set(key, perm.allowed);
            });
            // Then, apply user overrides
            if (overridesData.length > 0) {
                const userOverride = overridesData[0];
                userOverride.permissions.forEach((override) => {
                    const key = `${override.resource}:${override.action}`;
                    permissionMap.set(key, override.allowed);
                });
            }
            // Convert map to array
            const permissionsArray = [];
            permissionMap.forEach((allowed, key) => {
                const [resource, action] = key.split(":");
                permissionsArray.push({ resource, action, allowed });
            });
            setPermissions(permissionsArray);
            setLastUpdate(new Date());
        }
        catch (error) {
            console.error("Error fetching permissions:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchPermissions();
        // Removed the interval - only fetch once when component mounts
    }, [identity?.id, identity?.role]);
    const can = (resource, action) => {
        const permission = permissions.find(p => p.resource === resource && p.action === action);
        return permission?.allowed || false;
    };
    const canAny = (resource, actions) => {
        return actions.some(action => can(resource, action));
    };
    const refreshPermissions = () => {
        fetchPermissions();
    };
    return {
        permissions,
        can,
        canAny,
        isLoading,
        lastUpdate,
        refreshPermissions,
    };
};
