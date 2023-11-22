'use server';

import fs from 'fs';
import {IProduct} from "@/models/IProduct";
export const getProducts = async ():Promise<IProduct[]> => {
    try {
        const file = await fs.readFileSync(process.cwd() + '/src/api/products.json', 'utf8');
        const data = JSON.parse(file);
        return data
    } catch (err) {
       throw new Error('error')
    }
}

