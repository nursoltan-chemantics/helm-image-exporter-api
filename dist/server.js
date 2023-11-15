"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the required modules from Dojo and Express
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
// Create an Express application
const app = (0, express_1.default)();
// Define a route for the API endpoint
app.post("/api/helm", (req, res) => {
    const receivedText = req.body;
    // Respond with a JSON object
    res.json({ message: receivedText });
});
// Create an HTTP server using the Express app
const server = (0, http_1.createServer)(app);
// Specify the port number for the server to listen on
const port = 3005;
// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
