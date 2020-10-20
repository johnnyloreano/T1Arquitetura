import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  declarations: [MenuComponent, MenuBarComponent],
  imports: [
    CommonModule
  ],
  exports: [ MenuComponent ]
})
export class MenuModule { }
