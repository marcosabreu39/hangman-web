import { Hangman } from './../model/hangman.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  private baseURL: string = "http://localhost:4200/api";

  constructor(private http: HttpClient) { }

  /**
   * Obtains a random word from database
   * 
   * @returns 
   */
  public getWord(): Observable<HttpResponse<any>> {
    let url = this.baseURL + "/word";
    return this.http.get<any[]>(url, { observe: 'response' });
  }

  /**
   * Proccess Hangman game requisition
   * 
   * @param hangman 
   * @returns 
   */
  public processGame(hangman: Hangman): Observable<any> {
    let url = this.baseURL + "/word";
    let body = JSON.stringify(hangman);
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let httpOptions: any = { headers: headers, observe: "response" };
    return this.http.post<any>(url, body, httpOptions);
  }
}
