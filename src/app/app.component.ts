import { Component, type OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
// 导入header和sidebar-menu
import { HeaderComponent } from "./components/header/header.component";
import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";
// 导入Bootstrap的CSS和JS文件
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SidebarService } from "./service/sidebar.service";
import { AsyncPipe, CommonModule } from "@angular/common";
import { getCurrentWebview } from "@tauri-apps/api/webview";
import { Effect, getCurrentWindow } from "@tauri-apps/api/window";

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [RouterModule, CommonModule, HeaderComponent, SidebarMenuComponent, AsyncPipe],
  providers: [SidebarService],
})
export class AppComponent implements OnInit {
  // 应用标题
  title = "传奇版本库";
  constructor(public sidebarService: SidebarService) {}
  ngOnInit(): void {
    // 设置窗口云母效果
    this.setMicaEffect();
  }
  async setMicaEffect() {
    const window = await getCurrentWindow();
    window.setEffects({
      effects: [Effect.Mica, Effect.Acrylic],
    });
  }
}
