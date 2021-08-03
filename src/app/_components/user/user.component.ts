import { ClientSocial } from './../../_models/ClientSocial';
import { ClientPersonal } from './../../_models/ClientPersonal';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public clientPersonalDto: ClientPersonal;
  public clientSocialDto: ClientSocial;



  constructor() { }

  ngOnInit(): void {
    this.clientPersonalDto = JSON.parse(localStorage.getItem('clientPersonalDto'));
    this.clientSocialDto = JSON.parse(localStorage.getItem('clientSocialDto'));
  }




}
