import {EntityRepository, Repository} from "typeorm";
import {ProductItem} from "../models/ProductItem"
import shoppingCart from "../services/shoppingCart";

@EntityRepository(ProductItem)
export class ProductItemRepository extends Repository<ProductItem> {

    public async findByProductIdAndShoppingCartId(productId: number, shoppingCartId: number): Promise<ProductItem>{
      return <ProductItem>await this.createQueryBuilder().select("product_item").from(ProductItem, "product_item")
      .innerJoinAndSelect("product_item.product", "product")
      .innerJoinAndSelect("product_item.shoppingCart", "shoppingCart")
      .where("product.id = :productId", {productId})
      .andWhere("shoppingCart.userId = :shoppingCartId", {shoppingCartId})
      .getOne();
    }

}