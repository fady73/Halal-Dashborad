import { CompanyModel } from './../../../shared/view-models/company.model';
import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../../shared/services/localization.service';
import { CompanyService } from '../../../shared/services/company.service';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ModuleViewModel } from '../../admin/role/module.model';
import { UserService } from '../../admin/user/user.service';
import { RoleActionViewModel } from '../../admin/role/role-action.model';
import { Notification } from './notification';
import { NotificationService } from './notification.service';
declare var jQuery: any;
@Component( {
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  // styleUrls: ['./layout.component.css'],
  // encapsulation:ViewEncapsulation.None
} )
export class LayoutComponent implements OnInit {
  logged: boolean ;
  user: any;
  Notification:Notification[]=[];
  constructor(
    private _userService: UserService,
    private _companyService: CompanyService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private localizationService: LocalizationService,
    private _router: Router,
    private _notification:NotificationService
  ) { }

  ngOnInit() {
    //  alert("ngOnInit");

    this.loadStyles();
    this.getUserDetails();
    this._notification.GetNotification().subscribe(data=>{
      this.Notification=data.Data;

    })

  }

  getUserDetails() {
    this._userService.getLoggedUserDetails().subscribe( response => {
      this.user = response.Data;
    } );
  }
  signOut() {
    this._userService.signOut();
    this._router.navigateByUrl( '/login' );
  }


  changeLanguage() {
    this.localizationService.setLanguage( this.localizationService.getLanguage() === 'ar' ? 'en' : 'ar' );
    // this.translate.use(this.localizationService.getLanguage());
    window.location.reload();
  }

  loadStyles() {
    //   let lang: string = this.localizationService.getLanguage();
    this.loadScript( '/assets/js/plugins/metisMenu/jquery.metisMenu.js' );
    this.loadScript( '/assets/js/app.js' );
    this.loadScript( '/assets/js/plugins/dropzone/dropzone.js' );
  }

  public loadScript( url: string ) {
    const node = document.createElement( 'script' );
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName( 'head' )[0].appendChild( node );
    // alert("loaded");

  }
}
