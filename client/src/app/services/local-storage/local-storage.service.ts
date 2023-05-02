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
  }

  setLocalStorageData(expensesData:any) {
    console.log(expensesData);
    return localStorage.setItem(this.nameOfStorage, JSON.stringify(expensesData));
  }
}
