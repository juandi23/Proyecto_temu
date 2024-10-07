import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Task } from './entity/Task';
import { Product } from './entity/Product';
import { Category } from './entity/Category';
import { ProductCategory } from './entity/ProductCategory';
import { ImageProduct } from './entity/ImageProduct';

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'bephg2if4g8gbppc2nhs-mysql.services.clever-cloud.com',
    port: 3306,
    username: 'umapmjjpo05rivsq',
    password: 'sY0CFEqY8xGmZQFXVbOM',
    database: 'bephg2if4g8gbppc2nhs',
    entities: [User, Task, Product, ProductCategory, ImageProduct,Category],
    migrations: ['src/migration/*.ts'],
    synchronize: false,
});
