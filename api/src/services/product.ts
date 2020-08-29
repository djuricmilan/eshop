import { getRepository } from "typeorm";
import { Product } from "../models/Product";
import { CustomProductResponseLazy, CustomProductResponse } from "../dto/product";

class ProductService{
  public async getAll(quantity: any, chunkIndex: any, categoryNames: string[], lowerPrice: any, upperPrice: any): Promise<CustomProductResponseLazy>{
    const productRepository = getRepository(Product);
    try{
      const retval = await productRepository.find({relations: ['categories']});
      let filtered = retval
        .filter(x => x.categories.map(y => y.name).filter(y => categoryNames.indexOf(y) != -1).length != 0
                    && x.price >= parseInt(lowerPrice, 10) && x.price <= parseInt(upperPrice, 10))
        .sort((a: any, b: any) => a.id - b.id);
      let amount = filtered.length;
      filtered = filtered.slice(chunkIndex * quantity, (chunkIndex + 1) * quantity);

      return {
        success: true,
        status: 200,
        products: filtered,
        amount,
        chunkIndex
      };
    }catch(error){
      return {
        success: false,
        status: 500
      };
    }
  }

  public async getMaxPrice(): Promise<number>{
    const productRepository = getRepository(Product);
    try{
      const products = await productRepository.find({});
      let maxPrice = 0;
      for(let product of products){
        if(product.price > maxPrice)
          maxPrice = product.price;
      }
      return maxPrice;
    }catch(error){
      return Promise.reject('Some error occurred...');
    }
  }
}

export default new ProductService();