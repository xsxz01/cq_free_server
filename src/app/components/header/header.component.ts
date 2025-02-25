import { Component, input, signal } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { AsyncPipe } from '@angular/common';
import { getCurrentWindow, LogicalPosition, PhysicalPosition, PhysicalSize } from "@tauri-apps/api/window";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // 窗口标题
  windowTitle = input<string>("我的应用");
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
    await getCurrentWindow().close();
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
      await currentWindow.setSize(this.windowSize);
      this.isMaximized.set(false);
    } else {
      // 最大化窗口
      // 保存当前窗口大小
      this.windowSize = await currentWindow.outerSize();
      await currentWindow.maximize();
      this.isMaximized.set(true);
    }
  }
  /**
   * 最小化窗口
   */
  async onMinimize() {
    // 使用Tauri API最小化窗口
    await getCurrentWindow().minimize();
  }

  /**
   * 开始拖拽窗口
   * @param event 鼠标事件
   */
  async startDrag(event: MouseEvent) {
    await getCurrentWindow().startDragging();
  }
}
