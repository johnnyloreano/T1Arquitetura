import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './pages/menu/menu.module';
import { CadastroModule } from './pages/cadastro/cadastro.module';
import { PedidoModule } from './pages/pedido/pedido.module';
import { RelatorioModule } from './pages/relatorio/relatorio.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    CadastroModule,
    PedidoModule,
    RelatorioModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
