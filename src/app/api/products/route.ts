import fs from 'fs';
import {IProduct} from "@/models/IProduct";

export async function GET() {
    try {
        const file = await fs.readFileSync(process.cwd() + '/src/app/api/products/products.json', 'utf8');
        const data = JSON.parse(file);
        return Response.json(data)
    }
    catch {
        return Response.json([])
    }
}

