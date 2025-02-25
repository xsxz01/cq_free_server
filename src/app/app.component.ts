import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
// 导入header和sidebar-menu
import { HeaderComponent } from "./components/header/header.component";
import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";

import { invoke } from "@tauri-apps/api/core";
// 导入Bootstrap的CSS和JS文件
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SidebarService } from "./service/sidebar.service";
import { AsyncPipe } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [RouterModule, HeaderComponent, SidebarMenuComponent, AsyncPipe],
  providers: [SidebarService],
})
export class AppComponent {
  constructor(public sidebarService: SidebarService) {}
}
