import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Topic {
  id: number;
  topic: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  topicId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'https://localhost:7223/api/topics';
  private contactApiUrl = 'https://localhost:7223/api/contacts';

  constructor(private http: HttpClient) { }

  getTopics() {
    return this.http.get<Topic[]>(this.apiUrl);
  }

  sendContact(contact: Contact) {
    return this.http.post<Contact>(this.contactApiUrl, contact);
  }
}
