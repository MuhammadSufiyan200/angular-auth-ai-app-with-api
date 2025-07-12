
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: 'rectangle-bounce',  // koi bhi valid type de do
  fgsColor: 'transparent',      // invisible spinner
  fgsSize: 0,                   // effectively hide the spinner
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  blur: 5,
  hasProgressBar: false,
  text: '',
};


@NgModule({
  imports: [NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)],
  exports: [NgxUiLoaderModule],
})
export class NgxUiLoaderWrapperModule {}
