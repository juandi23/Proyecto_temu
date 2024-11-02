import { Request, Response } from 'express';
import { dataSource } from '../../data-source';
import { Product } from '../../entity/Product';
import { ImageProduct } from '../../entity/ImageProduct';
import multer from 'multer';
import path from 'path';

// Configuración de multer para cargar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads/')); // Ajusta la ruta usando path.join
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Controlador para cargar una imagen
export const uploadImage = [
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }

    try {
      const product = await dataSource.getRepository(Product).findOneBy({ id: parseInt(productId) });

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      const newImage = new ImageProduct();
      newImage.product = product;
      newImage.imageUrl = `${process.env.SERVER_URL || 'http://localhost:5000'}/uploads/${imageFile.filename}`;
      await dataSource.getRepository(ImageProduct).save(newImage);

      return res.status(201).json(newImage);
    } catch (error) {
      return res.status(500).json({ message: 'Error al guardar la imagen', error });
    }
  }
];
// Controlador para obtener imágenes de un producto
export const getProductImages = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await dataSource.getRepository(Product).findOneBy({ id: parseInt(productId) });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const images = await dataSource.getRepository(ImageProduct).find({
      where: { product: product }
    });

    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las imágenes', error });
  }
};

// Controlador para eliminar una imagen
export const deleteImage = async (req: Request, res: Response) => {
  const { imageId } = req.params;

  try {
    const image = await dataSource.getRepository(ImageProduct).findOneBy({ id: parseInt(imageId) });

    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    await dataSource.getRepository(ImageProduct).remove(image);
    return res.status(200).json({ message: 'Imagen eliminada exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la imagen', error });
  }
};
