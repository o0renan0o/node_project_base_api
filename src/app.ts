import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan';
import user_controller from '@controllers/user'
import products_controller from '@controllers/products'

class App {
    public app: express.Application
    private Router;

    public constructor() {
        this.app = express()
        this.Router = express.Router()

        App.dataBase()
        this.middleware()
        this.routes()
    }

    private middleware(): void {
        this.app
            .use(this.Router)
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
        this.Router
            .get('/user/:user_id', (req, res, next) => user_controller.get_one(req, res, next))
            .get('/users', (req, res, next) =>  user_controller.list_all(req, res, next))
            .post('/user', (req, res, next) =>  user_controller.sign_up(req, res, next))
            .delete('/user/:user_id', (req, res, next) =>  user_controller.unsubscribe(req, res, next))

        this.Router
            .get('/product/:product_id', (req, res, next) => products_controller.get_one(req, res, next))
            .get('/products', (req, res, next) =>  products_controller.list_all(req, res, next))
            .post('/product', (req, res, next) =>  products_controller.sign_up(req, res, next))
            .delete('/product/product_id', (req, res, next) =>  products_controller.unsubscribe(req, res, next))
    }
}

export default new App().app;