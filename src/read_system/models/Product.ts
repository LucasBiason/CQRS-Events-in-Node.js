import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("product")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100
  })
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  toJSON(): {}{
    return {
      "id": this.id,
      "name": this.name,
      "price": this.price
    }
  }
}
