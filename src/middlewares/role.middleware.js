import { ApiError } from "../utils/ApiError.js";

/**
 * @param {...string} allowedRoles - List of roles permitted to access the route
 */
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // 1. Check if user exists (ensure verifyJWT was called first)
        if (!req.user) {
            throw new ApiError(401, "Unauthorized: User not authenticated");
        }

        // 2. Check if the user's role is in the allowed list
        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(
                403, 
                `Access Denied: ${req.user.role} role is not authorized to access this resource`
            );
        }

        next();
    };
};
