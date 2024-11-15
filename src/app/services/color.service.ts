import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private color = 'rgb(0,255,0)';

  constructor() {}

  public getNextColor() {
    const retour = '' + this.color;

    // find nextColor
    var rgbsStr = this.color.split('b')[1];
    rgbsStr = rgbsStr.substring(1, rgbsStr.indexOf(')'));

    const rgbs = rgbsStr.split(',');
    const RGB: number[] = [];
    for (let str of rgbs) {
      RGB.push(parseInt(str));
    }
    RGB[0] = (RGB[0] + RGB[1] * 6) % 256;
    RGB[1] = (RGB[1] + RGB[2] * 7) % 256;
    RGB[2] = (RGB[2] + RGB[0] * 8) % 256;

    this.color = `rgb(${RGB[0]},${RGB[1]},${RGB[2]})`;
    console.log(this.color);

    return retour;
  }

  public reset() {
    this.color = 'rgb(0,255,0)';
  }
}
