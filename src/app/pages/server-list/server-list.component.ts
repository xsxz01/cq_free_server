import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShortUrlPipe } from '../../pipe/short-url.pipe';

interface ServerInfo {
  name: string;
  website: string;
  openTime: Date;
  region: string;
  version: string;
  qq: string;
  priority: number; // 添加优先级字段（1: 最高 3: 最低）
}
@Component({
  selector: 'app-server-list',
  imports: [
    CommonModule,
    RouterModule,
    ShortUrlPipe
  ],
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent {
  serverList: ServerInfo[] = [
    // 高优先级数据（红色边框）
    {
      name: '🔥 皇冠·激情战场',
      website: 'https://hwzb.com',
      openTime: new Date(),
      region: '全国BGP',
      version: '全新战法/爆率全开/千人在线',
      qq: '66889900',
      priority: 1
    },
    // 中优先级数据（黄色边框）
    {
      name: '⭐ 龙魂·经典复古',
      website: 'https://lhfg.com',
      openTime: new Date(Date.now() - 3600000 * 5),
      region: '华南双线',
      version: '1.76复古/无英雄/手动练级',
      qq: '11223344',
      priority: 2
    },
    // 低优先级数据（蓝色边框）
    {
      name: '寒冰·沉默世界',
      website: 'https://hbsj.com',
      openTime: new Date(Date.now() - 3600000 * 24),
      region: '西南电信',
      version: '长久沉默/装备可回收',
      qq: '55667788',
      priority: 3
    },
    // 更多假数据...
    {
      name: '战神·终极觉醒',
      website: 'https://zsjx.com',
      openTime: new Date(Date.now() - 3600000 * 3),
      region: '华东多线',
      version: '独家版本/首战奖励',
      qq: '33221144',
      priority: 1
    },
    {
      name: '明月·修仙传说',
      website: 'https://myxx.com',
      openTime: new Date(Date.now() - 3600000 * 12),
      region: '华中双线',
      version: '修仙养成/境界突破',
      qq: '90908877',
      priority: 2
    }
  ].sort((a, b) => a.priority - b.priority); // 根据优先级排序
}
