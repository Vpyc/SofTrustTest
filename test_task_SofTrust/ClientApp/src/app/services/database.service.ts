import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Topic {
  id: number;
  topic: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'https://localhost:7223/api/topics';

  constructor(private http: HttpClient) { }

  getTopics() {
    return this.http.get<Topic[]>(this.apiUrl);
  }
}
