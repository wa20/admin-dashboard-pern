/**
 * Node.js HTTP Server (Built-in Module)
 * 
 * This example uses Node.js's built-in 'http' module, which provides low-level
 * HTTP server functionality. Key differences from Express:
 * 
 * - Manual handling: You must manually set headers (writeHead) and end responses (res.end)
 * - No routing: All requests go to the same handler; you must parse URLs manually
 * - No middleware: No built-in middleware system for authentication, logging, etc.
 * - More verbose: Requires more code for common tasks like JSON parsing, routing, etc.
 * 
 * Express.js is a framework built on top of Node.js http that provides:
 * - Simplified routing (app.get('/path', handler))
 * - Middleware support (app.use())
 * - Helper methods (res.send(), res.json(), res.status())
 * - Automatic JSON parsing, static file serving, and more
 * 
 * Use Node.js http for: learning fundamentals, minimal dependencies, full control
 * Use Express for: faster development, better structure, production applications
 */
// import http from "http"
const http = require("http")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end("<h1>Hello World</h1>")
    // res.send("Hello World")
})


server.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000")
})
