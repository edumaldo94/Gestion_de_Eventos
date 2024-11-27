import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  images: string[] = [
    'assets/img/img1.jpeg',
    'assets/img/img2.jpeg',
    'assets/img/img3.jpg',
    'assets/img/img4.jpg',
    'assets/img/img5.jpg'
  ];
  textColors: string[] = [
    '#ff5733',  // Color para la primera imagen
    '#33ff57',  // Color para la segunda imagen
    '#3357ff',  // Color para la tercera imagen
    '#ff33a8',  // Color para la cuarta imagen
    '#ff8333'   // Color para la quinta imagen
  ];
  
  currentIndex = 0;
  headerElement!: HTMLElement;
  currentTextColor = this.textColors[0];

  constructor() {}

  ngOnInit(): void {
    this.headerElement = document.getElementById('dynamic-header') as HTMLElement;
    
    // Establece la primera imagen de fondo y el color del texto de inmediato
    this.headerElement.style.backgroundImage = `url(${this.images[this.currentIndex]})`;
    this.changeBackground();
  }

  changeBackground() {
    setInterval(() => {
      // Desvanecer la imagen actual
      this.headerElement.classList.add('fade');

      setTimeout(() => {
        // Cambiar la imagen solo después de que se haya desvanecido completamente
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.headerElement.style.backgroundImage = `url(${this.images[this.currentIndex]})`;

        // Cambiar el color del texto
        this.currentTextColor = this.textColors[this.currentIndex];

        // Asegurarnos de que la nueva imagen esté completamente oculta
        this.headerElement.classList.add('hide');

        // Mostrar la nueva imagen
        setTimeout(() => {
          this.headerElement.classList.remove('fade', 'hide');
        }, 100); // Esperar un pequeño intervalo para evitar el parpadeo
      }, 1000); // Tiempo de espera para cambiar la imagen después del fade-out
    }, 5000); // Cambiar la imagen cada 5 segundos
  }
}
