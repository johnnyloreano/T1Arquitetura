import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface ProductRequest {
    name: string;
}

export default {
  async create(request: Request, response: Response) {
    const { name } = request.body;

    const productRepository = getRepository(Product);

    const data = { name };
    const product = productRepository.create(data);

    await productRepository.save(product);

    return response.status(201).json(product);
  },

  async addProducts(products: ProductRequest[]) {
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
  },

}
