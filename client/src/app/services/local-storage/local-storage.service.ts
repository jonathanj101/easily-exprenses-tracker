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
        // expensesDataJson.push(expensesData)
        expensesData.forEach((expense) => {
          expensesDataJson.push(expense)
        })
      // if (fileData !== "") {
        //   expensesDataJson.push(expensesData)
        // }    
        localStorage.setItem(this.nameOfStorage,JSON.stringify(expensesDataJson))
      } else {
        localStorage.setItem(this.nameOfStorage, JSON.stringify([expensesData]))
      }
    // if (fileDataJson){
    //   if (fileData != "") {
    //     fileDataJson.push(fileData)
    //     // return localStorage.setItem(this.nameOfFilesUploaded, JSON.stringify(fileDataJson))
    //   }
    // }
    // localStorage.setItem(this.nameOfStorage, JSON.stringify([fileDataJson]));
  }
}
