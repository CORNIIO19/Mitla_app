import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bases-conocimiento',
  templateUrl: './bases-conocimiento.page.html',
  styleUrls: ['./bases-conocimiento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BasesConocimientoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
