import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { User } from '../entities/User';

interface AuthRequest extends Request {
  user?: User;
}

export const getProducts = async (req: AuthRequest, res: Response) => {
  const productRepository = getRepository(Product);
  const products = await productRepository.find({ where: { user: req.user } });
  res.json(products);
};

export const addProduct = async (req: AuthRequest, res: Response) => {
  const { name, price, description } = req.body;
  const productRepository = getRepository(Product);
  const product = productRepository.create({ name, price, description, user: req.user });
  await productRepository.save(product);

  res.status(201).send('Product added');
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const { name, price, description } = req.body;
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ where: { id: parseInt(req.params.id), user: req.user } });

  if (!product) return res.status(404).send('Product not found');

  product.name = name;
  product.price = price;
  product.description = description;
  await productRepository.save(product);

  res.json(product);
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ where: { id: parseInt(req.params.id) } });

  if (!product) return res.status(404).send('Product not found');

  product.deletedAt = new Date();
  await productRepository.save(product);

  res.send('Product deleted');
};
