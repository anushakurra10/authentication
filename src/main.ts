import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import AWSConfig from './aws-exports'; 
import Amplify from 'aws-amplify';

if (environment.production) {
  enableProdMode();
}

Amplify.configure(AWSConfig);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
