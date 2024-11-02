import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';

@Entity('images_products') // Cambia esto al nombre de la tabla existente en la base de datos
export class ImageProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product!: Product;

  @Column({ length: 255 })
  imageUrl!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
