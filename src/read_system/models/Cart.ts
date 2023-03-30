import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity("cart")
export default class Cart {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  total: number;

  @Column({ type: 'json' })
  products: {};

  toJSON(): {}{
    return {
      "id": this.id,
      "products": this.products,
      "total": this.total,
    }
  }

}
