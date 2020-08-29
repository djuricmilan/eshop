import { ShoppingCartDto } from "../dto/shoppingCart";
import { getRepository, Transaction, TransactionRepository, Repository } from "typeorm";
import { ShoppingCart } from "../models/ShoppingCart";
import { ProductItemPostDto, ProductItemDto } from "../dto/productItem";
import { ProductItem } from "../models/ProductItem";
import { Product } from "../models/Product";
import shoppingCart from "../controllers/shoppingCart";

class ShoppingCartService{
  public async getOne(id: any): Promise<ShoppingCartDto>{
    let shoppingCartRepository = getRepository(ShoppingCart);
    try{
      let shoppingCart: ShoppingCart = await shoppingCartRepository.findOneOrFail(id);
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

  @Transaction()
  public async addProduct(id: any, productItemPostDto: ProductItemPostDto,
      @TransactionRepository(ShoppingCart) shoppingCartRepository: Repository<ShoppingCart>,
      @TransactionRepository(Product) productRepository: Repository<Product>,
      @TransactionRepository(ProductItem) productItemRepository: Repository<ProductItem>): Promise<ProductItemDto>{    
    let productItem: ProductItem = new ProductItem();
    
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
    productRepository.save(product);

    productItem.amount = productItemPostDto.amount;
    productItem.product = product;
    productItemRepository.save(productItem);

    try{
      shoppingCartRepository.createQueryBuilder().relation(ShoppingCart, 'productItems').of(id).add(productItem.id);
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

  @Transaction()
  public async removeProduct(id: any, productItemId: any,
    @TransactionRepository(ShoppingCart) shoppingCartRepository: Repository<ShoppingCart>,
    @TransactionRepository(ProductItem) productItemRepository: Repository<ProductItem>): Promise<ShoppingCartDto>{
    try{
      shoppingCartRepository.createQueryBuilder().relation(ShoppingCart, 'productItems').of(id).remove(productItemId);
      productItemRepository.remove(productItemId);
      return {
        success: true,
        status: 200,
      };
    }catch{
      return{
        success: false,
        status: 404,
        message: 'Shopping cart does not exist'
      };
    }
  }

  @Transaction()
  public async empty(id: any,
      @TransactionRepository(ShoppingCart) shoppingCartRepository: Repository<ShoppingCart>,
      @TransactionRepository(ProductItem) productItemRepository: Repository<ProductItem>): Promise<ShoppingCartDto>{
    try{
      let shoppingCart: ShoppingCart = await shoppingCartRepository.findOneOrFail(id, {relations: ['productItems']});
      shoppingCartRepository.createQueryBuilder().relation(ShoppingCart, 'productItems').of(id).remove(shoppingCart.productItems);
      productItemRepository.remove(shoppingCart.productItems);
      return {
        success: true,
        status: 200
      };
    }catch{
      return{
        success: false,
        status: 404,
        message: 'Shopping cart does not exist'
      }
    }
  }
}

export default new ShoppingCartService();