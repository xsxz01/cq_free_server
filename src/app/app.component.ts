import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// 导入header和sidebar-menu
import { HeaderComponent } from './components/header/header.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';

import { invoke } from "@tauri-apps/api/core";
// 导入Bootstrap的CSS和JS文件
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterModule,
      HeaderComponent,
      SidebarMenuComponent
    ],
    standalone: true,
})
export class AppComponent {
  greetingMessage = "";

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
