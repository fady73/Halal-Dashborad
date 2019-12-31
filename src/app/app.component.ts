import { Component , Renderer2 } from '@angular/core';
import { LocalizationService } from './shared/services/localization.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'halal-consumer';
  progressbarDirection = 'ltr+';
  spinnerPosition = "right";
  constructor(private renderer: Renderer2, private localizationService: LocalizationService, private router: Router) {
    this.localizationService.setLanguage(this.localizationService.getLanguage());
    this.loadStyles();
  }

  loadStyles() {
    //debugger
    let lang: string = this.localizationService.getLanguage();
    if (lang == 'ar') {
      this.renderer.addClass(document.body, 'rtls');
      this.progressbarDirection = 'rtl +';
      this.spinnerPosition = "left";
      require("style-loader!../assets/css/plugins/bootstrap-rtl/bootstrap-rtl.min.css");
      require("style-loader!../assets/css/style.css");
    } else {
      this.renderer.removeClass(document.body, 'rtls');
      this.progressbarDirection = 'rtl +';
      this.spinnerPosition = "right";
      require("style-loader!../assets/css/bootstrap.min.css");
      require("style-loader!../assets/css/style.css");
    }
  }
}
