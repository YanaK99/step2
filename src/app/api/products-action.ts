'use server';

import fs from 'fs';
import {IProduct} from "@/models/IProduct";
export const getProducts = async ():Promise<IProduct[]> => {
    try {
        const path = require('path');
        const file = await fs.readFileSync(path.join(process.cwd(), 'src/app/api/products.json'), 'utf8');
        const data = JSON.parse(file);
        return data
    } catch (err) {
       throw new Error('error')
    }
}

