import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-expenses-card',
  templateUrl: './total-expenses-card.component.html',
  styleUrls: ['./total-expenses-card.component.scss']
})
export class TotalExpensesCardComponent implements OnInit {
  public totalBudget: Number = 2500.59
  constructor() { }

  ngOnInit(): void {
  }

}
