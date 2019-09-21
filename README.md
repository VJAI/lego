![LEGO](https://github.com/VJAI/lego/blob/master/projects/demo/src/assets/images/lego-375.png)

[Lego](https://github.com/vjai/lego) is an UI library built on Angular. It provides set of UI components that helps to build single page apps quicker. It also provides you simple abstractions that helps to build new components easier.

## Installing Lego

You can install it from npm.

```
npm install lego-ui-kit --save
```

Lego needs Angular CDK library to be installed. You can install it running the below command.

```
npm install @angular/cdk --save
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
@import '~lego-ui-kit/scss/lego';
```

## Copy the icon sprite to assets folder

Copy the icon sprite file from lego-ui-kit/assets/icons/Svg/sprite.css.svg to your project assets/images folder.

## Supported Browsers

- Chrome
- Safari
- Opera
- Firefox
- Edge
