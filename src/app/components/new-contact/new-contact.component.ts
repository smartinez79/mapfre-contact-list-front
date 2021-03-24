import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  constructor(public contactSrv: ContactService) { }

  ngOnInit(): void {
  }

  newContact($event){
    this.contactSrv.newContact($event).toPromise().then((result)=>{
      alert('Creado correctamente');
    }).catch((err)=>{
      alert(JSON.stringify(err));
    })
  }

}
