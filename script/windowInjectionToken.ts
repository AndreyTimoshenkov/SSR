import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if(typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});

export const DOCUMENT = new InjectionToken<Document>('Document', {
  factory: () => {
    if(typeof document !== 'undefined') {
      return document
    }
    return new Document();
  }
});