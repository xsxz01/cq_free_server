import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-online-service',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  viewProviders: [
    provideIcons({ ...bootstrapIcons }), 
  ],
  templateUrl: './online-service.component.html',
  styleUrls: ['./online-service.component.css']
})
export class OnlineServiceComponent {
  // 初始页面数据
  services = [
    { 
      title: '实时客服',
      icon: 'bootstrapHeadset',
      description: '7x24小时在线技术支持',
      link: '/online-service/support'
    },
    {
      title: '工单系统',
      icon: 'bootstrapTicket',
      description: '提交和管理服务请求',
      link: '/online-service/tickets'
    }
  ];
}
