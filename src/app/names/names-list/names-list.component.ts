import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FullNameStorage } from '../models/full-name.model';

@Component({
  selector: 'app-names-list',
  templateUrl: './names-list.component.html',
  styleUrls: ['./names-list.component.scss']
})
export class NamesListComponent {
  
  @Input() public fullNames: FullNameStorage[];
  @Input() public indexSelectedName: number;
  
  @Output() public onSelectName: EventEmitter<any> = new EventEmitter();

  public selectName(index: number): void {
    this.onSelectName.emit(index);
  }
}
