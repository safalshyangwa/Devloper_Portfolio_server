import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    // 1. Wrap non-ApiError instances
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
        const message = error.message || "Internal Server Error";
        
        // Reassign error to a new ApiError instance
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
        console.log(error)
    
    }

    // 2. Prepare the response object
console.log(error)
    const response = {
        success: false,
        message: error.message,
        errors: error.errors || [],
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    // 3. Send the JSON response
    return res.status(error.statusCode || 500).json(response);
};
