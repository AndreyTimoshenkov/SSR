import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if(typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});

export const DOCUMENT = new InjectionToken<Document>('DocumentToken', {
  factory: () => {
    const platformId = inject(PLATFORM_ID);

    return isPlatformBrowser(platformId) ? document : new Document();
  }
});