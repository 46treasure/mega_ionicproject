import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../services/user-service.service';
import {User} from '../models/User';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

    currentUser = new User();
    currentID = 0;

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Top',
            url: '/top',
            icon: 'star'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private userService: UserServiceService
    ) {
        this.ngOnInit();
    }


    ngOnInit() {

        if (localStorage.getItem('_token') != null) {
            this.userService.setStatus('Online').subscribe();
        } else {
            this.userService.setStatus('Offline').subscribe();
        }
        this.userService.getCurrentUser().subscribe((res) => {
            this.currentUser = res;
            this.currentID = res.id;
        });
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (localStorage.getItem('_token') != null) {
                this.router.navigateByUrl('/home');
            }
        });
    }
}
