const { Entity, PrimaryGeneratedColumn, Column, OneToMany } = require("typeorm");
import CartProduct from "./CartProduct";

@Entity("product")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100
  })
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number = 0;

  @OneToMany(() => CartProduct, (product: CartProduct) => product.product)
  carts: CartProduct[]

  toJSON(): {}{
    return {
      "id": this.id,
      "name": this.name,
      "price": this.price,
    }
  }
}
