import { UserService } from './../../components/user/user.service';
import { AlertService } from 'src/app/components/alert/alert.service';

import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotkeysService } from 'angular2-hotkeys';
import { BsModalService } from 'ngx-bootstrap';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public alert:AlertService,
    public userService:UserService,
    public modalService: BsModalService,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public hotkeys: HotkeysService,
    public router:Router,
    public dateService:DateService
    ) { }
}
