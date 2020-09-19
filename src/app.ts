import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from "morgan";

class App {
    public express: express.Application

    public constructor() {
        this.express = express()

        App.dataBase()
        this.middlewares()
        this.routes()
    }

    private middlewares(): void {
        this.express
            .use(express.json())
            .use(cors())
            .use(express.urlencoded({extended: false}))
            .use(morgan('dev'));
    }

    private static dataBase(): void {
        mongoose.connect('mongodb://localhost:27017/api', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    private routes(): void {
        this.express.get('/', (req, res) => {
            res.json({message: "Hi !"})
        })
    }
}

export default new App().express;