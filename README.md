# tolst-cli
This is the platform for the microfrontends

## How to check that it works?
Into your project directory run:
```
npx @tri-tolstiaka/cli --init
npm install .
npx @tri-tolstiaka/cli --server
```

## How to publish?
You can publish new npm version only from the main branch!
```
git add .
git commit -m "-"
npm version patch
// можно посмотреть появился ли тег в git graph
npm run new:version
```

## How to use?
See the example project - https://github.com/Shuvani/tolst-dummy
