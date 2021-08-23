import { Component, OnInit } from '@angular/core';
import {AuthService} from "@frontend/users";

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor( private authSvs: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authSvs.logout()
  }

}
