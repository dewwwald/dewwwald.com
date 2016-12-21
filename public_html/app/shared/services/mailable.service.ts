import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MailableService
{
  constructor(private http: Http)
  {

  }

  sendMail(postLink, message)
  {
    return this.http.post(postLink, message)
      .toPromise()
      .then(response => console.log(response.json().data));
      // .catch(this.handleError);
  }
}
