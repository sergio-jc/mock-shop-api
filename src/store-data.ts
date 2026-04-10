export type CategoryRecord = {
  id: string;
  name: string;
  description: string | null;
};

export type ProductRecord = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: string;
};

export type UserRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastVisit: Date | null;
  createdAt: Date;
};

export type ReviewRecord = {
  id: string;
  title: string;
  comment: string | null;
  rating: number;
  userId: string;
  productId: string;
  createdAt: Date;
};

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export type OrderRecord = {
  id: string;
  userId: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItemRecord = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
};

export const CATEGORIES: CategoryRecord[] = [
  { id: '1', name: 'audio', description: 'Dispositivos de audio y sonido' },
  {
    id: '2',
    name: 'perifericos',
    description: 'Teclados, ratones y accesorios',
  },
  { id: '3', name: 'monitores', description: 'Pantallas y displays' },
  {
    id: '4',
    name: 'accesorios',
    description: 'Cables, adaptadores y complementos',
  },
];

export const PRODUCTS: ProductRecord[] = [
  {
    id: '1',
    name: 'Auriculares Bluetooth',
    description: 'Cancelacion de ruido, 30h de bateria',
    price: 79.99,
    stock: 42,
    imageUrl: 'https://picsum.photos/seed/headphones/800/600',
    categoryId: '1',
  },
  {
    id: '2',
    name: 'Teclado mecanico',
    description: 'Switches tactiles, layout ISO',
    price: 119.5,
    stock: 15,
    imageUrl: 'https://picsum.photos/seed/keyboard/800/600',
    categoryId: '2',
  },
  {
    id: '3',
    name: 'Monitor 27 4K',
    description: 'IPS, 60Hz, HDR400',
    price: 349,
    stock: 8,
    imageUrl: 'https://picsum.photos/seed/monitor/800/600',
    categoryId: '3',
  },
  {
    id: '4',
    name: 'Hub USB-C',
    description: '7 en 1: HDMI, USB-A, SD',
    price: 45,
    stock: 100,
    imageUrl: 'https://picsum.photos/seed/hub/800/600',
    categoryId: '4',
  },
];

export const USERS: UserRecord[] = [
  {
    id: '1',
    firstName: 'Sofia',
    lastName: 'Mendoza',
    email: 'sofia@example.com',
    lastVisit: new Date('2026-04-09T16:30:00.000Z'),
    createdAt: new Date('2026-03-01T10:00:00.000Z'),
  },
  {
    id: '2',
    firstName: 'Daniel',
    lastName: 'Rojas',
    email: 'daniel@example.com',
    lastVisit: new Date('2026-04-10T08:12:00.000Z'),
    createdAt: new Date('2026-03-10T09:20:00.000Z'),
  },
];

export const REVIEWS: ReviewRecord[] = [
  {
    id: '1',
    title: 'Muy buena calidad',
    comment: 'Comodos y con excelente sonido.',
    rating: 5,
    userId: '1',
    productId: '1',
    createdAt: new Date('2026-04-05T11:00:00.000Z'),
  },
  {
    id: '2',
    title: 'Buen teclado',
    comment: 'Buena respuesta, algo ruidoso.',
    rating: 4,
    userId: '2',
    productId: '2',
    createdAt: new Date('2026-04-06T18:40:00.000Z'),
  },
  {
    id: '3',
    title: 'Imagen nitida',
    comment: null,
    rating: 5,
    userId: '1',
    productId: '3',
    createdAt: new Date('2026-04-07T13:25:00.000Z'),
  },
];

export const ORDERS: OrderRecord[] = [
  {
    id: '1',
    userId: '1',
    status: OrderStatus.COMPLETED,
    createdAt: new Date('2026-04-01T10:00:00.000Z'),
    updatedAt: new Date('2026-04-02T12:30:00.000Z'),
  },
  {
    id: '2',
    userId: '2',
    status: OrderStatus.PROCESSING,
    createdAt: new Date('2026-04-09T09:15:00.000Z'),
    updatedAt: new Date('2026-04-10T09:00:00.000Z'),
  },
];

export const ORDER_ITEMS: OrderItemRecord[] = [
  { id: '1', orderId: '1', productId: '1', quantity: 1, unitPrice: 79.99 },
  { id: '2', orderId: '1', productId: '4', quantity: 2, unitPrice: 45 },
  { id: '3', orderId: '2', productId: '2', quantity: 1, unitPrice: 119.5 },
];
