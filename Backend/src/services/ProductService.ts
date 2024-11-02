// ProductService.ts
import { dataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product';
import { ImageProduct } from '../entity/ImageProduct';
import { ProductCategory } from '../entity/ProductCategory';

class ProductService {
    private productRepository: Repository<Product>;
    private imageProductRepository: Repository<ImageProduct>;
    private productCategoryRepository: Repository<ProductCategory>;

    constructor() {
        this.productRepository = dataSource.getRepository(Product);
        this.imageProductRepository = dataSource.getRepository(ImageProduct);
        this.productCategoryRepository = dataSource.getRepository(ProductCategory);
    }

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(productData);
        return await this.productRepository.save(newProduct);
    }

    async createProducts(productsData: Partial<Product>[]): Promise<Product[]> {
        const newProducts = this.productRepository.create(productsData);
        return await this.productRepository.save(newProducts);
    }

    async getProducts(page: number, pageSize: number): Promise<{ data: Product[], total: number }> {
        const [products, total] = await this.productRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
            relations: ["images", "category"]
        });

        // Añadir la URL completa para cada imagen de producto
        const productsWithImageUrls = products.map(product => ({
            ...product,
            images: product.images.map(image => ({
                ...image,
                imageUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}${image.imageUrl}`
            })),
        }));

        return { data: productsWithImageUrls, total };
    }

    async getProductById(id: number): Promise<Product | null> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ["images", "category"]
        });

        // Añadir la URL completa para cada imagen del producto si existe
        if (product) {
            return {
                ...product,
                images: product.images.map(image => ({
                    ...image,
                    imageUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}${image.imageUrl}`
                })),
            };
        }

        return null;
    }

    async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
        const product = await this.getProductById(id);
        if (!product) return null;

        Object.assign(product, productData);
        return await this.productRepository.save(product);
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result = await this.productRepository.delete(id);
        return result.affected !== 0;
    }
}

export const productService = new ProductService();