--

**Notice:** This is a fork of: https://github.com/robertboloc/lolcatjs.

The principal difference between this package and its parent is the removal of the [`sleep`](https://www.npmjs.com/package/sleep) dependency, which requires compiling a C++ module. As such, the animation feature has been removed.

The original `README` continues below.

--

![lolcatjs](/assets/banner.png)

> For when you need the lols but don't have the rubies.

This is a node port of the famous [lolcat](https://github.com/busyloop/lolcat) gem. It implements all the original functionality and behaviour.

## Installation
```javascript
npm install -g @darkobits/lolcatjs
```

## Usage

**Command Line**
```javascript
lolcatjs [OPTION]... [FILE]...

Concatenate FILE(s), or standard input, to standard output.
With no FILE, or when FILE is -, read standard input.

    --spread, -p <f>:   Rainbow spread (default: 8.0)
      --freq, -F <f>:   Rainbow frequency (default: 0.3)
      --seed, -S <i>:   Rainbow seed, 0 = random (default: 0)
     --speed, -s <f>:   Animation speed (default: 20.0)
         --force, -f:   Force color even when stdout is not a tty
       --version, -v:   Print version and exit
          --help, -h:   Show this message

Examples:
  lolcatjs f - g     Output f's contents, then stdin, then, g's contents.
  lolcatjs           Copy standard input to standard output.
  fortune | lolcatjs Display a rainbow cookie.
```

**NPM Module**
```javascript
const lolcatjs = require('lolcatjs');

lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;

lolcatjs.fromString('I can has Cheezburger?');
```


## Screenshot
![lolcatjs](/assets/screenshot.png)

## Thanks
[Nur Ortega Marsal](http://esnur.eu) for creating the banner

## License
WTFPL © [Robert Boloc](http://robertboloc.eu)
