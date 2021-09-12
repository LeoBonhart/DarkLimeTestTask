export type TProductSize = '50x50' | '80x100' | '100x100';

interface IProductPrice {
  [prop: string]: number;
}

export interface IProduct {
  id: string;
  size: TProductSize;
  image: string;
  price: IProductPrice;
  description: string;
  name: string;
}

export class Product implements Partial<IProduct>{
  id?: string;
  size?: TProductSize = '100x100';
  image?: string;
  price?: IProductPrice = {
    '50x50': 1000,
    '100x100': 2000,
    '80x100': 1500
  };
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
