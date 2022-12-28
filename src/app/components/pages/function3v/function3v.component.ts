import { Component } from '@angular/core';

@Component({
  selector: 'app-function3v',
  templateUrl: './function3v.component.html',
  styleUrls: ['./function3v.component.css'],
})
export class Function3vComponent {
  initialState: string = '';
  formula: string = '';
  formulaFixed: string = '';
  initState: number[] = [];
  path: number[][] = [];
  currentFunction: boolean = false;

  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async hillClimber() {
    this.currentFunction = true;
    let is = this.initialState.trim().replace(' ', '').split(',');
    this.formulaFixed = this.formula.toLowerCase();
    this.initState = [Number(is[0]), Number(is[1]), Number(is[2])];
    for (let index = 0; index < this.formulaFixed.length; index++) {
      if (this.formulaFixed[index] == '^') {
        this.formulaFixed =
          this.formulaFixed.substring(0, index) +
          '**' +
          this.formulaFixed.substring(index + 1);
      }
      if (
        this.formulaFixed[index] == 'x' &&
        this.formulaFixed[index + 1] == 'y'
      ) {
        this.formulaFixed =
          this.formulaFixed.substring(0, index + 1) +
          '*' +
          this.formulaFixed.substring(index + 1);
      }
      if (
        this.formulaFixed[index] == 'x' &&
        this.formulaFixed[index + 1] == 'z'
      ) {
        this.formulaFixed =
          this.formulaFixed.substring(0, index + 1) +
          '*' +
          this.formulaFixed.substring(index + 1);
      }
      if (
        this.formulaFixed[index] == 'y' &&
        this.formulaFixed[index + 1] == 'z'
      ) {
        this.formulaFixed =
          this.formulaFixed.substring(0, index + 1) +
          '*' +
          this.formulaFixed.substring(index + 1);
      }
      if (
        (this.formulaFixed[index] == '1' ||
          this.formulaFixed[index] == '2' ||
          this.formulaFixed[index] == '3' ||
          this.formulaFixed[index] == '4' ||
          this.formulaFixed[index] == '5' ||
          this.formulaFixed[index] == '6' ||
          this.formulaFixed[index] == '7' ||
          this.formulaFixed[index] == '8' ||
          this.formulaFixed[index] == '9' ||
          this.formulaFixed[index] == '0' ||
          this.formulaFixed[index] == ')') &&
        (this.formulaFixed[index + 1] == 'x' ||
          this.formulaFixed[index + 1] == 'y' ||
          this.formulaFixed[index + 1] == 'z')
      ) {
        this.formulaFixed =
          this.formulaFixed.substring(0, index + 1) +
          '*' +
          this.formulaFixed.substring(index + 1);
      }
    }
    console.log(this.formulaFixed);
    this.path = [];
    let iteration = 0;
    let cord: number[] = this.initState;
    while (iteration < 100) {
      await this.delay(500);
      cord = this.findPath(
        cord[0],
        cord[1],
        cord[2],
        this.evaluate,
        this.formulaFixed
      );
      if (this.path.length > 0) {
        if (
          this.path[this.path.length - 1][0] == cord[0] &&
          this.path[this.path.length - 1][1] == cord[1] &&
          this.path[this.path.length - 1][2] == cord[2]
        ) {
          break;
        }
      }
      this.path.push(cord);
      iteration++;
    }
  }

  findPath(
    x: number,
    y: number,
    z: number,
    f: Function,
    formula: string
  ): number[] {
    let maxValue: number = f(x, y, z, formula);
    let tempCord: number[] = [x, y, z];
    if (maxValue < f(x, y, z + 1, formula)) {
      maxValue = f(x, y, z + 1, formula);
      tempCord = [x, y, z + 1];
    }
    if (maxValue < f(x, y + 1, z + 1, formula)) {
      maxValue = f(x, y + 1, z + 1, formula);
      tempCord = [x, y + 1, z + 1];
    }
    if (maxValue < f(x + 1, y + 1, z + 1, formula)) {
      maxValue = f(x + 1, y + 1, z + 1, formula);
      tempCord = [x + 1, y + 1, z + 1];
    }
    if (maxValue < f(x + 1, y, z + 1, formula)) {
      maxValue = f(x + 1, y, z + 1, formula);
      tempCord = [x + 1, y, z + 1];
    }
    if (maxValue < f(x + 1, y - 1, z + 1, formula)) {
      maxValue = f(x + 1, y - 1, z + 1, formula);
      tempCord = [x + 1, y - 1, z + 1];
    }
    if (maxValue < f(x, y - 1, z + 1, formula)) {
      maxValue = f(x, y - 1, z + 1, formula);
      tempCord = [x, y - 1, z + 1];
    }
    if (maxValue < f(x - 1, y - 1, z + 1, formula)) {
      maxValue = f(x - 1, y - 1, z + 1, formula);
      (tempCord = [x - 1, y - 1]), z + 1;
    }
    if (maxValue < f(x - 1, y, z + 1, formula)) {
      maxValue = f(x - 1, y, z + 1, formula);
      tempCord = [x - 1, y, z + 1];
    }
    if (maxValue < f(x - 1, y + 1, z + 1, formula)) {
      maxValue = f(x - 1, y + 1, z + 1, formula);
      tempCord = [x - 1, y + 1, z + 1];
    }

    if (maxValue < f(x, y + 1, z, formula)) {
      maxValue = f(x, y + 1, z, formula);
      tempCord = [x, y + 1, z];
    }
    if (maxValue < f(x + 1, y + 1, z, formula)) {
      maxValue = f(x + 1, y + 1, z, formula);
      tempCord = [x + 1, y + 1, z];
    }
    if (maxValue < f(x + 1, y, z, formula)) {
      maxValue = f(x + 1, y, z, formula);
      tempCord = [x + 1, y, z];
    }
    if (maxValue < f(x + 1, y - 1, z, formula)) {
      maxValue = f(x + 1, y - 1, z, formula);
      tempCord = [x + 1, y - 1, z];
    }
    if (maxValue < f(x, y - 1, z, formula)) {
      maxValue = f(x, y - 1, z, formula);
      tempCord = [x, y - 1, z];
    }
    if (maxValue < f(x - 1, y - 1, z, formula)) {
      maxValue = f(x - 1, y - 1, z, formula);
      tempCord = [x - 1, y - 1, z];
    }
    if (maxValue < f(x - 1, y, z, formula)) {
      maxValue = f(x - 1, y, z, formula);
      tempCord = [x - 1, y, z];
    }
    if (maxValue < f(x - 1, y + 1, z, formula)) {
      maxValue = f(x - 1, y + 1, z, formula);
      tempCord = [x - 1, y + 1, z];
    }

    if (maxValue < f(x, y, z - 1, formula)) {
      maxValue = f(x, y, z - 1, formula);
      tempCord = [x, y, z - 1];
    }
    if (maxValue < f(x, y + 1, z - 1, formula)) {
      maxValue = f(x, y + 1, z - 1, formula);
      tempCord = [x, y + 1, z - 1];
    }
    if (maxValue < f(x + 1, y + 1, z - 1, formula)) {
      maxValue = f(x + 1, y + 1, z - 1, formula);
      tempCord = [x + 1, y + 1, z - 1];
    }
    if (maxValue < f(x + 1, y, z - 1, formula)) {
      maxValue = f(x + 1, y, z - 1, formula);
      tempCord = [x + 1, y, z - 1];
    }
    if (maxValue < f(x + 1, y - 1, z - 1, formula)) {
      maxValue = f(x + 1, y - 1, z - 1, formula);
      tempCord = [x + 1, y - 1, z - 1];
    }
    if (maxValue < f(x, y - 1, z - 1, formula)) {
      maxValue = f(x, y - 1, z - 1, formula);
      tempCord = [x, y - 1, z - 1];
    }
    if (maxValue < f(x - 1, y - 1, z - 1, formula)) {
      maxValue = f(x - 1, y - 1, z - 1, formula);
      tempCord = [x - 1, y - 1, z - 1];
    }
    if (maxValue < f(x - 1, y, z - 1, formula)) {
      maxValue = f(x - 1, y, z - 1, formula);
      tempCord = [x - 1, y, z - 1];
    }
    if (maxValue < f(x - 1, y + 1, z - 1, formula)) {
      maxValue = f(x - 1, y + 1, z - 1, formula);
      tempCord = [x - 1, y + 1, z - 1];
    }
    return tempCord;
  }

  evaluate(xT: number, yT: number, zT: number, f: string): number {
    let x = xT;
    let y = yT;
    let z = zT;
    for (let index = 0; index < f.length; index++) {
      if (f[index] == 'x') {
        f = f.substring(0, index) + "(" +  x + ")" + f.substring(index + 1);
      }
      if (f[index] == 'y') {
        f = f.substring(0, index) + "(" +  y + ")" + f.substring(index + 1);
      }
      if (f[index] == 'z') {
        f = f.substring(0, index) + "(" +  z + ")" + f.substring(index + 1);
      }
    }
    return Function('return ' + f)();
  }
}
