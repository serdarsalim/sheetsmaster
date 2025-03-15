export interface Template {
    load: boolean;
    id: number;
    name: string;
    categories: string[];
    description: string;
    overview?: string;
    features?: string[];
    price: string;
    isPaid: boolean;
    freeVersion: boolean;
    image: string;
    freeUrl?: string;
    previewUrl?: string;
    buyUrl?: string;
    tutorialUrl?: string;
  }
  