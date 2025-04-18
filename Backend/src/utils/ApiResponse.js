class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data || null;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
