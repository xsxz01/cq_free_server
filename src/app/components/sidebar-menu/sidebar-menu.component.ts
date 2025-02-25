import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  imports: [
    RouterModule,
    CommonModule,
  ],
  standalone: true
})
export class SidebarMenuComponent {
  menuItems: MenuItem[] = [
    { title: '仪表盘', icon: 'bi-speedometer2', link: '/dashboard' },
    { title: '数据管理', icon: 'bi-database', link: '/data' },
    // 可继续添加其他菜单项
  ];
}