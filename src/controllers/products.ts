import express from 'express'
import {NextFunction, Request, Response} from "express";


class Products {
    sign_up = (req: Request, res: Response, next: NextFunction) => {
        console.log("Hi");
    }
    unsubscribe = (req: Request, res: Response, next: NextFunction) => {
        console.log("Hi");
    }
    list_all = (req: Request, res: Response, next: NextFunction) => {
        console.log("Hi");
    }
    get_one = (req: Request, res: Response, next: NextFunction) => {
        console.log("Hi");
    }
}

export default new Products()

// module User {
//
//     export function sign_up() {
//         console.log("Hi");
//     }
//     export function unsubscribe() {
//         console.log("Hi");
//     }
//     export function list_all() {
//         console.log("Hi");
//     }
//     export function get_one() {
//         console.log("Hi");
//     }
//
// }
//
// export default User
//
// let sign_up = () => {
//
// }
// let unsubscribe = () => {
//
// }
// let list_all = () => {
//
// }
// let get_one = () => {
//
// }
//
//
// module.exports = {
//     sign_up,
//     unsubscribe,
//     list_all,
//     get_one
// }