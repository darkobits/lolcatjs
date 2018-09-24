import {howLow, howHigh, howLong, ItsAColor} from 'etc/typez';


/**
 * Maeks ur stuff colorful.
 */
export function makeItRainbow(freq: howLong, i: howHigh): ItsAColor {
  return {
    red: Math.round(Math.sin(freq * i) * 127 + 128),
    green: Math.round(Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128), // tslint:disable-line binary-expression-operand-order
    blue: Math.round(Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128) // tslint:disable-line binary-expression-operand-order
  };
}


/**
 * Picks a number 4 u.
 */
export function randyNumPlz(lowest: howLow, biggest: howHigh): number {
  return Math.random() * (biggest - lowest + 1) + lowest;
}


/**
 * Makes ur computer take a nap for a while.
 */
export async function iCanHazNaptimeFor(tiem: howLong) {
  return new Promise(keep => {
    setTimeout(() => {
      keep();
    }, tiem);
  });
}
