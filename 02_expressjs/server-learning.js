import express from "express"

// Create Express app instance - this is your web server
const app = express()
const PORT = 3000

// Router allows you to group related routes together
// Useful for organizing code and applying middleware to specific route groups
const router = express.Router()

// Middleware: express.json() parses incoming JSON data from request body
// Without this, req.body would be undefined for POST/PUT requests
app.use(express.json())


// In-memory data storage (simulates a database)
// In production, you'd use a real database (PostgreSQL, MongoDB, etc.)
let cars = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, price: 10000 },
    { id: 2, make: 'Ford', model: 'F150', year: 2021, price: 20000 },
    { id: 3, make: 'Chevrolet', model: 'Camaro', year: 2020, price: 30000 },
    { id: 4, make: 'Nissan', model: 'Altima', year: 2023, price: 40000 },
    { id: 5, make: 'Honda', model: 'Civic', year: 2020, price: 50000 },
    { id: 6, make: 'BMW', model: 'X5', year: 2025, price: 60000 },
    { id: 7, make: 'Mercedes', model: 'C-Class', year: 2026, price: 70000 },
    { id: 8, make: 'Audi', model: 'A4', year: 2024, price: 80000 },
    { id: 9, make: 'Volkswagen', model: 'Golf', year: 2026, price: 90000 },
    { id: 10, make: 'Hyundai', model: 'Elantra', year: 2025, price: 100000 },
]

 


// Router route: GET /api/v1/cars/ (when router is mounted)
// res.json() automatically sets Content-Type to application/json
router.get('/', (req, res) => { 
    res.json(cars)
})

// Root route - serves HTML homepage
app.get("/", (req, res) => {
    res.send("<h1>Hello World, pretending  to be a server using express</h1>")
})

// GET /api/v1/cars - Retrieve all cars (collection endpoint)
// Returns the entire cars array as JSON
app.get('/api/v1/cars', (req, res) => {
    res.json(cars)
})


// GET /api/v1/cars/:id - Retrieve a specific car by ID
// :id is a route parameter (e.g., /api/v1/cars/5 → req.params.id = "5")
app.get('/api/v1/cars/:id', (req, res) => {
    // Convert string parameter to number for comparison
    const carId = Number(req.params.id)

    // Array.find() returns first matching item or undefined
    const car = cars.find((car) => car.id === carId)

    // Error handling: 404 = Not Found (resource doesn't exist)
    // Use 'return' to stop execution after sending response
    if(!car){
        return res.status(404).json({ message: 'Car not found' })
    }

    // Success: return the found car
    res.json(car);

})
 

// POST /api/v1/cars - Create a new car
// POST requests include data in req.body (parsed by express.json() middleware)
app.post('/api/v1/cars', (req, res) => { 
    // Destructuring: extract properties from req.body
    const { make, model, year, price } = req.body
    
    // Validation: 400 = Bad Request (client sent invalid data)
    if (!make || !model || !year || !price) {
        return res.status(400).json({ 
            message: 'Missing required fields: make, model, year, and price are required' 
        })
    }
    
    // Generate new ID: find max existing ID and add 1
    // Math.max(...array) spreads array values as arguments
    const newId = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1
    
    // Create new car object
    const newCar = {
        id: newId,
        make,
        model,
        year: Number(year),  // Ensure year is a number
        price: Number(price) // Ensure price is a number
    }
    
    // Add to array
    cars.push(newCar)
    // 201 = Created (successfully created new resource)
    res.status(201).json(newCar)
})



// PUT /api/v1/cars/:id - Update an existing car (full or partial update)
// PUT is idempotent: same request produces same result
app.put('/api/v1/cars/:id', (req, res) => {
    const carId = Number(req.params.id)
    const car = cars.find((car) => car.id === carId)
    
    // Check if car exists
    if(!car){
        return res.status(404).json({ message: 'Car not found' })
    }
    
    // Extract update data from request body
    const { make, model, year, price } = req.body
    
    // Partial update: only update fields that are provided
    // undefined check allows optional fields (client can send only changed fields)
    if (make !== undefined) car.make = make
    if (model !== undefined) car.model = model
    if (year !== undefined) car.year = Number(year)
    if (price !== undefined) car.price = Number(price)
    
    // Return updated car (200 = OK by default)
    res.json(car)
})

// DELETE /api/v1/cars/:id - Delete a car by ID
app.delete('/api/v1/cars/:id', (req, res) => {
    const carId = Number(req.params.id)
    const car = cars.find((car) => car.id === carId)
    
    if(!car){
        return res.status(404).json({ message: 'Car not found' })
    }
    
    // Spread operator creates a copy (so we can return it after deletion)
    const deletedCar = { ...car }
    
    // Array.filter() creates new array with items that pass the test
    // Keep all cars EXCEPT the one being deleted
    cars = cars.filter((car) => car.id !== carId)
    
    // Return confirmation with deleted car data
    res.json({ message: 'Car deleted successfully', car: deletedCar })
})

// Mount router: all router routes are prefixed with '/api/v1/cars'
// Example: router.get('/') becomes accessible at /api/v1/cars/
app.use('/api/v1/cars', router)

// Start the server and listen for incoming HTTP requests
// Callback runs once when server successfully starts
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
