export type Cart = {
    id: number;
    name: string;
    price: number;
    mrp: number;
    quantity: number;
    items: CartItem[];
};

export type CartItem = {
    id: number;
    name: string;
    price: number;
    mrp: number;
    quantity: number;
    image: string;
};