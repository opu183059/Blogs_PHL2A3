import { Request, Response } from "express";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await productService.createProduct(payload);
    res.json({
      message: "Product created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: "Product Creation failed",
      success: false,
      error,
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.params.query;
    const query: string | {} = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { brand: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const result = await productService.getProduct(query);
    res.json({
      message: "Products retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: "Cannot find the products, try again",
      status: false,
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProduct(productId);
    res.json({
      message: "Products retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: "Cannot find the products, try again",
      status: false,
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await productService.updateProduct(productId, body);

    res.send({
      status: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error in updating",
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.deleteProduct(productId);
    res.send({
      status: true,
      message: "Product deleted successfully",
      data: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error in deleting the product",
      error,
    });
  }
};

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
