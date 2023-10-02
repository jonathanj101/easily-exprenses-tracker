import { Injectable } from '@angular/core';

import { AppHttpService } from './app-http/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpService: AppHttpService
  ) { }

  uploadFile(file:any) {
    return this.httpService.post_csv("csv/upload-csv",file);
  }
}
