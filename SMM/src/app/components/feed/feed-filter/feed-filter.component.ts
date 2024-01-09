import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilterParams } from '../../../shared-interfaces';
@Component({
  selector: 'app-feed-filter',
  templateUrl: './feed-filter.component.html',
  styleUrls: ['./feed-filter.component.css'],
})
export class FeedFilterComponent {
  @Output() filterChange = new EventEmitter<FilterParams>();

  filterForm!: NgForm;
  filterParams: FilterParams = {
    orderBy: 'oldest',
    contentTypes: ['all'], 
    contentPopularity: ['all'],
  };

  applyFilter(form: NgForm) {
    this.filterChange.emit(this.filterParams);
  }
}
