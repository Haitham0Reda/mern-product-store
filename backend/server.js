import express from 'express'
import { connectDB } from './config/db.js';

import path from 'path';

import productRoutes from './routes/product.routes.js'

const app = express();

const PORT = process.env.PORT || 7000

const __dirname = path.resolve();


app.use(express.json());

app.use('/api/products', productRoutes)

if (process.env.NODE_ENV === "production") {   //NODE_ENV=production
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(9000, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`)
})


