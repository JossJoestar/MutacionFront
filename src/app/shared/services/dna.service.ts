import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DNA } from '../models/dna.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DnaService {
    httpOptions = {
        headers: new HttpHeaders({
    
        }),
      };
      constructor(protected http: HttpClient) {}
    
      //Obtener consulta de ADN
      queryMutation(dna:any):Observable<any>{
          return this.http.post<any>(`${environment.serverAPIURL}/mutation`, dna)
      }
    
      //Obtener lista de los 10 ultimos ADN consultados
      getList(): Observable<DNA[]> {
        return this.http.get<DNA[]>(`${environment.serverAPIURL}/list`);
      }
    
      //Obtener Status
      getStats(): Observable<any> {
        return this.http.get<any>(`${environment.serverAPIURL}/stats`);
      }
}
