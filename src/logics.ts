import { product } from "./interfaces"
import { dataBase } from "./database"
import { Request, Response } from "express"

const generateID = (): number => {
    if (dataBase.length > 0) {
        const lastID: number = dataBase.reduce((accumulator, data) => accumulator < data.id ? accumulator = data.id : accumulator, 0)
        return lastID + 1
    }
    return 1
}

const listProducts = (req: Request, res: Response): Response => {
    const list: Object = {
        total: dataBase.length,
        products: dataBase
    }
    return res.status(200).json(list)
}

const createProduct = (req: Request, res: Response): Response => {
    const date: Date = new Date()
    const month: number = date.getMonth()
    date.setMonth(month + 12)
    const newProduct: product = {
        id: generateID(),
        ...req.body,
        expirationDate: date
    }
    dataBase.push(newProduct)
    return res.status(201).json(newProduct)
}

const getProduct = (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.objSelect)
}

const deleteProduct = (req: Request, res: Response): Response => {
    const newList = dataBase.splice(res.locals.index, 1)
    return res.status(204).json(newList)
}

const updateProduct = (req: Request, res: Response): Response => {
    const updateProduct: product = {
        ...res.locals.objSelect,
        ...req.body,
    }
    const newList: product[] = dataBase.splice(res.locals.index, 1, updateProduct)
    return res.status(200).json(updateProduct)
}

export default { listProducts, createProduct, getProduct, deleteProduct, updateProduct }