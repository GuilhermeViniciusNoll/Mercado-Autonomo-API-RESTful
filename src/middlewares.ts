import { product } from "./interfaces"
import { dataBase } from "./database"
import { Request, Response, NextFunction } from "express"

const idValidator = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const objSelect: product | undefined = dataBase.find((prod) => prod.id == Number(id))
    const index: number = dataBase.findIndex((prod) => prod.id == Number(id))

    if (objSelect === undefined) {
        return res.status(404).json({ "message": "Product not found." })
    }

    res.locals = { objSelect, index }
    next()
}

const uniqueName = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body
    const objSelect: product | undefined = dataBase.find((prod) => prod.name == name)
    if (objSelect != undefined) {
        return res.status(409).json({ "message": "Product already registered." })
    }
    next()
}

export default { idValidator, uniqueName }