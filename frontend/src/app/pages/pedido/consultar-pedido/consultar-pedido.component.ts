import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-consultar-pedido',
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent implements OnInit {
  public listaPedidos;

  constructor(private httpService: HttpServiceService) {
  }

  ngOnInit(): void {
  }

  carregaPedidos(): void {
    this.httpService.getPedido().subscribe(
      (success) => {
        this.listaPedidos = success;
      },
      (failure) => {
        console.log(":(");
      }
    );
  }
}
