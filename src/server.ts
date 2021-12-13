import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { userRoutes } from './routes/userroutes'
import { productRoutes } from './routes/productroutes'
import { orderRoutes } from './routes/orderroutes'
import cors from 'cors';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)

export default app;


