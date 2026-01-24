import express from "express"

const app = express()
const PORT = 3000
const router = express.Router()

app.use(express.json())


app.use((req, res, next) => {
   const timestamp = new Date().toISOString();
 
   console.log(`[${timestamp}] ${req.method} ${req.url}`) 
   next()
})

 


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


app.get("/", (req, res) => {
    res.send("<h1>Hello World, pretending  to be a server using express</h1>")
}) 

app.get('/api/v1/cars', (req, res) => {
    res.json(cars)
})


app.get('/api/v1/cars/:id', (req, res) => {

    const carId = Number(req.params.id)

    const car = cars.find((car) => car.id === carId)

    if(!car){
        return res.status(404).json({ message: 'Car not found' })
    }

    res.json(car);

})
 

app.post('/api/v1/cars', (req, res) => { 
    const { make, model, year, price } = req.body
    
    // Validate required fields
    if (!make || !model || !year || !price) {
        return res.status(400).json({ 
            message: 'Missing required fields: make, model, year, and price are required' 
        })
    }
    
    // Generate new ID (highest existing ID + 1)
    const newId = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1
    
    const newCar = {
        id: newId,
        make,
        model,
        year: Number(year),
        price: Number(price)
    }
    
    cars.push(newCar)
    res.status(201).json(newCar)
})


app.put('/api/v1/cars/:id', (req, res) => {
    const carId = Number(req.params.id)
    const car = cars.find((car) => car.id === carId)
    
    if(!car){
        return res.status(404).json({ message: 'Car not found' })
    }
    
    const { make, model, year, price } = req.body
    
    // Update only the fields that are provided (partial update)
    if (make !== undefined) car.make = make
    if (model !== undefined) car.model = model
    if (year !== undefined) car.year = Number(year)
    if (price !== undefined) car.price = Number(price)
    
    // Return the updated car
    res.json(car)
})

app.delete('/api/v1/cars/:id', (req, res) => {
    const carId = Number(req.params.id)
    const car = cars.find((car) => car.id === carId)
    
    if(!car){
        return res.status(404).json({ message: 'Car not found' })
    }
    
    // Store the car to return before deleting
    const deletedCar = { ...car }
    
    // Remove the car from the array
    cars = cars.filter((car) => car.id !== carId)
    
    // Return the deleted car for confirmation
    res.json({ message: 'Car deleted successfully', car: deletedCar })
})

app.use('/api/v1/cars', router)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
