export interface IProduct {
    name: string,
    productCode: number,
    price: number,
    image: string,
    currency: 'USD' | 'UAH',
    qty: number
}
