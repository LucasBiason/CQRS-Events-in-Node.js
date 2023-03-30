import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("product")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  color: string;

  @Column()
  active: boolean;

  toJSON(): {}{
    return {
      "id": this.id,
      "name": this.name,
      "color": this.color,
      "active": this.active
    }
  }
}
