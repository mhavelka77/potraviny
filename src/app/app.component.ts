import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


interface potr {
  pole: potra[]
}

interface potra {
  mame: boolean

  nazev: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'potraviny'
  potraviny: potr = {
    pole: []
  }
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get<potr>("https://shielded-taiga-58823.herokuapp.com/").subscribe(data => {
      this.potraviny = data
    })
  }

  clicked(nazev: string): void {
    let index = this.potraviny.pole.findIndex((obj => obj.nazev == nazev))
    this.potraviny.pole[index].mame = !this.potraviny.pole[index].mame

    this.httpClient.post("https://shielded-taiga-58823.herokuapp.com/", this.potraviny)
    .toPromise().catch(err => {
      console.error(err)
    })
  }
}
