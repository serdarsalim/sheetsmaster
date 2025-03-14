import { useEffect, useState } from "react";

// 1 Types

export interface Template {
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

//Functions

// Export loadTemplates function so it can be imported elsewhere
export async function loadTemplates(): Promise<Template[]> {
  try {
    // Import PapaParse dynamically to avoid server-side issues
    const Papa = (await import("papaparse")).default;

    const response = await fetch("/data/templates.csv");
    const csvText = await response.text();

    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return data.map((item: any) => ({
      id: parseInt(item.id),
      name: item.name,
      price: item.price,
      categories: item.categories.split(",").map((cat: string) => cat.trim()),
      description: item.description,
      image: item.image,
      hasFreeVersion: item.hasFreeVersion.toLowerCase() === "true",
      isPaid: item.isPaid.toLowerCase() === "true",
      previewUrl: item.previewUrl || undefined,
      buyUrl: item.buyUrl || undefined,
      freeVersionUrl: item.freeVersionUrl || undefined,
      tutorialUrl: item.tutorialUrl || undefined,
      overview: item.overview || undefined,
      features: item.features
        ? item.features.split("|").map((feat: string) => feat.trim())
        : undefined,
    }));
  } catch (error) {
    console.error("Error loading templates:", error);
    return fallbackTemplates; // Use fallback templates on error
  }
}

// Use a default export for your component that uses the templates data
export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await loadTemplates();
      setTemplates(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { templates, loading };
}

// Keep the hardcoded templates as a fallback
export const fallbackTemplates: Template[] = [
  {
    id: 1,
    name: "Budget Tracker",
    price: "$20",
    categories: ["finances", "free"],
    description:
      "Manage your monthly budget and control your spending over multiple years.",
    overview:
      "Take control of your finances with this comprehensive budget tracker. Track income, expenses, and savings across multiple years. The template includes dynamic charts that visualize your spending patterns and help you identify areas for improvement. Perfect for individuals who want to build wealth systematically.",
    features: [
      "Track income, expenses, and savings",
      "Visualize spending patterns with dynamic charts",
      "Plan for future expenses",
      "Mobile-friendly layout",
      "Print-ready reports",
    ],
    image: "/budget_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl:
      "https://docs.google.com/spreadsheets/d/1EKIcdA8H20eUWCwS9zOtuCwGEqgiX_USIDIkKSHjp64/edit?gid=2061588169#gid=2061588169",
    buyUrl: "https://ko-fi.com/s/db49a65ceb",
    freeVersionUrl:
      "https://docs.google.com/spreadsheets/d/1_2Yj5I2-KXI99EnwAIFB6qHcyRG-G0QkWXzplnonwGQ/edit?gid=2061588169#gid=2061588169",
    tutorialUrl: "https://www.youtube.com/watch?v=J1Zv1J1Y2iY",
  },
  {
    id: 2,
    name: "Subscription Tracker",
    price: "$10",
    categories: ["finances"],
    description:
      "Track all your subscriptions and fixed expenses effortlessly.",
    image: "/subscription_tracker.png",
    hasFreeVersion: false,
    isPaid: true,
    previewUrl:
      "https://docs.google.com/spreadsheets/d/1y0MMoneThIIZdbmrr2sas21MOIjqYlqwgh7N-84i_QA/edit?gid=2061588169#gid=2061588169",
    buyUrl: "https://ko-fi.com/s/6441e917de",
  },
  {
    id: 3,
    name: "Net Worth Tracker",
    price: "$10",
    categories: ["finances"],
    description: "Track your net worth over time and build wealth. ",
    image: "/net_worth.png",
    hasFreeVersion: false,
    isPaid: true,
    previewUrl:
      "https://docs.google.com/spreadsheets/d/1_XQgRBvtdYrL_Gi8im02SpeFqLXz4rKHfDKEe_enAps/edit?gid=1749557257#gid=1749557257",
    buyUrl: "https://ko-fi.com/s/9e1d1d3633",
  },
  {
    id: 4,
    name: "Habit Tracker",
    price: "$5",
    categories: ["productivity", "business", "free"],
    description:
      "Track all your tasks and improve your productivity 3 months at a time.",
    image: "/habit_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl:
      "https://docs.google.com/spreadsheets/d/18vttrnt3Z5wrDJ0NPp6ajAboWakfMJVVOZf7pNKFiBg/edit?gid=1586535057#gid=1586535057",
    buyUrl: "https://ko-fi.com/s/e5c0f14d57",
    freeVersionUrl:
      "https://docs.google.com/spreadsheets/d/1tgsoZOYktuH_pQtOu_orBRtk3WZuxTUAewho3JDCjoo/edit?gid=1586535057#gid=1586535057",
  },
  {
    id: 5,
    name: "OKR Tracker",
    price: "Free",
    categories: ["productivity", "free", "business"],
    description:
      "Set your personal or professional SMART goals and grow your success.",
    image: "/okr_tracker.png",
    hasFreeVersion: true,
    isPaid: false,
    freeVersionUrl:
      "https://docs.google.com/spreadsheets/d/1QTiYA3ON4l2DTwfDujTghaOOKLmZMEUrKyEsDngwxNE/edit?gid=756461954#gid=756461954",
  },
  {
    id: 6,
    name: "Color Palette",
    price: "Free",
    categories: ["productivity", "free"],
    description: "Copy the color codes for your next google sheets project.",
    image: "/color_palette.png",
    hasFreeVersion: true,
    isPaid: false,
    freeVersionUrl:
      "https://docs.google.com/spreadsheets/d/1PZukfrlXbbKonfjmwQ423ucpsOFSkhBE65r2xl_xk_0/edit?gid=1634915#gid=1634915",
  },
  {
    id: 7,
    name: "Task Manager",
    price: "Free",
    categories: ["productivity", "free"],
    description: "Track tasks with a budget and timeline easily.",
    image: "/task_tracker.png",
    hasFreeVersion: true,
    isPaid: false,
    freeVersionUrl:
      "https://docs.google.com/spreadsheets/d/15obNfu2GHG107if2Jpyrv4o1yCgelBqKL_R95lHObZE/edit?gid=290486793#gid=290486793",
  },
  {
    id: 8,
    name: "Weight Loss Tracker",
    price: "$5",
    categories: ["health", "free"],
    description: "Built to assist you lose and maintain your ideal weight.",
    image: "/weight_loss.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl:
      "https://docs.google.com/spreadsheets/d/1ByPANkhI7RyLmFxKdlkMO_KJXUbE32TFH06mNqBdUgA/edit?gid=910630012#gid=910630012",
    buyUrl: "https://ko-fi.com/s/d21a52d720",
    freeVersionUrl:
      "https://docs.google.com/spreadsheets/d/1Mvj3Sme8YdZsk3KMHaDN8Il5xVghnLByqSKqROp0bJg/edit?gid=910630012#gid=910630012",
  },
  {
    id: 9,
    name: "Work Out Tracker",
    price: "$5",
    categories: ["free", "health"],
    description: "Plan your work out days and track your performance.",
    image: "/workout_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl:
      "https://docs.google.com/spreadsheets/d/1ULuKXY9y3AGZXz7jeGO303pzX_JVuvev5MRJMKG_jOQ/edit?gid=1396586418#gid=1396586418",
    buyUrl: "https://ko-fi.com/s/a342a22913",
    freeVersionUrl:
      "https://docs.google.com/spreadsheets/d/1Yv_ZUlkEz_0c60W5Hvh5gL1IEvZEHhd7GuJHi88g1-o/edit?gid=990033680#gid=990033680",
  },
];

export default useTemplates;
