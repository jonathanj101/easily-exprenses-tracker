import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {
  public expensesArr: Array<any> = [];
  public expensesArrSliced: Array<any> = [];
  public typeOf: String = "";
  public progress: String = ""
  public showProgress: String = ""
  constructor(
    private localStorageApi: LocalStorageService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchLocalStorageData();
  }

  fetchLocalStorageData() {
    const {expensesDataJson} = this.localStorageApi.getLocalStorageData()
    setTimeout(()=>{
      this.openSnackBar("Loading your expenses!", "Warning")
    },1000)
    if (expensesDataJson) {
      this.progressBar();
      setTimeout(()=>{
        this.expensesArr = expensesDataJson;
        this.expensesArr.forEach(expense => {
          if (expense.isIncome == undefined) {
            if (expense.amount < 0) {
              expense.isIncome = false
            } else {
              expense.isIncome = true
            }
          }
        })
        this.expensesArrSliced = this.expensesArr.slice(0,5);
        
      },6000)


      setTimeout(()=>{
        this.progress = "none"
      },7000)
    } else {
      setTimeout(() => {
        this.openSnackBar("No expenses to show! Add some!", "Info")
      },3000)
      return;
    }

    
  }



  onChangePage(event:PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.expensesArr.length) {
      endIndex = this.expensesArr.length
    }
    this.expensesArrSliced = this.expensesArr.slice(startIndex,endIndex)
  }

  progressBar() {
    this.showProgress = "showProgress"
    const progression = setInterval(()=>{
    switch(this.progress) {
      case "":
        this.progress = "customWidth-0"
        break;
      case "customWidth-0":
        this.progress = "customWidth-25"
        break;
      case "customWidth-25":
        this.progress = "customWidth-50"
        break;
      case "customWidth-50":
        this.progress = "customWidth-75"
        break;
      case "customWidth-75":
        this.progress = "customWidth-100";
        break;
      default:
        this.progress
        break;
    }

  },1000)

  setTimeout(()=>{
    clearInterval(progression)
  },6000)
}

  openSnackBar(message:string,action:string) {
    this._snackBar.openFromComponent(ToastComponent, {
      data:{
        message:message,
        action:action
      },
      duration:6000,
      verticalPosition:"top",
      horizontalPosition:'right'
    })
  }

}
