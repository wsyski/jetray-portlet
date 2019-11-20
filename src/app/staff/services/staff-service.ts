import { Injectable }     from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {StaffMember} from '../models/staff-member';

@Injectable()
export class StaffService {

     // private instance variable to hold base url
     private staffUrl = "http://jsonplaceholder.typicode.com/users"; 

     // Resolve HTTP using the constructor
     constructor (private httpClient: HttpClient) {}

     // Fetch all existing staff
     getStaffMembers(): Observable<StaffMember[]> {
         return this.httpClient.get<StaffMember[]>(this.staffUrl)
             .pipe(catchError((httpErrorResponse: HttpErrorResponse) => throwError(httpErrorResponse.error)));
     }
}
