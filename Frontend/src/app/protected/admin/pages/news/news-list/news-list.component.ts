import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { NewsService } from '../services/news.service';
import { News } from '../interfaces/news.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  public newsList: News[] = [];
  public isLoading: boolean = true;

  public dataSource!: MatTableDataSource<News>;
  public displayedColumns: string[] = [];
  public columns: any[] = [];
  public resultsLength: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _router: Router,
    private _location: Location,
    private _newsService: NewsService,
  ) { }


  public ngOnInit(): void {
    this.isLoading = true;

    this._newsService.getNews()
      .subscribe(resp => {
        if (resp) {
          this.newsList = resp.news;
          this.dataSource = new MatTableDataSource(this.newsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.isLoading = false;
        } else {
          console.warn("Hubo un error");
        }
      });

    this.displayedColumns = ['title', 'description', 'uuid', 'actions'];
    this.columns = [
      {
        'key': 'title',
        'name': 'Title'
      },
      {
        'key': 'description',
        'name': 'Descripción'
      },
      {
        'key': 'uuid',
        'name': 'Id'
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

  public deleteNew(id: string): void {
    this._newsService.deleteNew(id).subscribe(resp => {
      if (resp.error) {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: '<p>' + resp.error + '</p>'
        })
      } else {
        const uuid: number = resp.uuid!;

        Swal.fire({
          icon: 'success',
          title: 'Succesfull process',
          html: '<p>Se elimino la noticia con id: ' + uuid + '</p>'
        })
      }
    });

    this.ngOnInit();
  }

  public goBack(): void {
    this._location.back();
  }
}
