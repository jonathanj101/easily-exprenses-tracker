import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  nameOfStorage: string = "expenses";
  

  constructor() { }

  ngOnInit(){

  }

  clear() {
    localStorage.clear()
  }

  getLocalStorageData() {
    const dataJson = JSON.parse(localStorage.getItem(this.nameOfStorage)!);
    console.log(dataJson);
    return dataJson;
  }

  setLocalStorageData(expensesData:any) {
    console.log(expensesData);
    let data = this.getLocalStorageData();
    if (data) {
      console.log(data);
      data.push(expensesData)
      console.log(data)
      return localStorage.setItem(this.nameOfStorage,JSON.stringify(data))
    }
    return localStorage.setItem(this.nameOfStorage, JSON.stringify([expensesData]));
  }
}
