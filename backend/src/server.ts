import 'dotenv/config'
import express from 'express'
import { camaRouter } from './routes/cama.routes.js'


const app = express()
const porta = process.env.PORT

app.use(express.json())
app.use('/camas', camaRouter)



app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})

