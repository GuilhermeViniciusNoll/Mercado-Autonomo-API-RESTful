import express, { Application, json } from "express"
import logic from "./logics"
import middleware from "./middlewares"

const app: Application = express()
app.use(json())

app.get("/products", logic.listProducts)
app.post("/products", middleware.uniqueName, logic.createProduct)
app.get("/products/:id", middleware.idValidator, logic.getProduct)
app.delete("/products/:id", middleware.idValidator, logic.deleteProduct)
app.patch("/products/:id", middleware.idValidator, middleware.uniqueName, logic.updateProduct)

app.listen(3000, () => console.log("Server is Running at http://localhost:3000"))
