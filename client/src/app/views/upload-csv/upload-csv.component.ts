import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ToastComponent } from '../toast/toast.component';


@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {
  // public fileUploadForm: FormGroup<any>;
  public fileName: String = "Choose File";
  fileToUpload: File = null!;
  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar

  ) { 
  }

  ngOnInit(): void {

  }

  openSnackBar(message:string,action:string) {
    this._snackBar.openFromComponent(ToastComponent, {
      data:{
        message:message,
        action:action
      },
      verticalPosition:"top",
      horizontalPosition:'right'
    })
  }

}
