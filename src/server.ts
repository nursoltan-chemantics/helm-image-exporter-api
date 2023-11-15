// Import the required modules from Dojo and Express
import { createServer } from "http";
import express, { Request, Response } from "express";

// Create an Express application
const app = express();

// Define a route for the API endpoint
app.post("/api/helm", (req: Request, res: Response) => {
  const receivedText = req.body;

  // Respond with a JSON object
  res.json({ message: receivedText });
});

// Create an HTTP server using the Express app
const server = createServer(app);

// Specify the port number for the server to listen on
const port = 3005;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
