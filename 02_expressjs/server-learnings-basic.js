/**
 * Express.js Server - RESTful API Example
 * 
 * Express is a web framework for Node.js that simplifies HTTP server creation.
 * It provides routing, middleware, and helper methods for handling requests/responses.
 */

import express from "express"

// Create an Express application instance
// This 'app' object has methods for routing HTTP requests, configuring middleware, etc.
const app = express()
const PORT = 3000

/**
 * ROUTING BASICS
 * 
 * Routes define how the server responds to client requests at specific URLs.
 * Syntax: app.METHOD(path, handler)
 * - METHOD: HTTP method (get, post, put, delete, etc.)
 * - path: URL path (e.g., "/", "/api/v1/cars")
 * - handler: Function that receives (req, res) and sends a response
 * 
 * req (request): Contains data about the incoming HTTP request
 * res (response): Used to send data back to the client
 */

// Root route - handles GET requests to the homepage
app.get("/", (req, res) => {
    // res.send() automatically sets Content-Type header and sends response
    res.send("<h1>Hello World, pretending to be a server using express</h1>")
})

/**
 * RESTful API Routes for Cars Resource
 * 
 * REST (Representational State Transfer) is an architectural style for APIs.
 * It uses HTTP methods to perform CRUD operations:
 * - GET: Retrieve data (read)
 * - POST: Create new data
 * - PUT: Update existing data (full update)
 * - DELETE: Remove data
 * 
 * Common REST pattern: /api/v1/resource
 * - /api: Indicates this is an API endpoint
 * - /v1: API version (allows future versions without breaking changes)
 * - /cars: The resource (noun, plural)
 */

// GET /api/v1/cars - Retrieve all cars (collection endpoint)
app.get('/api/v1/cars', (req, res) => {
    res.send('All cars')
})

// POST /api/v1/cars - Create a new car
// POST requests typically include data in the request body (req.body)
app.post('/api/v1/cars', (req, res) => {
    res.send('Create a new car')
})

/**
 * ROUTE PARAMETERS
 * 
 * Use :paramName to capture dynamic values from the URL.
 * Example: /api/v1/cars/:id
 * - :id is a route parameter
 * - Access it via req.params.id
 * - URL: /api/v1/cars/123 → req.params.id = "123"
 */

// PUT /api/v1/cars/:id - Update a specific car by ID
// PUT is used for full resource updates
app.put('/api/v1/cars/:id', (req, res) => {
    // req.params contains route parameters
    // req.params.id extracts the :id value from the URL
    res.send(`Update a car ${req.params.id}`)
})

// DELETE /api/v1/cars/:id - Delete a specific car by ID
app.delete('/api/v1/cars/:id', (req, res) => {
    res.send(`Delete a car ${req.params.id}`)
})

// GET /api/v1/cars/:id - Retrieve a specific car by ID (item endpoint)
// Note: This route should be defined AFTER the collection route (/api/v1/cars)
// to avoid conflicts, as Express matches routes in order
app.get('/api/v1/cars/:id', (req, res) => {
    res.send(`Get a car ${req.params.id}`)
})

/**
 * STARTING THE SERVER
 * 
 * app.listen() starts the HTTP server and listens for incoming connections.
 * It takes a port number and an optional callback that runs when the server starts.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})