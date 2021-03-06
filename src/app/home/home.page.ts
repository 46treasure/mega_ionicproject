import {Component} from '@angular/core';
import {FilmServiceService} from '../../services/film-service.service';
import {Films} from '../../models/Films';
import {NavController, PopoverController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {GenreComponent} from '../genre/genre.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private filmsS: FilmServiceService,
                private nav: NavController,
                private popoverController: PopoverController) {
    }

    films: Films [] = [];
    filmsAfterSlice: Films [] = [];
    maxSize = 2;
    moreButton;


    ionViewWillEnter() {
        this.filmsS.getFilms().subscribe((res) => {
            this.films = res.reverse();
            this.filmsAfterSlice = this.films.slice(0, this.maxSize);
            this.checkButton();
        });
    }

    async present(event) {
        const popover  = await this.popoverController.create({
            component: GenreComponent,
            event
        });
        await popover.present();
    }
    checkButton() {
        if (this.films.length >= this.maxSize) {
            this.moreButton = true;
        } else {
            this.moreButton = false;
        }
    }
    showMore() {
        this.maxSize += 2;
        this.filmsAfterSlice = this.films.slice(0, this.maxSize);
        this.checkButton();
    }

    SearchBy(genre: string) {
        this.filmsS.findByGenre(genre).subscribe((res) => {
            this.films = res;
            this.filmsAfterSlice = this.films.slice(0, this.maxSize);
        });
    }
    sendSearchForm(form: NgForm) {
        if (form.value.search !== '') {
            this.filmsS.findSearchingFilm(form.value.search).subscribe(res => {
                this.films = res;
                this.filmsAfterSlice = this.films.slice(0, this.maxSize);
            });
        } else {
            this.filmsS.getFilms().subscribe((res) => {
                this.films = res.reverse();
                this.filmsAfterSlice = this.films.slice(0, this.maxSize);
            });
        }
    }

}
