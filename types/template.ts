export interface Template {
    id: number;
    name: string;
    price: string;
    categories: string[];
    description: string;
    image: string;
    hasFreeVersion: boolean;
    isPaid: boolean;
    previewUrl?: string;
    buyUrl?: string;
    freeVersionUrl?: string;
    tutorialUrl?: string;
    overview?: string;
    features?: string[];
  }