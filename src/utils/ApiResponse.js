
// src/utils/ApiResponse.js
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // Automatically true if status is 2xx or 3xx
    }
}

export { ApiResponse };
