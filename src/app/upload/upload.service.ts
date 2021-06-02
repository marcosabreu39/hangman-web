import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 *  @Author Marcos Abreu
 * 
 *  Manages REST calls with the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseURL: string = "http://localhost:4200/api";

  constructor(private http: HttpClient) { }

  /**
   * Sends a uploaded file to the backend to be saved.
   */
  public uploadFile(file: any): Observable<any> {
    let url = this.baseURL + "/words";
    let body = JSON.stringify(file);
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let httpOptions: any = { headers: headers, observe: "response" };
    return this.http.post<any>(url, body, httpOptions);
  }
}
