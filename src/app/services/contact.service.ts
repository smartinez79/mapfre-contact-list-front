import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAllContacts() {
    return this.http.get<Contact[]>('/api/people');
  }
  newContact(contact: Contact) {
    return this.http.post<Contact>('/api/people', contact);
  }
  updateContact(contact: Contact) {
    return this.http.put<Contact>('/api/people', contact);
  }
}
