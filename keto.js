//keto.js
// MIT License
//
// Copyright (c) 2018 Érico Vieira Porto
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
keto = {

  //this contains keys currently pressed as enum, should only be accessed
  //through isPressed
  _pressed: {},

  //this allows key enum to key name translation
  _KeysString: ['Q','W','E','R','T',
                'Y','U','I','O','P',
                'A','S','D','F',
                'G','H','J','K','L',
                'Z','X','C',
                'V','B','N','M'],

  //enum containing each key as number
  key: {
    K_Q: 0, K_W: 1, K_E: 2, K_R: 3, K_T: 4,
    K_Y: 5, K_U: 6, K_I: 7, K_O: 8, K_P: 9,
    K_A: 10, K_S: 11, K_D: 12, K_F: 13, 
    K_G: 14, K_H: 15, K_J: 16, K_K: 17, K_L: 18,
    K_Z: 19, K_X: 20, K_C: 21,
    K_V: 22, K_B: 23, K_N: 24, K_M: 25, 
  },

  //when keto is loaded, if no alternative map is specified, it loads the _defaultMap
  _defaultmap: {
    k: {
      K_Q: [81],           //arrow left, key a
      K_W: [87],             //arrow up, key w
      K_E: [69],          //arrow right, key d
      K_R: [82],           //arrow down, key s
      K_T: [84],           //arrow down, key s
      K_Y: [89],           //arrow down, key s
      K_U: [85],           //arrow down, key s
      K_I: [73],           //arrow down, key s
      K_O: [79],           //arrow down, key s
      K_P: [80],           //arrow down, key s
      K_A: [65],           //arrow down, key s
      K_S: [83],           //arrow down, key s
      K_D: [68],           //arrow down, key s
      K_F: [70],           //arrow down, key s
      K_G: [71],           //arrow down, key s
      K_H: [72],           //arrow down, key s
      K_J: [74],           //arrow down, key s
      K_K: [75],           //arrow down, key s
      K_L: [76],           //arrow down, key s
      K_Z: [90],           //arrow down, key s
      K_X: [88],           //arrow down, key s
      K_C: [67],           //arrow down, key s
      K_V: [86],           //arrow down, key s
      K_B: [66],           //arrow down, key s
      K_N: [78],           //arrow down, key s
      K_M: [77],           //arrow down, key s
    },
    t: {
      SIZE: 0.1,
      HIDEKEYS: []
    }
  },

  _readableKeyCodeMap: {
    8: 'backspace', 9: 'tab', 13: 'enter', 16: 'shift', 17: 'ctrl', 18: 'alt',
    19: 'pause/break', 20: 'caps lock', 27: 'escape', 32: 'space',
    33: 'page up', 34: 'page down', 35: 'end', 36: 'home', 37: 'left arrow',
    38: 'up arrow', 39: 'right arrow', 40: 'down arrow', 45: 'insert',
    46: 'delete', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5',
    54: '6', 55: '7', 56: '8', 57: '9', 65: 'a', 66: 'b', 67: 'c', 68: 'd',
    69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l',
    77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't',
    85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
    91: 'left super key', 92: 'right super key', 93: 'select key',
    96: 'numpad 0', 97: 'numpad 1', 98: 'numpad 2', 99: 'numpad 3',
    100: 'numpad 4', 101: 'numpad 5', 102: 'numpad 6', 103: 'numpad 7',
    104: 'numpad 8', 105: 'numpad 9', 106: 'multiply', 107: 'add',
    109: 'subtract', 110: 'decimal point', 111: 'divide', 112: 'f1',
    113: 'f2', 114: 'f3', 115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7',
    119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12', 144: 'num lock',
    145: 'scroll lock', 186: 'semi-colon', 187: 'equal sign', 188: 'comma',
    189: 'dash', 190: 'period', 191: 'forward slash', 192: 'grave accent',
    219: 'open bracket', 220: 'back slash', 221: 'close braket',
    222: 'single quote'
  },

  //128 px width and 16 px height image of each button as 16x16 px image
  _touchButtonsImageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAAATCAYAAACk0LuAAAAC90lEQVR4nO2dMW4cMQxFacNnCpAmSJc2B3EVA6lcuHAVIKlypxwmR0iRNJEha6URPylKmvV/zXp3v0QOpREljmHf/Pn9668QQgghwdyJiDx9+6ISP339IdRTTz311Nv1SJtR7GL7dqplQgh548xe8HObK22LMOEQQgiZxN1qBwghZGce7h8vPvv+83mBJ+eHCYcQ8qZICUSTNB7uHy90tQREdFwknDyYRwNSG4jed+hOYYS+1e7IxxGfo5pSnxgZn7Kd1qfSztG4I/5Y/Nf6krTacde2P/oe1Wvsl1j61/jVs2HpG/G/NSd7a0krGWh80o5X+UrsvEo46A1kAe0PWTAQ32sTaIcJhfqELqj59xHJEvUHXYA9CSSSGfdKb2dtmdM1/UjQ+xeJY6nPE0ON2ueaROpNNrvM0R14STi1oCCBPmNQd9u9eMcA7X+X6/awg+8zYqi1gczp1nzr9Yv6hGBNOunnFkeJFD3pIGgTeFnV8L63+hhtu/oMJ/IG8gQmgmtYdCPxTuYe1r49ZceR7JRsEjvNaaQEmmvQpDOa3If8pNPi6FmP9TrQxd0Th1m2zb80UNtJaQLs3SHscBPtBBofywIcuau19pWXUZD+PTvdVv/RGzTLPRPhl6UiYC2BHpXGZoHGsCzvpT60lG3K6+/Fw1v2m2H7JeGUGd0SsEhW+zGjpGCxYVkgc1bf1NdAVNLxJBuNX7PKZFZGJp3WQtq7Vq0PSWc9sdf86506Wn2gzLT96oRT6xSdsOgOWzPgZbtVN0R0eWmWDQTvCSoiIc/qP6KMFRlPyzNAdFG37PrL9mcDKYlZN+qWxNo6lexs+6Kk5tkxa5NHRN8eW1FaaxtrzdeiHzlmkWNkaTP7eiPnv0e/yq8Rc8dyTSuTmveU0XtfvnrtzrZtfoZDCCFn44wnrGuCf0uNEELIFG5FRN6/+9AV5hrqqaeeeurj9KNJNlfaFvlfUvv08XO3Ua6hnnrqqac+Tj+aZHOlbRGRG/7HT0IIITP4B0og1g++paTuAAAAAElFTkSuQmCC',
  _touchpadDefinitions: {
    LEFTSIDE: {
      TOUCHAREAS: {
        K_Q: {  X:  1, Y:  0, W: 12, H: 19 },
        K_W: {  X: 13, Y:  0, W: 12, H: 19 },
        K_E: {  X: 25, Y:  0, W: 12, H: 19 },
        K_R: {  X: 37, Y:  0, W: 12, H: 19 },
        K_T: {  X: 49, Y:  0, W: 12, H: 19 },        
        K_A: {  X: 13, Y: 19, W: 12, H: 19 },
        K_S: {  X: 25, Y: 19, W: 12, H: 19 },
        K_D: {  X: 37, Y: 19, W: 12, H: 19 },
        K_F: {  X: 49, Y: 19, W: 12, H: 19 },        
        K_Z: {  X: 25, Y: 38, W: 12, H: 19 },
        K_X: {  X: 37, Y: 38, W: 12, H: 19 },
        K_C: {  X: 49, Y: 38, W: 12, H: 19 },
      },
      X: 0,
      Y: 0,

      W: 64,
      H: 75
    },
    RIGHTSIDE: {
      TOUCHAREAS: {
        K_Y: {  X:  2, Y:  0, W: 12, H: 19 },
        K_U: {  X: 14, Y:  0, W: 12, H: 19 },
        K_I: {  X: 26, Y:  0, W: 12, H: 19 },
        K_O: {  X: 38, Y:  0, W: 12, H: 19 },
        K_P: {  X: 50, Y:  0, W: 12, H: 19 },
        K_G: {  X:  2, Y: 19, W: 12, H: 19 },
        K_H: {  X: 14, Y: 19, W: 12, H: 19 },
        K_J: {  X: 26, Y: 19, W: 12, H: 19 },
        K_K: {  X: 38, Y: 19, W: 12, H: 19 },
        K_L: {  X: 50, Y: 19, W: 12, H: 19 },
        K_V: {  X:  2, Y: 38, W: 12, H: 19 },
        K_B: {  X: 14, Y: 38, W: 12, H: 19 },
        K_N: {  X: 26, Y: 38, W: 12, H: 19 },
        K_M: {  X: 38, Y: 38, W: 12, H: 19 },
      },
      X: 0,
      Y: 0,
      W: 62,
      H: 75
    }
  },

  _generateTouchpadImage: function(){
    function setpixelated(canvas){
      var ctx = canvas.getContext('2d');
      ctx['imageSmoothingEnabled'] = false;       /* standard */
      ctx['mozImageSmoothingEnabled'] = false;    /* Firefox */
      ctx['oImageSmoothingEnabled'] = false;      /* Opera */
      ctx['webkitImageSmoothingEnabled'] = false; /* Safari */
      ctx['msImageSmoothingEnabled'] = false;     /* IE */
      canvas.style.imageRendering = 'optimizeSpeed';
      canvas.style.imageRendering = '-moz-crisp-edges';
      canvas.style.imageRendering = '-o-crisp-edges';
      canvas.style.imageRendering = '-webkit-optimize-contrast';
      canvas.style.imageRendering = 'optimize-contrast';
      canvas.style.imageRendering = 'crisp-edges';
      canvas.style.imageRendering = 'pixelated';
    }

    var buttonsimg = this._buttonsimg;
    this._lTouch = document.createElement('canvas');
    this._lTouch.width = this._touchpadDefinitions.LEFTSIDE.W;
    this._lTouch.height = this._touchpadDefinitions.LEFTSIDE.H;
    setpixelated(this._lTouch);
    var lctx = this._lTouch.getContext('2d');
    lctx.fillStyle = '#eee1b5';
    lctx.fillRect(0, 0, this._lTouch.width, this._lTouch.height);
    for(var ta in this._touchpadDefinitions.LEFTSIDE.TOUCHAREAS){
      var input = this._touchpadDefinitions.LEFTSIDE.TOUCHAREAS[ta];
      var n = this.key[ta];
      lctx.drawImage(buttonsimg,
        n*12, 0,
        12, 19,
        input.X, input.Y,
        input.W, input.H);
    }

    this._rTouch = document.createElement('canvas');
    this._rTouch.width = this._touchpadDefinitions.RIGHTSIDE.W;
    this._rTouch.height = this._touchpadDefinitions.RIGHTSIDE.H;
    setpixelated(this._rTouch);
    var rctx = this._rTouch.getContext('2d');
    rctx.fillStyle = '#eee1b5';
    rctx.fillRect(0, 0, this._rTouch.width, this._rTouch.height);
    for(var ta in this._touchpadDefinitions.RIGHTSIDE.TOUCHAREAS){
      var input = this._touchpadDefinitions.RIGHTSIDE.TOUCHAREAS[ta];
      var n = this.key[ta];
      rctx.drawImage(buttonsimg,
        n*12, 0,
        12, 19,
        input.X, input.Y,
        input.W, input.H);
    }

  },

  getRemainingWidth(){
    if(window.innerHeight>window.innerWidth){
      return 0;
    } else {
      return Math.floor(window.innerWidth - 2*Math.floor(window.innerHeight/3));
    }
  },

  getRemainingHeight(){
    if(window.innerHeight>window.innerWidth){
      return Math.floor(window.innerHeight-Math.floor(window.innerWidth/2)-Math.floor(0.05*window.innerHeight)-1);
    } else {
      return 0;
    }
  },


  _placeTouchpadImages(){
    if(window.innerHeight>window.innerWidth){
      //place at leftside at left
      keto._lTouch.style.position = 'absolute';
      keto._lTouch.style['z-index'] = 1001;
      keto._lTouch.style.bottom = '5%';
      keto._lTouch.style.left = 0;
      keto._rTouch.style.right = 'auto';

      keto._lTouch.style.height = Math.floor(window.innerWidth/2) + 'px';
      keto._lTouch.style.width = Math.floor(window.innerWidth/2) + 'px';

      //place at rightside at left
      keto._rTouch.style.position = 'absolute';
      keto._rTouch.style['z-index'] = 1000;
      keto._rTouch.style.bottom = '5%';
      keto._rTouch.style.right = 0;
      keto._rTouch.style.left = 'auto';

      keto._rTouch.style.height = Math.floor(window.innerWidth/2) + 'px';
      keto._rTouch.style.width = Math.floor(window.innerWidth/2) + 'px';
    } else {
      //place at leftside at left
      keto._lTouch.style.position = 'absolute';
      keto._lTouch.style['z-index'] = 1001;
      keto._lTouch.style.bottom = '10%';
      keto._lTouch.style.left = 0;
      keto._rTouch.style.right = 'auto';

      keto._lTouch.style.height = Math.floor(window.innerHeight/3) + 'px';
      keto._lTouch.style.width = Math.floor(window.innerHeight/3) + 'px';

      //place at rightside at left
      keto._rTouch.style.position = 'absolute';
      keto._rTouch.style['z-index'] = 1000;
      keto._rTouch.style.bottom = '10%';
      keto._rTouch.style.right = 0;
      keto._rTouch.style.left = 'auto';

      keto._rTouch.style.height = Math.floor(window.innerHeight/3) + 'px';
      keto._rTouch.style.width = Math.floor(window.innerHeight/3) + 'px';
    }
  },

  resize(){
    if(keto._drawtouch){
      keto._placeTouchpadImages();
    }
  },

  handleTouchDownLeft: function(e){
    e.preventDefault();
    keto.processTouches(e.touches, 'down', 'left');
  },

  handleTouchMoveLeft: function(e){
    e.preventDefault();
    keto.processTouches(e.touches, 'move', 'left');
  },

  handleTouchUpLeft: function(e){
    e.preventDefault();
    keto.processTouches(e.touches, 'up', 'left');
  },

  handleTouchDownRight: function(e){
    e.preventDefault();
    keto.processTouches(e.touches, 'down', 'right');
  },

  handleTouchMoveRight: function(e){
    e.preventDefault();
    keto.processTouches(e.touches, 'move', 'right');
  },

  handleTouchUpRight: function(e){
    e.preventDefault();
    keto.processTouches(e.touches, 'up', 'right');
  },

  processTouches: function(touches, kind, side) {
    var that = keto;

    if(side == 'left'){
      var offsetTop = that._lTouch.offsetTop,
          offsetLeft = that._lTouch.offsetLeft;
      var scale = parseInt(that._lTouch.style.width, 10)/ that._lTouch.width;
      var touchareas = that._touchpadDefinitions.LEFTSIDE.TOUCHAREAS;
    } else {
      var offsetTop = that._rTouch.offsetTop,
          offsetLeft = that._rTouch.offsetLeft;
      var scale = parseInt(that._lTouch.style.width, 10)/ that._rTouch.width;
      var touchareas = that._touchpadDefinitions.RIGHTSIDE.TOUCHAREAS;
    }

    for(var ta in touchareas){

      var touched = false;
      var input = touchareas[ta];
      var n = that.key[ta];

      for (var i = 0; i < touches.length; i++) {
        var pos = {
          x: ((touches[i].pageX - offsetLeft) / scale),
          y: ((touches[i].pageY - offsetTop) / scale)
        };

        if (pos.x > input.X && pos.y > input.Y) {
          if (pos.x < input.X + input.W && pos.y < input.Y + input.H) {
            touched = true;
            break;
          }
        }
      }

      if(touched == true && that._previousTouchpadKeys[n] == false){
        that._previousTouchpadKeys[n] = true;
        that._pressed[n] = true;

        //throw a keto event
        var newEvent = new CustomEvent('keto_KeyPressed', {
          'detail': that._KeysString[n]});
        window.dispatchEvent(newEvent);

        that._lastInputType = 'touchpad';

      } else if (touched == false && that._previousTouchpadKeys[n] == true){
        that._previousTouchpadKeys[n] = false;
        delete that._pressed[n];

        //throw a keto event
        var newEvent = new CustomEvent('keto_KeyReleased', {
          'detail': that._KeysString[n]});
        window.dispatchEvent(newEvent);

        that._lastInputType = 'touchpad';
      }
    }
  },

  _keyboardMap: {},
  _touchpadMap: {},
  _previousTouchpadKeys:{},
  _lastInputType: '',

  map: {},
  keyCodeToReadable: function(keyCode){
    if(typeof keyCode === undefined){
      return;
    }
    if( keyCode in this._readableKeyCodeMap){
      return this._readableKeyCodeMap[keyCode];
    }
    return parseInt(keyCode).toString();
  },

  charToKeyCode: function(char) {
    return char.charCodeAt(0)
  },

  onKeydown: function(event) {
    var that = keto;
    if(event.keyCode in that._keyboardMap){
      event.preventDefault();
      if(that._pressed[that._keyboardMap[event.keyCode]] != true){
        var newEvent = new CustomEvent('keto_KeyPressed', {
           'detail': that._KeysString[that._keyboardMap[event.keyCode]]});
        window.dispatchEvent(newEvent);
      }

      that._pressed[that._keyboardMap[event.keyCode]] = true;

      that._lastInputType = 'keyboard';
    }
  },

  onKeyup: function(event) {
    var that = keto;
    if(event.keyCode in that._keyboardMap){
      event.preventDefault();
      delete that._pressed[that._keyboardMap[event.keyCode]];
      var newEvent = new CustomEvent('keto_KeyReleased', {
        'detail': that._KeysString[that._keyboardMap[event.keyCode]]});
      window.dispatchEvent(newEvent);
      that._lastInputType = 'keyboard';
    }
  },

  isPressed: function(key) {
    return !!this._pressed[key];
  },

  //configures the keyboard,touch mapping to internal keys
  setup: function(drawtouch, map){
    if(typeof drawtouch === 'undefined' || drawtouch === null){
      this._drawtouch = true;
    } else {
      this._drawtouch = drawtouch;
    }
    if(typeof map === 'undefined' || map === null){
      this.map = this._defaultmap;
    } else {
      this.map = map;
    }
    //configures keyboard key map to internal keys
    for(var ibutton in this.map.k){
      var keyCodes = this.map.k[ibutton];
      for(var i=0; i<keyCodes.length; i++){
        var keyCode = keyCodes[i];
        this._keyboardMap[keyCode] = this.key[ibutton];
      }
    }

    //setting inital condition for _previousTouchpadKeys
    for(var k in this.key){
      var kvalue=this.key[k];
      this._previousTouchpadKeys[kvalue]=false;
    }

    if(this._drawtouch){
      this._buttonsimg = document.createElement('img');
      this._buttonsimg.style.width  = 128;
      this._buttonsimg.style.height = 16;
      this._buttonsimg.onload = function(){
        keto._generateTouchpadImage();
        keto._placeTouchpadImages();

        //push the canvas to the document, won't work without this
        document.documentElement.appendChild(keto._lTouch);
        document.documentElement.appendChild(keto._rTouch);

        keto._lTouch.addEventListener('touchstart', keto.handleTouchDownLeft, false);
        keto._lTouch.addEventListener('touchmove', keto.handleTouchMoveLeft, false);
        keto._lTouch.addEventListener('touchend', keto.handleTouchUpLeft, false);
        keto._rTouch.addEventListener('touchstart', keto.handleTouchDownRight, false);
        keto._rTouch.addEventListener('touchmove', keto.handleTouchMoveRight, false);
        keto._rTouch.addEventListener('touchend', keto.handleTouchUpRight, false);
      }
      this._buttonsimg.src = this._touchButtonsImageBase64;
    }


    window.addEventListener('keyup',  this.onKeyup ,false);
    window.addEventListener('keydown', this.onKeydown,false);
  },

  getLastInputType: function(){
    return this._lastInputType;
  },

  getPrintableKeyboardMap: function(){
    var text='';
    for(var i=0; i<this._KeysString.length; i++){
      text=text+this._KeysString[i]+': ';
      var keyCodes = this.map.k[this._KeysString[i]];
      for(var j=0; j<keyCodes.length; j++){
        text=text+this.keyCodeToReadable(keyCodes[j]);
        if(j<keyCodes.length-1)
          text=text+', ';
      }
      if(i<this._KeysString.length-1)
        text=text+"\n";
    }
    return text;
  }

}
