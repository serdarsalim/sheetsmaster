// This file helps with TypeScript types for Next.js App Router

import { Metadata, ResolvingMetadata } from 'next';

// Define a generic interface for dynamic params
export interface DynamicParams {
  [key: string]: string;
}

// Define props interface for layouts and pages
export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageProps<T = DynamicParams> {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Define a type for metadata generation functions
export type GenerateMetadata<T = DynamicParams> = (
  props: PageProps<T>,
  parent: ResolvingMetadata
) => Promise<Metadata> | Metadata;