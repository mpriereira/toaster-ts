# toaster-ts

toaster-ts is a JavaScript library to show toast notifications in your website.

> :warning: **WARNING: This library is still a work in progress!** :warning:
>
> Please, be aware that while this library is being actively developed and improved, there may be instability and breaking changes.

## Usage

To start using the library, install it in your project:

```bash
npm install toaster-ts
```

Add `<section id="toaster-wrapper"></section>` inside `<body>` element. That will be the container for all the notifications.
You can customize the position by adding the `data-position` attribute. See the example below:
```html
<!DOCTYPE html>
<html lang="en">
  <head>...</head>
  <body>
    ...
    <section
        id="toaster-wrapper"
        data-position="bottom-left" />
  </body>
</html>
```

Import the stylesheet
```css
@import 'toaster-ts/dist/bundle.css';
```

Then, you can use `toast()` from anywhere in your app.

```ts
import { toast } from 'toaster-ts';

toast('My first toast');
```

## Thanks

This library has been deeply inspired by [Sonner](https://sonner.emilkowal.ski/), an opinionated toast component for React. Thanks to its author, [Emil Kowalski](https://emilkowal.ski/)
