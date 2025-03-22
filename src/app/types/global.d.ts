import { Template } from './template';

declare global {
  interface Window {
    __INITIAL_DATA__?: {
      templates: Template[];
    };
  }
}

export {};