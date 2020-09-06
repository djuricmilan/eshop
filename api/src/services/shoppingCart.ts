import { ShoppingCartDto } from "../dto/shoppingCart";
import { getRepository, getConnection } from "typeorm";
import { ShoppingCart } from "../models/ShoppingCart";
import { ProductItemPostDto, ProductItemDto } from "../dto/productItem";
import { ProductItem } from "../models/ProductItem";
import { Product } from "../models/Product";
import { ProductItemRepository } from "../repository/productItem";
import { ProductRepository } from "../repository/product";

class ShoppingCartService{
  public async getOne(id: any): Promise<ShoppingCartDto>{
    console.log(id);
    let shoppingCartRepository = getRepository(ShoppingCart);
    try{
      let shoppingCart: ShoppingCart = await shoppingCartRepository.findOneOrFail(id, {relations: ["productItems", "productItems.product"]});
      return {
        success: true,
        status: 200,
        shoppingCart
      };
    }catch(error){
      return{
        success: false,
        status: 404
      };
    }
  }

  public async addProduct(id: any, productItemPostDto: ProductItemPostDto): Promise<ProductItemDto>{
    return getConnection().transaction(async manager => {
      const shoppingCartRepository = manager.getRepository(ShoppingCart);
      const productRepository = manager.getRepository(Product);
      const productItemRepository = manager.getCustomRepository(ProductItemRepository);

      let product: Product | undefined = 
        await productRepository.createQueryBuilder('product')
          .andWhere('product.id = :id', {id: productItemPostDto.productId})
          .setLock('pessimistic_write').getOne();
      if(!product){
        return{
          success: false,
          status: 404,
          message: 'Product does not exist'
        };
      }
      if(product.availability < productItemPostDto.amount){
        return{
          success: false,
          status: 403,
          message: 'Not enough product instances in our supply!'
        };
      }
      product.availability -= productItemPostDto.amount;
      await productRepository.save(product);
      
      let productItem: ProductItem = await productItemRepository.findByProductIdAndShoppingCartId(productItemPostDto.productId, id);      
      if(!!productItem){
        productItem.amount = productItem.amount + productItemPostDto.amount;
        await productItemRepository.save(productItem);
        return {
          success: true,
          status: 200,
          message: 'OK',
          productItem
        };
      }else{
        productItem = new ProductItem();
        productItem.amount = productItemPostDto.amount;
        productItem.product = product;
        try{
          await productItemRepository.save(productItem);
          await shoppingCartRepository.createQueryBuilder().relation(ShoppingCart, 'productItems').of(id).add(productItem);
          productItem.shoppingCart = await shoppingCartRepository.findOneOrFail(id);
          return {
            success: true,
            status: 200,
            message: 'OK',
            productItem
          };
        }catch{
          return{
            success: false,
            status: 404,
            message: 'Shopping cart does not exist'
          }
        }
      }
    });

  }

  public async removeProduct(id: any, productItemId: any): Promise<ShoppingCartDto>{
    return getConnection().transaction(async manager => {
      const shoppingCartRepository = manager.getRepository(ShoppingCart);
      const productItemRepository = manager.getCustomRepository(ProductItemRepository);
      const productRepository = manager.getCustomRepository(ProductRepository);
      try{
        console.log(productItemId);
        await productRepository.addToAvailability(productItemId);
        await productItemRepository.delete(productItemId);
        const shoppingCart: ShoppingCart = await shoppingCartRepository.findOneOrFail(id, {relations: ["productItems", "productItems.product"]});
        return {
          success: true,
          status: 200,
          shoppingCart
        };
      }catch{
        return{
          success: false,
          status: 404,
          message: 'Shopping cart does not exist'
        };
      }
    });
  }

  public async empty(id: any): Promise<ShoppingCartDto>{
    return getConnection().transaction(async manager => {
      const shoppingCartRepository = manager.getRepository(ShoppingCart);
      const productItemRepository = manager.getCustomRepository(ProductItemRepository);
      const productRepository = manager.getCustomRepository(ProductRepository);
      try{
        let shoppingCart: ShoppingCart = await shoppingCartRepository.findOneOrFail(id, {relations: ['productItems']});
        shoppingCart.productItems.forEach(async x => await productRepository.addToAvailability(x.id));
        await productItemRepository.remove(shoppingCart.productItems);
        shoppingCart = await shoppingCartRepository.findOneOrFail(id, {relations: ['productItems']});
        return {
          success: true,
          status: 200,
          shoppingCart
        };
      }catch{
        return{
          success: false,
          status: 404,
          message: 'Shopping cart does not exist'
        }
      }
    });
  }
}

export default new ShoppingCartService();