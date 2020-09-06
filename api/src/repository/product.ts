import { EntityRepository, Repository } from "typeorm";
import { Product } from "../models/Product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

  public async addToAvailability(productItemId: number){
    await this.query(
      "UPDATE product p " +
      "INNER JOIN product_item pi ON p.id = pi.productId " +
      "SET p.availability = p.availability + pi.amount " +
      `WHERE pi.id=${productItemId};`);
  }
}