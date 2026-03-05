export type MilkType = 'Whole' | 'Oat' | 'Almond';
export type SizeType = 'Small' | 'Medium' | 'Large';
export type TempType = 'Hot' | 'Iced';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  categoryId: string;
  hasMilkOption: boolean;
  hasTempOption: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  image: string;
  description: string;
  items: MenuItem[];
}

export const SIZE_ADJUSTMENTS: Record<SizeType, number> = {
  Small: -20,
  Medium: 0,
  Large: 30,
};

export const MILK_ADJUSTMENTS: Record<MilkType, number> = {
  Whole: 0,
  Oat: 20,
  Almond: 30,
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'hot-beverages',
    name: 'Hot Beverages',
    image: '/images/hot-beverages.png',
    description: 'Wide range of steaming hot coffee to make you fresh and light.',
    items: [
      { id: 'hb-1', name: 'Espresso', description: 'Rich, bold shot of pure coffee perfection.', basePrice: 150, image: '/images/hot-beverages.png', categoryId: 'hot-beverages', hasMilkOption: true, hasTempOption: true },
      { id: 'hb-2', name: 'Cappuccino', description: 'Espresso topped with velvety foamed milk.', basePrice: 180, image: '/images/hot-beverages.png', categoryId: 'hot-beverages', hasMilkOption: true, hasTempOption: true },
      { id: 'hb-3', name: 'Latte', description: 'Smooth espresso with creamy steamed milk.', basePrice: 200, image: '/images/hot-beverages.png', categoryId: 'hot-beverages', hasMilkOption: true, hasTempOption: true },
      { id: 'hb-4', name: 'Americano', description: 'Espresso diluted with hot water for a mellow brew.', basePrice: 160, image: '/images/hot-beverages.png', categoryId: 'hot-beverages', hasMilkOption: false, hasTempOption: true },
      { id: 'hb-5', name: 'Mocha', description: 'Coffee meets chocolate in this indulgent blend.', basePrice: 220, image: '/images/hot-beverages.png', categoryId: 'hot-beverages', hasMilkOption: true, hasTempOption: true },
    ],
  },
  {
    id: 'cold-beverages',
    name: 'Cold Beverages',
    image: '/images/cold-beverages.png',
    description: 'Creamy and frothy cold coffee to make you cool.',
    items: [
      { id: 'cb-1', name: 'Cold Brew', description: 'Slow-steeped for a smooth, low-acid cold coffee.', basePrice: 200, image: '/images/cold-beverages.png', categoryId: 'cold-beverages', hasMilkOption: true, hasTempOption: false },
      { id: 'cb-2', name: 'Iced Latte', description: 'Chilled espresso with cold milk over ice.', basePrice: 220, image: '/images/cold-beverages.png', categoryId: 'cold-beverages', hasMilkOption: true, hasTempOption: false },
      { id: 'cb-3', name: 'Frappuccino', description: 'Blended iced coffee with creamy whipped top.', basePrice: 250, image: '/images/cold-beverages.png', categoryId: 'cold-beverages', hasMilkOption: true, hasTempOption: false },
      { id: 'cb-4', name: 'Iced Mocha', description: 'Chocolate and coffee bliss over crushed ice.', basePrice: 240, image: '/images/cold-beverages.png', categoryId: 'cold-beverages', hasMilkOption: true, hasTempOption: false },
    ],
  },
  {
    id: 'refreshments',
    name: 'Refreshments',
    image: '/images/refreshment.png',
    description: 'Fruit and icy refreshing drinks to make you feel refreshed.',
    items: [
      { id: 'rf-1', name: 'Lemonade', description: 'Tangy-sweet freshly squeezed lemon delight.', basePrice: 120, image: '/images/refreshment.png', categoryId: 'refreshments', hasMilkOption: false, hasTempOption: false },
      { id: 'rf-2', name: 'Watermelon Cooler', description: 'Sweet blended watermelon with a hint of mint.', basePrice: 130, image: '/images/refreshment.png', categoryId: 'refreshments', hasMilkOption: false, hasTempOption: false },
      { id: 'rf-3', name: 'Mango Smoothie', description: 'Thick, tropical Alphonso mango smoothie.', basePrice: 160, image: '/images/refreshment.png', categoryId: 'refreshments', hasMilkOption: false, hasTempOption: false },
      { id: 'rf-4', name: 'Green Tea Cooler', description: 'Iced matcha green tea with honey and lime.', basePrice: 140, image: '/images/refreshment.png', categoryId: 'refreshments', hasMilkOption: false, hasTempOption: false },
    ],
  },
  {
    id: 'special-combo',
    name: 'Special Combo',
    image: '/images/special-combo.png',
    description: 'Your favourite eating and drinking combinations.',
    items: [
      { id: 'sc-1', name: 'Coffee + Sandwich', description: 'Classic espresso paired with a gourmet sandwich.', basePrice: 320, image: '/images/special-combo.png', categoryId: 'special-combo', hasMilkOption: true, hasTempOption: true },
      { id: 'sc-2', name: 'Coffee + Muffin', description: 'Warm brew with a fluffy freshly baked muffin.', basePrice: 280, image: '/images/special-combo.png', categoryId: 'special-combo', hasMilkOption: true, hasTempOption: true },
      { id: 'sc-3', name: 'Cold Brew + Brownie', description: 'Smooth cold brew and rich fudgy brownie duo.', basePrice: 300, image: '/images/special-combo.png', categoryId: 'special-combo', hasMilkOption: false, hasTempOption: false },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: '/images/desserts.png',
    description: 'Satiate your palate and take you on a culinary treat.',
    items: [
      { id: 'ds-1', name: 'Chocolate Brownie', description: 'Dense, fudgy with a crinkled top and rich cocoa.', basePrice: 160, image: '/images/desserts.png', categoryId: 'desserts', hasMilkOption: false, hasTempOption: false },
      { id: 'ds-2', name: 'Cheesecake', description: 'Classic New York-style with a buttery biscuit base.', basePrice: 200, image: '/images/desserts.png', categoryId: 'desserts', hasMilkOption: false, hasTempOption: false },
      { id: 'ds-3', name: 'Tiramisu', description: 'Italian classic with espresso-soaked ladyfingers.', basePrice: 220, image: '/images/desserts.png', categoryId: 'desserts', hasMilkOption: false, hasTempOption: false },
      { id: 'ds-4', name: 'Muffin', description: 'Soft, golden blueberry or choco chip muffin.', basePrice: 120, image: '/images/desserts.png', categoryId: 'desserts', hasMilkOption: false, hasTempOption: false },
    ],
  },
  {
    id: 'burger-fries',
    name: 'Burger & Fries',
    image: '/images/burger-frenchfries.png',
    description: 'Quick bites to satisfy your small-size hunger.',
    items: [
      { id: 'bf-1', name: 'Classic Burger', description: 'Juicy beef patty with lettuce, tomato, and cheddar.', basePrice: 250, image: '/images/burger-frenchfries.png', categoryId: 'burger-fries', hasMilkOption: false, hasTempOption: false },
      { id: 'bf-2', name: 'Veg Burger', description: 'Crispy veggie patty with fresh garden toppings.', basePrice: 220, image: '/images/burger-frenchfries.png', categoryId: 'burger-fries', hasMilkOption: false, hasTempOption: false },
      { id: 'bf-3', name: 'Loaded Fries', description: 'Crispy fries topped with cheese sauce and jalapeños.', basePrice: 180, image: '/images/burger-frenchfries.png', categoryId: 'burger-fries', hasMilkOption: false, hasTempOption: false },
      { id: 'bf-4', name: 'Burger + Fries', description: 'The ultimate combo — burger and crispy fries.', basePrice: 320, image: '/images/burger-frenchfries.png', categoryId: 'burger-fries', hasMilkOption: false, hasTempOption: false },
    ],
  },
];
