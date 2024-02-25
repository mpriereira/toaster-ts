# Toaster

Toaster is a simple TypeScript library to create toast notifications in your website.

## Usage

To start using the library, install it in your project:

```bash
npm install toaster
```

Add `<div id="toaster-wrapper"></div>` to your app, it will be the place where all your toasts will be rendered.
After that you can use `toast()` from anywhere in your app.

```ts
import { toast } from 'toaster';

toast('My first toast');
```
