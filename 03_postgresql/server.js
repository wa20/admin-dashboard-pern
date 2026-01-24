import express from "express"
import { db } from "./db.js"
import { cars } from "./schema.js"
import { eq } from "drizzle-orm"


const app = express()
const PORT = 3000
const router = express.Router()

app.use(express.json())


app.use((req, res, next) => {
   const timestamp = new Date().toISOString();
 
   console.log(`[${timestamp}] ${req.method} ${req.url}`) 
   next()
})
 

// CRUD Routes

app.get('/api/v1/cars', async (req, res) => {

    const allCars = await db.select().from(cars)
    res.json(allCars)
})


app.get('/api/v1/cars/:id', async (req, res) => {

    const selectedCar = await db.select().from(cars)
    .where(eq(cars.id, Number(req.params.id)))

    if(!selectedCar){
        return res.status(404).json({ message: 'Car not found' })
    }

    res.json(selectedCar);

})
 

app.post('/api/v1/cars', async (req, res) => { 
    const { make, model, year, price } = req.body
    
    // Validate required fields
    if (!make || !model || !year || !price) {
        return res.status(400).json({ 
            message: 'Missing required fields: make, model, year, and price are required' 
        })
    }

    const [newCar] = await db.insert(cars)
    .values({ make, model, year, price })
    .returning();
    
    
    res.status(201).json(newCar)
})


app.put('/api/v1/cars/:id', async (req, res) => {
    const { make, model, year, price } = req.body

     // Update only the fields that are provided (partial update)
    const updateCar = {};
    if (make !== undefined) updateCar.make = make
    if (model !== undefined) updateCar.model = model
    if (year !== undefined) updateCar.year = Number(year)
    if (price !== undefined) updateCar.price = Number(price)

    const selectedCar = await db.select()
    .from(cars)
    .where(eq(cars.id, Number(req.params.id)))
   
    
    if(!selectedCar || updateCar.length === 0){
        return res.status(404).json({ message: 'Car not found' })
    }

    const updatedCar = await db.update(cars)
    .set(updateCar)
    .where(eq(cars.id, Number(req.params.id)))
    .returning();
   
    
    // Return the updated car
    res.json(updatedCar)
})

app.delete('/api/v1/cars/:id', async (req, res) => {
    const selectedCar = await db.select()
    .from(cars)
    .where(eq(cars.id, Number(req.params.id)))
    
    if(!selectedCar){
        return res.status(404).json({ message: 'Car not found' })
    }
    
    const deletedCar = await db.delete(cars)
    .where(eq(cars.id, Number(req.params.id)))
    .returning();
    
    // Return the deleted car for confirmation
    res.json({ message: 'Car deleted successfully', car: deletedCar })
})

app.use('/api/v1/cars', router)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
