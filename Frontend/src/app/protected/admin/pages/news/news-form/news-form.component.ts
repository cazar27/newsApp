import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NewsService } from '../services/news.service';
import Swal from 'sweetalert2';
import { News } from '../interfaces/news.interface';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  public update: boolean = false;
  private _new: News = {
    title: '',
    description: '',
    newsUuid: 1
  };
  public messageBtn: string = 'Registrar Noticia';

  public myForm: FormGroup = this._formBuilder.group({
    title: [
      '', [Validators.required, Validators.minLength(6)]
    ],
    description: [
      '', [Validators.required, Validators.minLength(6)]
    ],
    newsUuid: [
      '', [Validators.required, Validators.min(1)]
    ],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _location: Location,
    private _activeRoute: ActivatedRoute,
    private _newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this._new = {
      title: '',
      description: '',
      newsUuid: 0
    }

    if (this._activeRoute.params) {
      this._activeRoute.params.subscribe(
        ({ id }) => {
          if (id) {
            this.update = true;
            this.messageBtn = 'Actualizar Noticia';
            this._newsService.getNewById(id).
              subscribe(resp => {
                if (resp.new !== undefined) {
                  this._new = resp.new;
                  this._new.newsUuid = id;
                  this.myForm.reset(this._new);
                } else {
                  console.warn("back validation failed");
                }

              });
          }
        });
    }
    this.myForm.reset(this._new);
  }

  public saveNew(): void {

    const { title, description, newsUuid } = this.myForm.value;
    if (this.myForm.valid) {

      if (this.update) {

        this._newsService.updateNew(title, description, newsUuid)
          .subscribe(resp => {
            if (resp.news !== undefined) {
              this._router.navigateByUrl('panel-admin/news/list');
            } else {
              console.warn(resp.error!);

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<p>' + resp.error + '</p>'
              })
            }
          });

      } else {

        this._newsService.newNew(title, description, newsUuid)
          .subscribe(resp => {

            if (resp.news !== undefined) {
              this._router.navigateByUrl('panel-admin/news/list');
            } else {
              console.warn(resp.error!);

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<p>' + resp.error + '</p>'
              })
            }
          });

      }

    } else {
      console.warn("front validation failed");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'Rellene de nuevo los campos con error'
      })
      this.myForm.markAllAsTouched();
    }

  }

  public goBack(): void {
    this._location.back();
  }

}
