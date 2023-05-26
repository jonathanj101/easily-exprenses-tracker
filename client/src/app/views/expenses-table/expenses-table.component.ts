import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {
  public expensesArr: Array<any> = [];
  public expensesArrSliced: Array<any> = [];
  public typeOf: String = "";
  constructor(
    private localStorageApi: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.fetchLocalStorageData();
  }

  fetchLocalStorageData() {
    const data = this.localStorageApi.getLocalStorageData()
    if (data) {
    this.expensesArr = data;
    this.expensesArrSliced = this.expensesArr.slice(0,5);
    }
    return;
    
  }

  onChangePage(event:PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.expensesArr.length) {
      endIndex = this.expensesArr.length
    }
    this.expensesArrSliced = this.expensesArr.slice(startIndex,endIndex)
  }

}
