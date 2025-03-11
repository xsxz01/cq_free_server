import { Component, input, signal, type OnInit } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { getCurrentWindow, PhysicalSize } from "@tauri-apps/api/window";
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';
import { AuthService } from '../../service/auth.service';

type CustomAuthEvent = CustomEvent<boolean>;
declare global {
  interface WindowEventMap {
    'auth-change': CustomAuthEvent;
    'logout-request': Event;
  }
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({ ...bootstrapIcons }),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // 是否登录
  isLoggedIn = false;
  // 窗口标题
  windowTitle = input<string>("我的应用");
  // 保存当前窗口大小
  private windowSize: PhysicalSize | null = null;
  // 保存窗口是否最大化
  private isMaximized = signal(false);

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
  ){
    getCurrentWindow().outerSize().then((size) => {
      this.windowSize = size;
    });
  }
  ngOnInit(): void {
    // 监听全局认证状态变化
    window.addEventListener('auth-change', (e: CustomEvent) => {
      this.isLoggedIn = e.detail;
      // token已清除，刷新页面
      if (!this.isLoggedIn) {
        window.location.reload(); 
      }
    });

    // 初始化时检查本地token
    this.isLoggedIn = !!localStorage.getItem('auth_token');
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

  logout() {
    // 触发注销逻辑
    window.dispatchEvent(new CustomEvent('logout-request'));
  }
}
