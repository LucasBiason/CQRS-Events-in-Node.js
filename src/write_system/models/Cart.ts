const { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} = require("typeorm");
import CartProduct from "./CartProduct";

@Entity("cart")
export default class Cart {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  total: number = 0;

  @OneToMany(() => CartProduct, (product: CartProduct) => product.cart)
  @JoinColumn({ name: "cart", referencedColumnName: "id" })
  products: CartProduct[]

  toJSON(): {}{
    return {
      "id": this.id,
      "products": this.products?.map((product)=> product.toPlainJSON()),
      "total": this.total,
    }
  }

}
