import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 *  @Author Marcos Abreu
 * 
 *  Manages REST calls with the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class WatchService {

  private baseURL: string = "http://localhost:4200/api";

  constructor(private http: HttpClient) { }

  /**
   * Obtains all words inserted into the database.
   */
    public getWords(): Observable<HttpResponse<any[]>> {
      let url = this.baseURL + "/words";
    return this.http.get<any[]>(url, { observe: 'response' });
  }
}
