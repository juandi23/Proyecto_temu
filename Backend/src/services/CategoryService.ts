import { dataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Category } from '../entity/Category';

class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        this.categoryRepository = dataSource.getRepository(Category);
    }

    async createCategory(categoryData: Partial<Category>): Promise<Category> {
        const newCategory = this.categoryRepository.create(categoryData);
        return await this.categoryRepository.save(newCategory);
    }

    async getCategories(page: number, pageSize: number): Promise<{ data: Category[], total: number }> {
        const [data, total] = await this.categoryRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        return { data, total };
    }

    async getCategoryById(id: number): Promise<Category | null> {
        return await this.categoryRepository.findOneBy({ id });
    }

    async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
        const category = await this.getCategoryById(id);
        if (!category) return null;

        Object.assign(category, categoryData);
        return await this.categoryRepository.save(category);
    }

    async deleteCategory(id: number): Promise<boolean> {
        const result = await this.categoryRepository.delete(id);
        return result.affected !== 0;
    }
}

export const categoryService = new CategoryService();
