import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

@Component({
    selector: 'app-benefit-mall',
    standalone: true,
    imports: [CommonModule, RouterModule, NgIcon],
    providers: [provideIcons({ ...bootstrapIcons })],
    templateUrl: './benefit-mall.component.html',
    styleUrls: ['./benefit-mall.component.css']
})
export class BenefitMallComponent {
    // 增加新的状态管理
    activeCategoryId: string | null = null;

    categories = [
        {
            id: 'media',
            name: '影音娱乐',
            icon: 'bootstrapCameraReels',
            sub: [
                { id: 'video', name: '视频会员' },
                { id: 'music', name: '音乐会员' }
            ]
        },
        // 新增服务类目
        {
            id: 'download',
            name: '下载服务',
            icon: 'bootstrapDownload',
            sub: [
                { id: 'highspeed', name: '高速下载' },
                { id: 'batch', name: '批量下载' },
                { id: 'private', name: '私有下载' }
            ]
        },
        {
            id: 'traffic',
            name: '流量服务',
            icon: 'bootstrapGraphUp',
            sub: [
                { id: 'weibo', name: '微博涨粉' },
                { id: 'video-views', name: '视频刷量' },
                { id: 'live', name: '直播人气' }
            ]
        },
        {
            id: 'setup',
            name: '搭建服务', 
            icon: 'bootstrapTools',
            sub: [
                { id: 'website', name: '网站建设' },
                { id: 'app', name: 'APP开发' },
                { id: 'game', name: '游戏私服' }
            ]
        },
        // ... 其他分类数据保持不变
    ];

    // 新增服务数据示例
    services = [
        {
            title: '极速下载加速包',
            price: 9.9,
            speed: '50MB/s',
            image: 'https://picsum.photos/300/200?random=21'
        },
        {
            title: '微博万粉套餐',
            price: 299,
            fans: '10,000+',
            image: 'https://picsum.photos/300/200?random=22'
        },
        {
            title: '企业网站搭建',
            price: 1999,
            duration: '7天交付',
            image: 'https://picsum.photos/300/200?random=23'
        }
    ];

    // 实时热销数据
    hotItems = [
        { name: '腾讯视频年卡', price: 198 },
        { name: '网易云黑胶季卡', price: 45 },
        { name: 'Kindle Unlimited', price: 88 },
        { name: 'Steam 50元卡', price: 48 }
    ];

    // 影视会员数据
    videoMembers = [
        {
            title: '爱奇艺黄金年卡',
            price: 198,
            image: 'https://picsum.photos/300/200?random=1'
        },
        {
            title: '腾讯视频VIP季卡',
            price: 68,
            image: 'https://picsum.photos/300/200?random=2'
        },
        {
            title: '哔哩哔哩大会员',
            price: 148,
            image: 'https://picsum.photos/300/200?random=3'
        },
        {
            title: '优酷年度会员',
            price: 169,
            image: 'https://picsum.photos/300/200?random=4'
        }
    ];
    // 电子书数据
    ebooks = [
        {
            title: 'Web开发实战',
            author: "技术出版社",
            price: 39.9,
            category: '计算机',
            image: 'https://picsum.photos/300/400?random=5'
        },
        {
            title: 'JavaScript高级编程',
            author: "前端学院",
            price: 59.9,
            category: '编程',
            image: 'https://picsum.photos/300/400?random=6'
        },
        {
            title: '用户体验设计',
            author: "设计之家",
            price: 29.9,
            category: '设计',
            image: 'https://picsum.photos/300/400?random=7'
        },
        {
            title: '人工智能基础',
            author: "科技前沿",
            price: 49.9,
            category: '科技',
            image: 'https://picsum.photos/300/400?random=8'
        }
    ];
}
