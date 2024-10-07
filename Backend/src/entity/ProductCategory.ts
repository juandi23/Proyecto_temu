import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './Product'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { Category } from './Category'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.category)
  product!: Product;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;
}
