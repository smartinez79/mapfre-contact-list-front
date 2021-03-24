import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  @Output() backEvent = new EventEmitter<any>(); //https://angular.io/guide/inputs-outputs
  @Input() contact: Contact;

  constructor(private contactSrv: ContactService) { }

  ngOnInit(): void {
  }

  backToList() {
    this.backEvent.emit();
  }

  editContact($event: Contact) {
    this.contactSrv.updateContact($event).toPromise().then((result) => {
      alert('Contacto con id ' + $event.id + ' actualizado correctamente');
      this.backToList();
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

}
