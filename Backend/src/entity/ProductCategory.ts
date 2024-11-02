import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './Product';
import { Category } from './Category';

@Entity()
export class ProductCategory {
    @PrimaryColumn()
    productId!: number;

    @PrimaryColumn()
    categoryId!: number;

    @ManyToOne(() => Product, (product) => product.category, { onDelete: 'CASCADE' })
    product!: Product;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
    category!: Category;
}
