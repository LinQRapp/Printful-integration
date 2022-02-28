LinQR API - Printful integration PoC
------------------------------------

Quick and dirty, but somehow working Proof of Concept of integration [LinQR API](https://linqr.app/docs) with [Printful](https://www.printful.com/) using [ImgBB](https://imgbb.com/)

Code written in NodeJS is heavily based on the [axios](https://github.com/axios/axios) library

Run it with:
```bash
npm install
npm run poc
```

You will need 3 API keys generated at:
- <https://rapidapi.com/linqr-linqr-default/api/qrcode3> for QR Code generation
- <https://api.imgbb.com/> for temporary image storage
- <https://www.printful.com/dashboard/> for access to Printful API