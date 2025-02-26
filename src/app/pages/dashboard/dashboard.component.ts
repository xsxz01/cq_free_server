import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, RouterModule, NgIcon],
  viewProviders: [
    provideIcons({...bootstrapIcons }), 
  ]
})
export class DashboardComponent {
  constructor() { }
  title = 'dashboard';

  // 在Component装饰器下方添加
  menus = [
    { title: '已购版本', icon: 'bootstrapCollection', link: '/versions' },
    { title: '应用管理', icon: 'bootstrapGrid', link: '/apps' },
    { title: '版本管理', icon: 'bootstrapClipboard', link: '/manage' },
    { title: '一键开服', icon: 'bootstrapLightning', link: '/deploy' }
  ];

  versions = [
    { id: 1.76, name: '复古精品', description: '经典1.76金币版本', downloads: '2.4万次', price: 0, updated: '3天前' },
    { id: 1.85, name: '英雄合击', description: '三职业英雄版本', downloads: '1.8万次', price: 299, updated: '1周前' },
    { id: 2.0, name: '龙腾传奇', description: '全新龙族BOSS版本', downloads: '9800次', price: 499, updated: '2天前' },
    { id: 1.95, name: '神魔大陆', description: '跨服争霸版本', downloads: '2.1万次', price: 199, updated: '5小时前' }
  ];

}
