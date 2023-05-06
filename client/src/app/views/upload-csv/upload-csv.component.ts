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
  fileToUpload: File = null!;
  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar

  ) { 
  }

  ngOnInit(): void {
    // this.progressBar();
  
  }

  // onChange(files:FileList) {
  //   console.log(files);

  //   const file = files.item(0);
  // }

  onChange(event:Event){
    console.log(event)

    const file = (<HTMLInputElement>event.target).files;
    console.log(file);

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
        // case "":
        //   this.progress = "customWidth-0"
        //   break;
        // case "customWidth-0":
        //   this.progress = "customWidth-5"
        //   break;
        // case "customWidth-5":
        //   this.progress = "customWidth-10"
        //   break;
        // case "customWidth-10":
        //   this.progress = "customWidth-15"
        //   break;
        // case "customWidth-15":
        //   this.progress = "customWidth-20"
        //   break;
        // case "customWidth-20":
        //   this.progress = "customWidth-25"
        //   break;
        // case "customWidth-25":
        //   this.progress = "customWidth-30"
        //   break;
        // case "customWidth-30":
        //   this.progress = "customWidth-35"
        //   break;
        // case "customWidth-35":
        //   this.progress = "customWidth-40"
        //   break;
        // case "customWidth-40":
        //   this.progress = "customWidth-45"
        //   break;
        // case "customWidth-45":
        //   this.progress = "customWidth-50"
        //   break;
        // case "customWidth-50":
        //   this.progress = "customWidth-55"
        //   break;
        // case "customWidth-55":
        //   this.progress = "customWidth-60"
        //   break;
        // case "customWidth-60":
        //   this.progress = "customWidth-65"
        //   break;
        // case "customWidth-65":
        //   this.progress = "customWidth-70"
        //   break;
        // case "customWidth-70":
        //   this.progress = "customWidth-75"
        //   break;
        // case "customWidth-75":
        //   this.progress = "customWidth-80"
        //   break;
        // case "customWidth-80":
        //   this.progress = "customWidth-85"
        //   break;
        // case "customWidth-85":
        //   this.progress = "customWidth-90"
        //   break;
        // case "customWidth-90":
        //   this.progress = "customWidth-95";
        //   break;
        // case "customWidth-95":
        //   this.progress = "customWidth-100";
        //   break;
        // default:
        //   this.progress
        //   break;
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
