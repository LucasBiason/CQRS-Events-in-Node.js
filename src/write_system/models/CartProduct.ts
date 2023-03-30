const { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } = require("typeorm");
import Cart from "./Cart";
import Product from "./Product";

@Entity("cart_product")
export default class CartProduct {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Cart, (cart: Cart) => cart.products, {eager: true})
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Product, (product: Product) => product.carts, {eager: true})
  @JoinColumn()
  product: Product;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number = 0;

  @Column()
  quantity: number = 0;

  toPlainJSON(): {} {
    return {
      "id": this.product.id,
      "name": this.product.name,
      "price": this.price,
      "quantity": this.quantity
    }
  }

}
