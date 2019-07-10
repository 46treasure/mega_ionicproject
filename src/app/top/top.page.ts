import { Component, OnInit } from '@angular/core';
import {Films} from '../../models/Films';
import {FilmServiceService} from '../../services/film-service.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {

  constructor(private filmService: FilmServiceService) { }
  top: Films[];
  ngOnInit() {
    this.filmService.getTopTen().subscribe((res) => {
         this.top = res;
    });
  }

}
