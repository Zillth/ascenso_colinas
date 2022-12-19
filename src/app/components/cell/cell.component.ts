import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() value: number = 0;
  @Input() coordenates: number[] = [];
  @Input() initState: number[] = [];
  @Input() goalState: number[] = [];
  @Input() obstacles: number[][] = [];
  @Input() isPath: boolean = false;
  @Output() setPurpose = new EventEmitter<number[]>();

  handleClick() {
    this.setPurpose.emit(this.coordenates);
  }

  returnBackground(): string {
    if (this.coordenates == this.initState) {
      return 'red';
    } else if (this.coordenates == this.goalState) {
      return 'green';
    } else if (this.obstacles.includes(this.coordenates)) {
      return 'gray';
    } else if (this.isPath) {
      return 'lightblue';
    }
    return 'white';
  }
}
