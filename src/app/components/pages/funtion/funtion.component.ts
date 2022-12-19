import { Component } from '@angular/core';

@Component({
  selector: 'app-funtion',
  templateUrl: './funtion.component.html',
  styleUrls: ['./funtion.component.css'],
})
export class FuntionComponent {
  formInput: string = '';
  inputa: number = 0;
  inputb: number = 0;
  initState: number[] = [];
  path: number[][] = [];
  currentFunction: number = 0;

  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async hillClimber(f: number) {
    let a: number = this.inputa;
    let b: number = this.inputb;
    this.initState = [
      Number(this.formInput.split(',')[0]),
      Number(this.formInput.split(',')[1]),
    ];
    this.currentFunction = f;
    this.path = [];
    let iteration = 0;
    let cord: number[] = this.initState;
    while (iteration < 100) {
      await this.delay(500);
      switch (this.currentFunction) {
        case 1:
          cord = this.findPath(cord[0], cord[1], a, b, this.rosenbrock);
          break;
        case 2:
          cord = this.findPath(cord[0], cord[1], a, b, this.ex2);
          break;
        case 3:
          cord = this.findPath(cord[0], cord[1], a, b , this.ex4);
          break;
        default:
          break;
      }
      if (this.path.length > 0) {
        if (
          this.path[this.path.length - 1][0] == cord[0] &&
          this.path[this.path.length - 1][1] == cord[1]
        ) {
          break;
        }
      }
      this.path.push(cord);
      iteration++;
    }
  }

  findPath(x: number, y: number, a:number, b:number, f: Function): number[] {
    let maxValue: number = f(x, y, a, b);
    let tempCord: number[] = [x, y];
    if (maxValue < f(x, y + 1, a, b)) {
      maxValue = f(x, y + 1, a, b);
      tempCord = [x, y + 1];
    }
    if (maxValue < f(x + 1, y + 1, a, b)) {
      maxValue = f(x + 1, y + 1, a, b);
      tempCord = [x + 1, y + 1];
    }
    if (maxValue < f(x + 1, y, a, b)) {
      maxValue = f(x + 1, y, a, b);
      tempCord = [x + 1, y];
    }
    if (maxValue < f(x + 1, y - 1, a, b)) {
      maxValue = f(x + 1, y - 1, a, b);
      tempCord = [x + 1, y - 1];
    }
    if (maxValue < f(x, y - 1, a, b)) {
      maxValue = f(x, y - 1, a, b);
      tempCord = [x, y - 1];
    }
    if (maxValue < f(x - 1, y - 1, a, b)) {
      maxValue = f(x - 1, y - 1, a, b);
      tempCord = [x - 1, y - 1];
    }
    if (maxValue < f(x - 1, y, a, b)) {
      maxValue = f(x - 1, y, a, b);
      tempCord = [x - 1, y];
    }
    if (maxValue < f(x - 1, y + 1, a, b)) {
      maxValue = f(x - 1, y + 1, a, b);
      tempCord = [x - 1, y + 1];
    }
    return tempCord;
  }

  rosenbrock(x: number, y: number, a: number, b: number): number {
    return -Math.pow(a - x, 2) - b * Math.pow(y - Math.pow(x, 2), 2);
  }

  ex2(x: number, y: number): number {
    return -(
      Math.pow(Math.pow(x, 2) + y - 11, 2) + Math.pow(x + Math.pow(y, 2) - 7, 2)
    );
  }

  ex4(x: number, y: number): number {
    return -(Math.pow(x, 2) - 24 * x + Math.pow(y, 2) - 10 * y);
  }
}
