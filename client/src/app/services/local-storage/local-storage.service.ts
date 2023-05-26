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
    return dataJson;
  }

  setLocalStorageData(expensesData:any) {
    let data = this.getLocalStorageData();
    if (data) {
      data.push(expensesData)
      return localStorage.setItem(this.nameOfStorage,JSON.stringify(data))
    }
    return localStorage.setItem(this.nameOfStorage, JSON.stringify([expensesData]));
  }
}
