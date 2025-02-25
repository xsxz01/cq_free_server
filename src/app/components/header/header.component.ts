import { Component, signal } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { AsyncPipe } from '@angular/common';
import { getCurrentWindow, type PhysicalSize } from "@tauri-apps/api/window";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // 保存当前窗口大小
  private windowSize: PhysicalSize | null = null;
  // 保存窗口是否最大化
  private isMaximized = signal(false);

  constructor(public sidebarService: SidebarService) {
    getCurrentWindow().outerSize().then((size) => {
      this.windowSize = size;
    })
  }

  /**
   * 切换侧边栏
   */
  async toggleSidebar() {
    this.sidebarService.toggle();
  }
  /**
   * 关闭窗口
   */
  async onClose() {
    // 使用Tauri API关闭窗口
    getCurrentWindow().close();
  }
  /**
   * 最大化窗口
   */
  async onMaximize() {
    // 使用Tauri API最大化窗口
    let currentWindow = getCurrentWindow();
    // 根据当前窗口状态切换最大化和还原
    if (this.isMaximized()) {
      // 还原窗口
      if (!this.windowSize) {
        return; 
      }
      currentWindow.setSize(this.windowSize);
      this.isMaximized.set(false);
    } else {
      // 最大化窗口
      // 保存当前窗口大小
      this.windowSize = await currentWindow.outerSize();
      currentWindow.maximize();
      this.isMaximized.set(true);
    }
  }
  /**
   * 最小化窗口
   */
  async onMinimize() {
    // 使用Tauri API最小化窗口
    getCurrentWindow().minimize();
  }
}
