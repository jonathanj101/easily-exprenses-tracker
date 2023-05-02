import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// third party libraries
import { throwError } from 'rxjs';
import {catchError,map,tap} from "rxjs/operators";

// Environment
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class AppHttpService {
  public hostUrl = environment.API_URL;
  constructor(
    public httpClient: HttpClient,
  ) { }

  post_csv(url:any,csvFile:any){
    const file = new FormData();
    file.append("file",new Blob([csvFile], {type:"text/csv"}),csvFile.name);
    return this.httpClient
    .post<any>(this.hostUrl+url,file)
    .pipe(
      map(respData => {
        if (respData){
          return respData
        } else {
          return []
        }
      }), tap(), catchError(this.handleError)
    )
  }


  public handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError(error.error);
};

}
