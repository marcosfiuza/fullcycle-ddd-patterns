import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.use_case";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.use_case";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const createProductUseCase = new CreateProductUseCase(new ProductRepository());

    try {
        const input = {
            name: req.body.name,
            price: req.body.price
        };

        const output = await createProductUseCase.execute(input);

        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const listProductUseCase = new ListProductUseCase(new ProductRepository());

    try {
        const output = await listProductUseCase.execute({});

        res.status(200).send(output.products);
    } catch (err) {
        res.status(500).send(err);
    }
});
