export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
  ownerId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  socials: {
    x?: string;
    instagram?: string;
    github?: string;
    youtube?: string;
    facebook?: string;
  };
}

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Retro Bluetooth Speaker',
    description: 'A vintage-inspired speaker with modern tech. Stream your favorite playlists with crystal-clear sound.',
    price: 89.99,
    imageUrl: 'https://placehold.co/600x400.png',
    likes: 120,
    comments: 15,
    isBookmarked: false,
    ownerId: 'user_1',
  },
  {
    id: 'prod_2',
    name: 'Minimalist Desk Lamp',
    description: 'Sleek and modern LED desk lamp, perfect for late-night work sessions. Adjustable brightness.',
    price: 45.50,
    imageUrl: 'https://placehold.co/600x400.png',
    likes: 250,
    comments: 32,
    isBookmarked: true,
    ownerId: 'user_2',
  },
  {
    id: 'prod_3',
    name: 'Smart Water Bottle',
    description: 'Hydrate smarter. This bottle tracks your water intake and glows to remind you to drink.',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x400.png',
    likes: 500,
    comments: 78,
    isBookmarked: false,
    ownerId: 'user_3',
  },
  {
    id: 'prod_4',
    name: 'Ergonomic Keyboard',
    description: 'Type in comfort for hours. Split design helps reduce wrist strain. For the professional coder.',
    price: 135.00,
    imageUrl: 'https://placehold.co/600x400.png',
    likes: 180,
    comments: 41,
    isBookmarked: true,
    ownerId: 'user_1',
  },
  {
    id: 'prod_5',
    name: 'Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound. World-class noise cancellation, high-fidelity audio, and plush comfort.',
    price: 299.99,
    imageUrl: 'https://placehold.co/600x400.png',
    likes: 890,
    comments: 150,
    isBookmarked: false,
    ownerId: 'user_2',
  },
  {
    id: 'prod_6',
    name: 'Portable Espresso Maker',
    description: 'Enjoy delicious espresso anywhere. Compact, lightweight, and easy to use on the go.',
    price: 54.95,
    imageUrl: 'https://placehold.co/600x400.png',
    likes: 310,
    comments: 55,
    isBookmarked: false,
    ownerId: 'user_3',
  },
];

export const users: User[] = [
  {
    id: 'user_1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    bio: 'Software engineer and tech enthusiast. I love building cool stuff with code and exploring the latest gadgets. My setup is always evolving.',
    avatarUrl: 'https://placehold.co/128x128.png',
    socials: {
      x: 'https://twitter.com/alexj',
      github: 'https://github.com/alexj',
    },
  },
  {
    id: 'user_2',
    name: 'Samantha Bee',
    email: 'sam.b@example.com',
    bio: 'Designer, photographer, and world traveler. Capturing moments and creating beautiful, user-friendly designs is my passion.',
    avatarUrl: 'https://placehold.co/128x128.png',
    socials: {
      instagram: 'https://instagram.com/sambee',
      youtube: 'https://youtube.com/sambee',
    },
  },
  {
    id: 'user_3',
    name: 'Chris Lee',
    email: 'chris.l@example.com',
    bio: 'Fitness coach and bio-hacker. Always looking for ways to optimize health, performance, and daily routines.',
    avatarUrl: 'https://placehold.co/128x128.png',
    socials: {
      x: 'https://twitter.com/chrisl',
      facebook: 'https://facebook.com/chrisl',
    },
  },
];
