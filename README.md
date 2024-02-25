# Toaster

Toaster is a simple JavaScript library, written in TypeScript, to show notifications in your website.

> :warning: **WARNING: This library is still a work in progress!** :warning:
>
> Please, be aware that while this library is being actively developed and improved, there may be instability and breaking changes.

## Usage

To start using the library, install it in your project:

```bash
npm install toaster-ts
```

Add `<div id="toaster-wrapper"></div>` to your app, it will be the place where all your notifications will be rendered.
After that you can use `toast()` from anywhere in your app.

```ts
import 'toaster-ts/dist/bundle.css';
import { toast } from 'toaster-ts';

toast('My first toast');
```
