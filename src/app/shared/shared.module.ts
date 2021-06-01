import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [ // declaramos el contenido del módulo
    SidebarComponent
  ],
  imports: [
    CommonModule,    
    
  ],
  exports: [ // exportamos lo que queremos mostrar
    SidebarComponent
  ]
})
export class SharedModule { }
