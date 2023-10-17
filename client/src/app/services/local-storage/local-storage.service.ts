import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  nameOfStorage: string = "expenses";
  nameOfFilesUploaded: string = ""
  

  constructor() { }

  ngOnInit(){

  }

  clear() {
    localStorage.clear()
  }

  getLocalStorageData() {
    const expensesDataJson = JSON.parse(localStorage.getItem(this.nameOfStorage)!);
    const fileDataJson = JSON.parse(localStorage.getItem(this.nameOfFilesUploaded)!);
    return {expensesDataJson, fileDataJson};
  }

  setLocalStorageData(expensesData:any) {
    let {expensesDataJson} = this.getLocalStorageData();
    if (expensesDataJson) {

        if (expensesData.length !== undefined) {
          expensesData.forEach((expense) => {
            expensesDataJson.push(expense)
          })
        }
        else {
          expensesDataJson.push(expensesData)
        }

        localStorage.setItem(this.nameOfStorage,JSON.stringify(expensesDataJson))
      } else {
        localStorage.setItem(this.nameOfStorage, JSON.stringify([expensesData]))
      }

  }

  updateLocalStorageData(expensesData:any) {

    localStorage.setItem(this.nameOfStorage,JSON.stringify(expensesData))

  }
}
