import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from "@angular/material/snack-bar";

// Libraries

import { MatPaginatorModule } from "@angular/material/paginator"
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

// Components

import { AppComponent } from './app.component';
import { UploadCsvComponent } from './views/upload-csv/upload-csv.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastComponent } from './views/toast/toast.component';
import { ExpensesTableComponent } from './views/expenses-table/expenses-table.component';
import { TotalExpensesCardComponent } from './views/total-expenses-card/total-expenses-card.component';
import { ManualEntryComponent } from './views/manual-entry/manual-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadCsvComponent,
    ToastComponent,
    ExpensesTableComponent,
    TotalExpensesCardComponent,
    ManualEntryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
