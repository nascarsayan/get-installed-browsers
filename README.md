# Get Installed Browsers
Get a list of installed browsers

## Installation

```js
npm i get-installed-browsers
```

## Usage

```js
import { GetInstalledBrowsers } from "get-installed-browsers";
console.dir(GetInstalledBrowsers());
```

```js
[{
  name: 'Chrome',
  type: 'chrome',
  path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
},
{
  name: 'Vivaldi',
  type: 'chrome',
  path: '/Applications/Vivaldi.app/Contents/MacOS/Vivaldi'
},
{
  name: 'Safari',
  type: 'safari',
  path: '/Applications/Safari.app/Contents/MacOS/Safari'
},
{
  name: 'Orion',
  type: 'safari',
  path: '/Applications/Orion.app/Contents/MacOS/Orion'
}]
```

## Notes

Supported browsers:

- Arc
- Brave
- Chrome
- Chrome Beta
- Chrome Canary
- Chromium
- Ephiphany (Gnome Web)
- Firefox
- Firefox Nightly
- Firefox Developer Edition
- Internet Explorer
- Microsoft Edge
- Opera
- Orion
- Safari
- Safari beta
- Safari Technical Preview
- Sidekick

We would love contributions to support more browsers!


