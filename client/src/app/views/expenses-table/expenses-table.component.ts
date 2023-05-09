import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {
  expensesArr: Array<any> = [];
  typeOf: String = "";
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
    }
    return;
    
  }

}
