export interface Template {
    loadTemplate: boolean;
    id: number;
    name: string;
    categories: string[];
    description: string;
    overview?: string;
    features?: string[];
    price: string;
    isPaid: boolean;
    hasFreeVersion: boolean;
    image: string;
    freeVersionUrl?: string;
    previewUrl?: string;
    buyUrl?: string;
    tutorialUrl?: string;
  }
  