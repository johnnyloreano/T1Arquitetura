import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Product from '../models/Product';
import ProductDAO from '../DAO/Implementation/ProductDao';
interface ProductRequest {
    name: string;
}
export default class ProductController {
    productDAO: ProductDAO;
    private static instance: ProductController;
    private constructor() {
        this.productDAO = new ProductDAO();
    }
    public static getInstance(): ProductController {
        if (!ProductController.instance)
            ProductController.instance = new ProductController();
        return ProductController.instance;
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
        const product = await ProductController.instance.productDAO.save(newProduct);

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
        console.log(productList);


        for (const name of productList) {
            let product = await ProductController.getInstance().productDAO.getByName({ name });
            if (product) {
                productsToReturn.push(product);
            } else {
                const newProduct = new Product()
                newProduct.name = name
                product = await ProductController.getInstance().productDAO.save(newProduct);
                productsToReturn.push(product);
            }
        }
        return productsToReturn;
    }
    async getAll(request: Request, response: Response) {
        return response.status(201).json( await ProductController.instance.productDAO.getAll());
    }

}
