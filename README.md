# inkball

<p align="center">
    <a href="https://inkball.netlify.app">
        <strong>Click here to play the game</strong>
    </a>
</p>

<p align="center">
    <a href="https://inkball.netlify.app/">
        <img src="https://raw.githubusercontent.com/mat-sz/inkball/master/screenshot.png" alt="screenshot">
    </a>
</p>

A TypeScript reimplementation of the game included with Windows Vista. Uses [matter-js](https://brm.io/matter-js/) as the physics engine. Canvas renderer is my own.

**Maps are autogenerated**, although the generator itself needs a rewrite. First 3 maps are easy, next 4 maps are slightly more diffucult and the last 3 maps are the most difficult.

## Building instructions

```
npm install
npm run build

# or

yarn install
yarn build
```

The output will be in ./dist/.
