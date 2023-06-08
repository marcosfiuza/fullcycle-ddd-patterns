import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.use_case";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const input = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };

        const output = await createCustomerUseCase.execute(input);

        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
