import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})

export class ToastComponent implements OnInit {

  status: String = "";
  statusStyle: String = "";
  message: String = "";

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data:any) 
    {
      this.message = this.data.message,
      this.status = this.data.action
    }

  ngOnInit(): void {
    this.openSnackBar(this.status)
  }

  openSnackBar(action:String) {
    switch(action) {
      case "Success":
        this.statusStyle = "Success"
        break;
      case "Warning":
        this.statusStyle = "Warning"
        break;
      case "Info":
        this.statusStyle = "Info"
        break;
      case "Error":
        this.statusStyle = "Error"
        break;
      default:
        this.statusStyle = "Orange"
        break;
    }
  }

}
