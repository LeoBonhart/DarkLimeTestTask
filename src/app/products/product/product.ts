export type TProductSize = '50x50' | '80x100' | '100x100';

interface IProductPrice {
  [prop: string]: number;
}

interface IProductSizes {
  [prop: string]: number;
}

export interface IProduct {
  id: string;
  size: TProductSize;
  sizes: Array<TProductSize>;
  image: string;
  prices: IProductPrice;
  price: number;
  description: string;
  name: string;
}

export class Product implements Partial<IProduct>{
  id?: string;
  size?: TProductSize = '100x100';
  sizes?: Array<TProductSize> = ['50x50', '100x100', '80x100']
  image?: string;
  prices?: IProductPrice = {
    '50x50': 1000,
    '100x100': 2000,
    '80x100': 1500
  };
  price?: number = this.prices[this.size];
  description?: string;
  name?: string;

  constructor(data: Partial<IProduct>) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        (this as any)[key] = (data as any)[key];
      }
    }
  }
}
