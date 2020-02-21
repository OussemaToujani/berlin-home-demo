import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor(private httpClient: HttpClient) { }

  public calculateDistance( latX: number, logX: number, latY: number, logY: number ): Observable<any> {
    return this.httpClient.get<any>(environment.GOOGLE_MAPS_API_URL +
      'origin=' + latX + ',' + logX + '&destination=' + latY + ',' + logY + '&key=' + environment.API_KEY, httpOptions
    );
  }
}
