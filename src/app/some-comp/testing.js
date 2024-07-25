import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID  } from "@angular/core";

const _platformId = inject(PLATFORM_ID);
console.log(isPlatformBrowser(_platformId));