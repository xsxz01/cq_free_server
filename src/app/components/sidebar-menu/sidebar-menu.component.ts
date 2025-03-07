import { Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../service/sidebar.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

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
    NgIcon,
  ],
  viewProviders: [
   provideIcons({...bootstrapIcons }), 
  ],
  standalone: true
})
export class SidebarMenuComponent implements OnInit {

  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isCollapsed = isOpen;
    })
  }
  isCollapsed = false; // 添加折叠状态控制
  
  // 添加菜单激活状态跟踪
  activeMenuItemId: string | null = null;

  menuItems: MenuItem[] = [
    { 
      title: '仪表盘', 
      icon: 'bootstrapSpeedometer2', 
      link: '/dashboard',
    },
    // { 
    //   title: '数据管理', 
    //   icon: 'bi-database', 
    //   link: '/data',
    // },
    { 
      title: '开服列表',
      icon: 'bootstrapServer',
      link: '/server-list'
    },
    { 
      title: '探索版本',
      icon: 'bootstrapGlobe2',
      link: '/explore'
    },
    {
      title: '本地版本',
      icon: 'bootstrapFolder',
      link: '/local'
    },
    {
      title: '免费列表',
      icon: 'bootstrapListUl',
      link: '/launchers'
    },
    {
      title: '常用工具',
      icon: 'bootstrapTools',
      link: '/tools'
    },
    // 新增开服列表菜单项
  ];
  // 新增菜单激活状态处理
  setActiveMenuItem(id: string) {
    this.activeMenuItemId = id;
  }
}