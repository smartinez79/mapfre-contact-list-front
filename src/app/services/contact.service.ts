import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public url: string = 'http://localhost:4200'

  constructor(private http: HttpClient) { }

  get(endPoint) {
    return new Promise((resolve, reject) => {
      //let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.basicAuth });
      let headers = new HttpHeaders({ 'accept': '*/*' });
      let options = { headers: headers };
      this.http.get(this.url + endPoint, options)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject({ error: error });
        });
    });
  }

  post(endPoint, body?, headers?) {
    return new Promise((resolve, reject) => {
      //let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.basicAuth });
      if (!headers) {
        headers = new HttpHeaders({ 'accept': '*/*' });
      }
      let options = { headers: headers, observe: ('response' as "body") };
      //let bodyPost = JSON.stringify(body);
      this.http.post<HttpResponse<any>>(this.url + endPoint, body, options)
        .subscribe((data) => {
          if (data.status === 200 || data.status === 201) {
            console.log(data.body);
            resolve(data.body);
          } else {
            reject(data);
          }

        }, error => {
          reject({ error: error });
        });
    });
  }

  patch(endPoint, id, body) {
    return new Promise((resolve, reject) => {
      //let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.basicAuth });
      let headers = new HttpHeaders({ 'accept': '*/*' });
      let options = { headers: headers, observe: ('response' as "body") };
      let bodyPost = JSON.stringify(body);
      this.http.patch<HttpResponse<any>>(this.url + endPoint + "/" + id, bodyPost, options)
        .subscribe((data) => {
          if (data.status === 200 || data.status === 204) {
            console.log(data.body);
            resolve(data.body);
          } else {
            reject({ error: data });
          }

        }, error => {
          reject({ error: error });
        });
    });
  }

  put(endPoint, id?, body?, headers?) {
    return new Promise((resolve, reject) => {
      //let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.basicAuth });
      if (!headers) {
        headers = new HttpHeaders({ 'accept': '*/*' });
      }
      let options = { headers: headers, observe: ('response' as "body") };
      //let bodyPost = JSON.stringify(body);
      let url = this.url + endPoint;
      if (id) {
        url = this.url + endPoint + "/" + id;
      }
      this.http.put<HttpResponse<any>>(url, body, options)
        .subscribe((data) => {
          if (data.status === 200 || data.status === 204) {
            console.log(data.body);
            resolve(data.body);
          } else {
            reject({ error: data });
          }

        }, error => {
          reject({ error: error });
        });
    });
  }

  delete(endPoint, headers?, responseType?) {
    return new Promise((resolve, reject) => {
      if (!headers) {
        headers = new HttpHeaders({ 'accept': '*/*' });
      }
      let options: any = { headers: headers };
      if (responseType) {
        options.responseType = responseType;
      }

      this.http.delete(this.url + endPoint, options)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject({ error: error });
        });
    });
  }

  getAllContacts() {
    return this.get('/api/people');
  }

  newContact(contact: Contact) {
    return this.post('/api/people', contact);
  }
  updateContact(contact: Contact) {
    return this.put('/api/people', '', contact);
  }
}
