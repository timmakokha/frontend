import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../../../../libs/users/src/lib/services/users.service";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../../../../../../libs/users/src/lib/models/userModel";
import {Subject, timer} from "rxjs";
import {Location} from "@angular/common";

import * as countryLib from 'i18n-iso-countries'




import i18n_iso_countries from "i18n-iso-countries/langs/en.json";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'frontend-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, OnDestroy {

  declare  require: (arg0: string) => countryLib.LocaleData;

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    isAdmin: [false],
    street: [''],
    apartment: [''],
    zip: [''],
    city: [''],
    country: ['']
  })
  isSubmitted = false;
  editmode = false;
  currentUserId: string = '';
  countries:{ name: string; id: string }[] = [];

  endsubs$: Subject<any> = new Subject<any>();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}


  ngOnDestroy(): void {
    this.endsubs$.complete()
  }

  ngOnInit(): void {
    //this._initUserForm();
    this._getCountries()
    this._checkEditMode();
  }

  private _getCountries(){
    countryLib.registerLocale(i18n_iso_countries)
   this.countries = Object.entries(countryLib.getNames('en', {select: "official"})).map(
     (value) =>{
       return {

         id: value[0],
         name: value[1]

       }
     }
    );
  }


  private _addUser(user: UserModel) {

    this.usersService.createUser(user).pipe(takeUntil(this.endsubs$)).subscribe(data =>{
      this.messageService.add({severity:"success", summary:"Adding successful", detail: ""})
        timer(2000).toPromise().then(done => {
          this.location.back()
        })
      }, error => this.messageService.add({severity:"success", summary:"Deletion successful", detail: error.message})
    )
  }

  private _updateUser(userId: string , user: UserModel) {
    this.usersService.updateUser(userId,user).pipe(takeUntil(this.endsubs$)).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.usersService.getUserById(params.id).pipe(takeUntil(this.endsubs$)).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'warning',
        summary: 'warning',
        detail: `Please fill all required fields`
      });
      return;
    }
    const user: UserModel = {
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    };
    if (this.editmode) {
      this._updateUser(this.currentUserId,user);
    }
      this._addUser(user);
  }

  onCancle() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }

}
