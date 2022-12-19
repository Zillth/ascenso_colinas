import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  matrix: number[][] = Array(20)
    .fill(null)
    .map(() => Array(20).fill(null));

  heuristicMatrix: number[][] = Array(20)
    .fill(null)
    .map(() => Array(20).fill(null));

  selected = 0;
  initState: number[] = [];
  goalState: number[] = [];
  obstacles: number[][] = [];
  path: number[][] = [];

  changeSelected(n: number) {
    this.selected = n;
  }

  getClass(active: number): string {
    if (this.selected == active) {
      return 'btn active';
    }
    return 'btn';
  }

  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  setState(coordenates: number[]) {
    switch (this.selected) {
      case 1:
        this.initState = coordenates;
        break;
      case 2:
        this.goalState = coordenates;
        break;
      case 3:
        if (this.obstacles.includes(coordenates)) {
          this.obstacles.splice(this.obstacles.indexOf(coordenates), 1);
        } else {
          this.obstacles.push(coordenates);
        }
        break;
      default:
        break;
    }
  }

  reset() {
    this.path = [];
    this.heuristicMatrix = Array(20)
      .fill(null)
      .map(() => Array(20).fill(null));
    this.initState = [];
    this.goalState = [];
    this.obstacles = [];
  }

  async hillClimber() {
    this.path = [];
    this.changeSelected(0);
    await this.heuristic();
    let iteration = 0;
    let cord: number[] = this.initState;
    while (iteration < 100) {
      await this.delay(800);
      cord = this.findPath(cord[0], cord[1]);
      if (cord[0] == this.goalState[0] && cord[1] == this.goalState[1]) {
        break;
      }
      this.path.push(cord);
      iteration++;
    }
  }

  isPath(x: number, y: number) {
    let s: boolean = false;
    this.path.forEach((r) => {
      if (r[0] == x && r[1] == y) {
        s = true;
      }
    });
    return s;
  }

  findPath(x: number, y: number): number[] {
    let maxValue: number = 0;
    let tempCord: number[] = [];
    if (y + 1 < this.heuristicMatrix.length) {
      if (maxValue < this.heuristicMatrix[x][y + 1]) {
        maxValue = this.heuristicMatrix[x][y + 1];
        tempCord = [x, y + 1];
      }
    }
    if (
      y + 1 < this.heuristicMatrix.length &&
      x + 1 < this.heuristicMatrix.length
    ) {
      if (maxValue < this.heuristicMatrix[x + 1][y + 1]) {
        maxValue = this.heuristicMatrix[x + 1][y + 1];
        tempCord = [x + 1, y + 1];
      }
    }
    if (x + 1 < this.heuristicMatrix.length) {
      if (maxValue < this.heuristicMatrix[x + 1][y]) {
        maxValue = this.heuristicMatrix[x + 1][y];
        tempCord = [x + 1, y];
      }
    }
    if (x + 1 < this.heuristicMatrix.length && y - 1 > -1) {
      if (maxValue < this.heuristicMatrix[x + 1][y - 1]) {
        maxValue = this.heuristicMatrix[x + 1][y - 1];
        tempCord = [x + 1, y - 1];
      }
    }
    if (y - 1 > -1) {
      if (maxValue < this.heuristicMatrix[x][y - 1]) {
        maxValue = this.heuristicMatrix[x][y - 1];
        tempCord = [x, y - 1];
      }
    }
    if (y - 1 > -1 && x - 1 > -1) {
      if (maxValue < this.heuristicMatrix[x - 1][y - 1]) {
        maxValue = this.heuristicMatrix[x - 1][y - 1];
        tempCord = [x - 1, y - 1];
      }
    }
    if (x - 1 > -1) {
      if (maxValue < this.heuristicMatrix[x - 1][y]) {
        maxValue = this.heuristicMatrix[x - 1][y];
        tempCord = [x - 1, y];
      }
    }
    if (y + 1 < this.heuristicMatrix.length && x - 1 > -1) {
      if (maxValue < this.heuristicMatrix[x - 1][y + 1]) {
        maxValue = this.heuristicMatrix[x - 1][y + 1];
        tempCord = [x - 1, y + 1];
      }
    }
    return tempCord;
  }

  heuristic() {
    let maxLenght: number = Math.sqrt(2 * Math.pow(this.matrix.length, 2));
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        this.heuristicMatrix[j][i] = Number(
          (
            maxLenght -
            Math.sqrt(
              Math.pow(j - this.goalState[0], 2) +
                Math.pow(i - this.goalState[1], 2)
            )
          ).toFixed(2)
        );
      }
    }
    this.obstacles.forEach((obstacle) => {
      this.heuristicMatrix[obstacle[0]][obstacle[1]] = 0;
    });
  }
}
