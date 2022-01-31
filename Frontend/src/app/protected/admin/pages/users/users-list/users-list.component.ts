import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from '../../../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public userList: User[] = [];
  public isLoading: boolean = true;

  public dataSource!: MatTableDataSource<User>;
  public displayedColumns: string[] = [];
  public columns: any[] = [];
  public resultsLength: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _location: Location,
    private _authService: AuthService,
  ) { }


  public ngOnInit(): void {
    this.isLoading = true;

    this._authService.getUsers()
      .subscribe(resp => {
        if (resp) {
          this.userList = resp.users;
          this.dataSource = new MatTableDataSource(this.userList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.isLoading = false;
        } else {
          console.warn("Hubo un error");
        }
      });
    this.displayedColumns = ['name', 'email', 'uuid', 'role', 'actions'];
    this.columns = [
      {
        'key': 'name',
        'name': 'Nombre'
      },
      {
        'key': 'email',
        'name': 'Email'
      },
      {
        'key': 'uuid',
        'name': 'Id'
      },
      {
        'key': 'role',
        'name': 'Rol'
      },
      {
        'key': 'actions',
        'name': 'Acciones'
      }
    ];
  }

  public applyFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public changeAdmin(id: string): void {
    this._authService.user2Admin(id)
    .subscribe(resp => {
      if (resp.user!==undefined) {
        const message = 'Edited user: ' + resp.user.name;
        Swal.fire({
          icon: 'success',
          title: 'Successful process',
          html:  message,
        });
        this.ngOnInit();
      } else {
        console.warn("Hubo un error");
        const messageError = resp.error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html:  messageError,
        })
      }
    });
  }

  public goBack(): void {
    this._location.back();
  }
}
