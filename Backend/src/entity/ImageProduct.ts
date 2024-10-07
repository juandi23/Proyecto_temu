import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Product } from './Product'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@Entity()
export class ImageProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.images)
  product!: Product;

  @Column({ length: 255 })
  imageUrl!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
