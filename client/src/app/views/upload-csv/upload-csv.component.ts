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
  public uploadFileTitle: String = "SOME";
  public progress: String = ""
  public showProgress: String = ""
  public isFileImported: Boolean = false;
  public fileName: String = "Choose File";
  private fileToUpload: File | any = null!;

  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar

  ) { 
  }

  ngOnInit(): void {
    // this.progressBar();
  
  }

  submit() {
    this.uploadFile(this.fileToUpload)
  }

  onChange(event:Event){
    console.log(event)

    const file = (<HTMLInputElement>event.target).files;
    this.fileToUpload = file !== null ? file[0] : file
    this.isFileImported = true
    console.log(this.fileToUpload);

  }

  uploadFile(file:FileList) {
    this.apiService.uploadFile(file).subscribe(res=>{
      console.log(res)
      // console.log(res)
    }, error  => {
      console.log(error)
    })
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
      // duration:3000,
      verticalPosition:"top",
      horizontalPosition:'right'
    })
  }

}
