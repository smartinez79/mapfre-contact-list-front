import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent implements OnInit {

  @Output() formEvent = new EventEmitter<string>(); //https://angular.io/guide/inputs-outputs
  @Input() contact: Contact;

  public alias: string = '';

  public formContact: FormGroup = new FormGroup({ //https://angular.io/guide/reactive-forms
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required])
    }),
    aliases: new FormArray([], [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
    if(this.contact){
      this.formContact.addControl("id", new FormControl('', [Validators.required]))
      this.formContact.patchValue(this.contact);
      //hay que recorrer los aliases para poder setarlos
      this.contact.aliases.forEach((a) => {
        let control = new FormControl(a, [Validators.required]);
        (this.formContact.controls.aliases as FormArray).push(control);
      });
    }
    console.log(this.contact);
  }
  submit() {
    this.formContact.markAllAsTouched(); //Para marcarlos todos y ponerle la clase rojita
    if(this.formContact.valid){
      this.formEvent.emit(this.formContact.value);
      this.formContact.reset();
    }
  }

  addAlias() {
    (this.formContact.controls.aliases as FormArray).push(new FormControl('', [Validators.required]));
  }

  removeAlias(index: number) {
    (this.formContact.controls.aliases as FormArray).removeAt(index);
  }
}
