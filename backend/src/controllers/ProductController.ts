import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Product from '../models/Product';
import ProductDAO from '../DAO/Implementation/ProductDAO';
interface ProductRequest {
    name: string;
}
export default class ProductController {
    productDAO: ProductDAO;

    ProductController(){
        this.productDAO = new ProductDAO();
    }

    async create(request: Request, response: Response) {
        const { name } = request.body;

        const schemaRequest = Yup.object().shape({
            name: Yup.string().required()
        });

        await schemaRequest.validate(request.body, {
            abortEarly: false
        });

        const newProduct = new Product();
        newProduct.name = name;
        const product = this.productDAO.save(newProduct);

        return response.status(201).json(product);
    }
    async addProducts(products: ProductRequest[]) {
        const schemaRequest = Yup.array(
            Yup.object().shape({
                name: Yup.string().required()
            })
        );

        await schemaRequest.validate(products, {
            abortEarly: false
        });
        const productRepository = getRepository(Product);

        const productsToReturn: Product[] = [];

        const productList = products.map((prod) => prod.name);

        for (const name of productList) {
            let product = await productRepository.findOne({ name });
            if (product) {
                productsToReturn.push(product);
            } else {
                const dataProduct = { name }
                const newProduct = productRepository.create(dataProduct);
                product = await productRepository.save(newProduct);
                productsToReturn.push(product);
            }
        }

        return productsToReturn;
    }
    async getAll(request: Request, response: Response) {
        return response.status(201).json(this.productDAO.getAll());
    }

}
