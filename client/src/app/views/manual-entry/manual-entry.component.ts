import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.scss']
})
export class ManualEntryComponent implements OnInit {
  isFormControlEmpty: Boolean = true;
  formGroup: FormGroup;
  name: FormControl;
  description: FormControl;
  amount: FormControl;
  date: FormControl;
  constructor(
    private localStorageApi: LocalStorageService,
    private router:Router,
    private route: ActivatedRoute
  ) { 

    this.name = new FormControl("",[Validators.required,Validators.minLength(5)])
    this.description = new FormControl("",[Validators.required,Validators.minLength(5)])
    this.amount = new FormControl("",[Validators.required,Validators.min(1)])
    this.date = new FormControl("",Validators.required)

    this.formGroup = new FormGroup({
      name:this.name,
      description:this.description,
      amount: this.amount
    })
  }

  ngOnInit(): void {
  }

  onChange() {
    if (this.formGroup.valid) {
      return this.isFormControlEmpty = false;
    };
    return this.isFormControlEmpty = true;
  }


  addIncome() {
    console.log("add income clicked!");
    const incomeObj = {
      name: this.name.value.toUpperCase(),
      description: this.description.value.toUpperCase(),
      amount: this.amount.value,
      date:this.date.value,
      isIncome: true
    }
    this.localStorageApi.setLocalStorageData(incomeObj);
    this.formGroup.reset()
    this.isFormControlEmpty = true;
    window.location.reload()
  }

  addExpense() {
    console.log("add expense clicked!");
    const expenseObj = {
      name: this.name.value.toUpperCase(),
      description: this.description.value.toUpperCase(),
      amount: this.amount.value,
      date:this.date.value,
      isIncome: false
    }
    this.localStorageApi.setLocalStorageData(expenseObj);
    this.formGroup.reset()
    this.isFormControlEmpty = true
    window.location.reload()


  }
}

