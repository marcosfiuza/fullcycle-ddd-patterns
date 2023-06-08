import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.use_case";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.use_case";

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

customerRoute.get("/", async (req: Request, res: Response) => {
    const listCustomerUseCase = new ListCustomerUseCase(new CustomerRepository());

    try {
        const output = await listCustomerUseCase.execute({});

        res.status(200).send(output.customers);
    } catch (err) {
        res.status(500).send(err);
    }
});
