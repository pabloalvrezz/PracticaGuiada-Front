import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCALE_CONFIG } from './configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(LOCALE_CONFIG.availableLanguages);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(LOCALE_CONFIG.fallbackLocale);

    const regExp: RegExp = new RegExp(this.composeRegularExpression());

    let browserLang: string | undefined = translate.getBrowserCultureLang()?.replace('-', '_');

    if (!browserLang?.match(new RegExp(regExp))) {
      browserLang = translate.getBrowserLang();
    }

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(browserLang?.match(regExp) ? browserLang : LOCALE_CONFIG.fallbackLocale);
  }

  /**
   * Construye la expresión regular para obtener el idioma del navegador.
   */
  private composeRegularExpression(): string {

    let regularExpression = '';

    let firstElement = true;

    LOCALE_CONFIG.availableLanguages.forEach(element => {
      if (!firstElement) {
        regularExpression += '|';
      }
      regularExpression += `^${element}$`;
      firstElement = false;
    });

    return regularExpression;
  }
}
