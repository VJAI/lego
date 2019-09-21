# LEGO

[Lego](https://github.com/vjai/lego) is an UI library built on Angular. It provides set of UI components that helps to build single page apps quicker. It also provides you simple abstractions that helps to build new components easier.

## Installing Lego

You can install it from npm.

```
npm install lego-ui-kit --save
```

## Importing in App

Importing the module in app.module.ts.

```
import { LegoModule } from 'lego-ui-kit';

@NgModule({
  imports: [
    LegoModule,
    ...
  ]
})
export class AppModule {
}
```

Importing the SCSS file in styles.scss.

```
$lego-assets-path: '../projects/core/assets/' !default;

@import 'lego-ui-kit/scss/lego';
```

## Supported Browsers

- Chrome
- Safari
- Opera
- Firefox
- Edge
