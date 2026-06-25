class ApiResponse {
  constructor(statusCode, events, message = "Success") {
    this.statusCode = statusCode;
    this.events = events;
    this.message = message;
    this.success = statusCode < 400;
  }
}

module.exports = { ApiResponse };
