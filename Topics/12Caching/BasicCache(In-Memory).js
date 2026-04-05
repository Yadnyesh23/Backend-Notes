import { promise } from 'bcrypt/promises'
import express from 'express'

const app = express()

const cache = new Map()

// Fake external api call
const fethcWeatherData = async(city) => {
    console.log(`Fecthing weather data...`)
    return new Promise((resolve) => {
        setTimeout((resolve) => {
            resolve({
                city,
                temp : Math.floor(Math.random() * 30)
            })
        }, 1000);
    })
}

// Api request to get weather
app.get('/weather/:city', async(req, res) => {
    const city = req.params
    const key = `weather_${city}`

    // Check if cache hit
    if(cache.has(key)){
        console.log(`Cache Hit...`)
        // If hit, then return the response
        return res.json({
            source:"Cache",
            data:cache.get(key)
        })
    }
    // If cache miss
    console.log(`Cache miss...`);
    //  fetch the data from original api
    const data = await fethcWeatherData(city)

    // Store in cache
    cache.set(key, {data, expiry: Date.now() + 10000}) // Updating the cache .It usually takes key , data and TTl(Time To Live) as a params
    
    // Send response in json
    res.json({
        source : 'api',
        data : data
    })
})

app.listen(3000, () => {
    console.log(`Server listening...`)
})

// Request
//  ↓
// Check cache
//    ↓
// Hit → return fast ⚡
// Miss → API call 🌐 → store → return