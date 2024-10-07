import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductCategory } from './ProductCategory'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
  products!: ProductCategory[];
  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}
