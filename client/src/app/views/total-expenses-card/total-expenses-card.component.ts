import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-total-expenses-card',
  templateUrl: './total-expenses-card.component.html',
  styleUrls: ['./total-expenses-card.component.scss']
})
export class TotalExpensesCardComponent implements OnInit {
  public totalGross: number = 0
  public totalIncome: number = 0
  public totalExpenses: number = 0


  constructor(
    private localStorageApi: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.fetchLocalStorageData();
  }

  fetchLocalStorageData() {
    const {expensesDataJson} = this.localStorageApi.getLocalStorageData();
    if (expensesDataJson) {
      expensesDataJson.forEach(expense => {

        if (expense.isIncome === true) {
          this.totalIncome += expense.amount
        } else {
          this.totalExpenses += expense.amount
        }
      })
      this.totalGross = (this.totalIncome - this.totalExpenses)
    }
    else {
      return;
    }
  }

}
