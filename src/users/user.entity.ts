import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Provider } from "../common/types/provider";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: string;

  @Column({ nullable: false })
  provider: Provider;

  @Column({ nullable: false })
  providerId: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name?: string;

  @Column({ nullable: true })
  roles?: string[];


  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
