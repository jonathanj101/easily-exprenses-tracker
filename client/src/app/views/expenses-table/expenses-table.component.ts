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
  public allChecked: Boolean = false
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
      this.openSnackBar("Loading your expenses!", "Info")
    },1000)
    if (expensesDataJson) {
      this.progressBar();
      setTimeout(()=>{
        this.expensesArr = expensesDataJson;
        this.expensesArr.forEach((expense,index) => {
          expense.index=index
          expense.isChecked=false
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
      setTimeout(() => {
        this.openSnackBar("Your expenses loaded successfully!","Success")
      }, 8000)
    } else {
      setTimeout(() => {
        this.openSnackBar("No expenses to show! Add some!", "Info")
      },3000)
      return;
    }

    
  }

  expenseSelected(expense:any) {
    this.expensesArr[expense.index].isChecked = !this.expensesArr[expense.index].isChecked
  }

  deleteExpenses() {
    const selectedExpenses: Array<any> = [];
    setTimeout(() => {
    this.expensesArr.forEach(expense => {
      if (expense.isChecked){
        selectedExpenses.push(expense)
      }
    })
    selectedExpenses.forEach(expense=> {
      this.expensesArr.splice(expense.index,1)
    })
    this.expensesArr.forEach((expense,index) => {
      expense.index = index
    })
      this.openSnackBar("Deleting your expenses! Please Wait", 'Info')
    },3000)

    setTimeout(()=> {
      this.localStorageApi.updateLocalStorageData(this.expensesArr)
      this.openSnackBar("Expenses deleted successfully!", "Success")
    },6000)

    setTimeout(() => {
      window.location.reload()
    },8000)

  }

  onChangePage(event:PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.expensesArr.length) {
      endIndex = this.expensesArr.length
    }
    console.log(this.expensesArr.slice(startIndex,endIndex))
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
