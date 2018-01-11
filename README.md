# ketoJS
Touch keyboard library in JavaScript with focus in typing games.

You can [test it here](https://ericoporto.github.io/ketoJS/index.html).

## What's Keto ?

Keto is a JavaScript drop in code to unify touch inputs in a virtual keyboard and keypress from a real keyboard to allow easy development of typing games in JavaScript.

Keto code is similar to my [ktg](https://github.com/ericoporto/ktg) library, which aims to unify Gamepad, Touch and Keyboard input, focusing on the gamepad, but instead Keto focuses on the keyboard aspect and drops the gamepad part.

## How to use

You need to import this code in your JavaScript game. The easy way is placing it in your `index.html`.

    <script type="text/javascript" src="keto.js"></script>

Before using, you need to declare at some place:

    keto.setup()

Whenever a key is pressed `keto_KeyPressed` event is emitted, and when it's released, `keto_KeyReleased` is emitted. You can use event listeners on the window element.

    window.addEventListener('keto_KeyReleased',  aKeyIsUp,false);
    window.addEventListener('keto_KeyPressed', aKeyIsDown,false);

The key is passed as string under event.detail (in upper case, like either 'A' or 'B'... or 'Z').

Alternatively you can monitor the keys under your gameloop using `isPressed` method.

    if( keto.isPressed(keto.key.K_A) ) {
      ...
    }

The possible keys by default are:

    ktg.key.K_A
    ktg.key.K_B
    ktg.key.K_C
    ktg.key.K_D
    ktg.key.K_E
    ...
    ktg.key.K_Y
    ktg.key.K_Z

## keto.resize details

In case your game resizes, for example, by resizing the browser window, or going fullscreen, you will need to deal with this. When you deal, just ensure to call `keto.resize()` to guarantee it will resize the touch input appropriately.

## other things

### Accents and non US letters

I have no idea how to handle those cases right now, if you do, please help me find a way. I think it would probably require a complete rewrite though. 

I actually stopped developing this library because I didn't knew how to handle different keyboard and I kind needed portuguese characters like `ç` and accentuaded letters. So I really need help with this subject!

### Theming 

Under `keto._touchButtonsImageBase64` there is a 128 px width and 16 px height image of each button as 16x16 px image. Keto was designed with pixelart in mind. If you wish to change this, you will need to either change this image, or change some more things.

### Can you pack this in npm for use with webpack and cool things?
  
I don't really know how to do this, if you can help me do this, I will be thrilled!

# Author

Made by Érico Vieira Porto

# License

Distributed under MIT license. See LICENSE for more information.
