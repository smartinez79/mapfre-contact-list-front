import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public showList: boolean = true;
  public contactSelect: Contact;

  public contacts: Contact[] = [];

  constructor(public contactSrv: ContactService) { }

  ngOnInit(): void {
    this.contactSrv.getAllContacts().then((response: Contact[]) => {
      this.contacts = response
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  editContact(contact:Contact){
    this.showList = false;
    this.contactSelect = contact;
  }

  resetContact(){
    this.ngOnInit(); //para volver a cargar el listado;
    this.showList = true;
    this.contactSelect = undefined;
  }

}
