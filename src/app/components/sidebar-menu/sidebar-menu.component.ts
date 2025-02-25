import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'], // 添加独立样式文件
  imports: [
    RouterModule,
    CommonModule,
    RouterLinkActive // 添加路由激活状态支持
  ],
  standalone: true
})
export class SidebarMenuComponent {
  isCollapsed = false; // 添加折叠状态控制
  
  // 添加菜单激活状态跟踪
  activeMenuItemId: string | null = null;

  menuItems: MenuItem[] = [
    { 
      title: '仪表盘', 
      icon: 'bi-speedometer2', 
      link: '/dashboard',
    },
    { 
      title: '数据管理', 
      icon: 'bi-database', 
      link: '/data',
    },
    // 保持其他菜单项不变
  ];

  // 新增菜单激活状态处理
  setActiveMenuItem(id: string) {
    this.activeMenuItemId = id;
  }
}