import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserModel} from "../../../../../../../libs/users/src/lib/models/userModel";
import {UsersService} from "../../../../../../../libs/users/src/lib/services/users.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'frontend-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: UserModel[] = []
  endsubs$: Subject<any> = new Subject<any>();
  constructor(private userSvs: UsersService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }



  ngOnInit(): void {
    this.showUsers()
  }


  ngOnDestroy(): void {
    this.endsubs$.complete()
  }

  showUsers(){
    this.userSvs.getUsers().pipe(takeUntil(this.endsubs$)).subscribe(data => {
      this.users = data
    })
  }

  deleteUser(categoryId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.userSvs.deleteUser(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(response => {
          this.showUsers()
          this.messageService.add({severity:"success", summary:"Deletion successful", detail: ""})
        }, error => {
          this.messageService.add({severity:"success", summary:"Deletion not successful", detail: error.message})
        })
      }
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }
}
