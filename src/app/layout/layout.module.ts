import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { AppRoutingModule } from "../app-routing.module";
//Realizamos un layout para desacoplar el codigo y reutilizarlo de mejor manera
@NgModule({
declarations: [NavbarComponent],
//para exportar a otros modulos
exports:[NavbarComponent],
imports: [
    CommonModule,
    AppRoutingModule
]
})
export class LayoutModule{}