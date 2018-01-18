
# Classical Music Only: Browser Extension


A browser extension to help you discover the world of classical music using [classicalmusiconly.com](https://classicalmusiconly.com).
You can directly install the extension from [Chrome Web Store](https://chrome.google.com/webstore/detail/classical-music-only/biefofikachjnokhakeenabdcioccgig) or
[Firefox Addons website](https://addons.mozilla.org/en-US/firefox/addon/classical-music-only/)


## Features

* Discover thousands of classsical works randomly with three magic buttons (masterpiece, obscure or totally random)
* Listen to top works of a certain composer filtered by genre (e.g. Beethoven symphonies, Brahms chamber music, Mozart violin sonatas, etc...)
* Listen to top works of any genre filtered by period (e.g. Romantic violin concertos, modern symphonies, renaissance sacred music, etc...)


## How to install from the repo

1. `git clone https://github.com/classicalmusiconly/classicalmusiconly-extension`
2. `cd classicalmusiconly-extension`
3. `npm install`
4. `npm run build`
5. `cd dist`
6. `zip -r classicalmusiconly.zip .`

Step 6 is optional for Chrome/Chromium since you can install the extension directly by choosing the `dist` directory from the `load unpacked extension` button in `chrome://extensions/`
