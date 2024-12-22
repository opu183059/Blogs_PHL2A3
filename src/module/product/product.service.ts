import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getProduct = async (query: any) => {
  const result = await Product.find(query);
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProduct = async (id: string, data: IProduct) => {
  const result = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
