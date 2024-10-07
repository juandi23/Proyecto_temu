import { Request, Response } from 'express';
import { categoryService } from '../../services/CategoryService';

export const createCategory = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const result = await categoryService.createCategory(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    try {
        const result = await categoryService.getCategories(page, pageSize);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    try {
        const category = await categoryService.getCategoryById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    try {
        const category = await categoryService.updateCategory(id, req.body);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    try {
        const success = await categoryService.deleteCategory(id);
        if (success) {
            res.status(200).json({ message: 'Category deleted' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
