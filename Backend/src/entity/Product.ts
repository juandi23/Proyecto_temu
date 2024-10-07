import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ImageProduct } from './ImageProduct';
import { ProductCategory } from './ProductCategory';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column()
  stock!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => ImageProduct, (imageProduct) => imageProduct.product)
  images!: ImageProduct[];

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
  category!: ProductCategory[];
}
