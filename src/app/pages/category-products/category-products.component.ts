import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-category-products',
    standalone: true,
    imports: [CommonModule, NgIcon, RouterModule],
    templateUrl: './category-products.component.html',
    styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    currentCategory: any;

    constructor(public route: ActivatedRoute,private router: Router) {

    }

    // 商品数据示例
    products = [
        // 游戏点卡类
        {
            id: 1,
            name: 'Steam 50元充值卡',
            price: 49.9,
            image: 'https://picsum.photos/300/200?random=11',
            tags: ['即时到账', '支持退款'],
            categoryId: 'game'
        },
        {
            id: 2,
            name: 'PSN 100港币点卡',
            price: 89.9,
            image: 'https://picsum.photos/300/200?random=12',
            tags: ['自动发货'],
            categoryId: 'game'
        },
        // VPN服务类
        {
            id: 3,
            name: '全球VPN年费套餐',
            price: 299,
            image: 'https://picsum.photos/300/200?random=13',
            tags: ['多节点'],
            categoryId: 'vpn'
        },
        // 云存储类
        {
            id: 4,
            name: '1TB云存储空间',
            price: 199,
            image: 'https://picsum.photos/300/200?random=14',
            tags: ['永久有效'],
            categoryId: 'cloud'
        },
        // 高速下载类
        {
            id: 5,
            name: '10G高速下载包',
            price: 9.9,
            image: 'https://picsum.photos/300/200?random=15',
            tags: ['极速通道'],
            categoryId: 'highspeed'
        },
        {
            id: 6,
            name: '50G企业级下载',
            price: 49.9,
            image: 'https://picsum.photos/300/200?random=16',
            tags: ['企业专享'],
            categoryId: 'highspeed'
        },

        // 微博涨粉类
        {
            id: 7,
            name: '微博万粉套餐',
            price: 299,
            image: 'https://picsum.photos/300/200?random=17',
            tags: ['真人粉丝'],
            categoryId: 'weibo'
        },
        {
            id: 8,
            name: '微博热门套餐',
            price: 599,
            image: 'https://picsum.photos/300/200?random=18',
            tags: ['热搜上榜'],
            categoryId: 'weibo'
        },

        // 网站建设类
        {
            id: 9,
            name: '企业官网建设',
            price: 3999,
            image: 'https://picsum.photos/300/200?random=19',
            tags: ['响应式设计'],
            categoryId: 'website'
        },
        {
            id: 10,
            name: '电商网站搭建',
            price: 8999,
            image: 'https://picsum.photos/300/200?random=20',
            tags: ['支付集成'],
            categoryId: 'website'
        },

        // 直播人气类
        {
            id: 11,
            name: '直播间万人气',
            price: 199,
            image: 'https://picsum.photos/300/200?random=21',
            tags: ['实时互动'],
            categoryId: 'live'
        }
    ];

    // 添加过滤后的商品列表
    get filteredProducts() {
        return this.products.filter(p => p.categoryId === this.currentCategory?.id);
    }

    navigateBack() {
        // 使用视图过渡API
        const transition = document.startViewTransition(() => {
            this.router.navigate(['/']);
        });
        
        // 过渡效果处理
        transition.ready.then(() => {
            document.documentElement.animate(
                [
                    { opacity: 1 },
                    { opacity: 0 }
                ],
                {
                    duration: 300,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-old(root)'
                }
            );
        });
    }


    ngOnInit(): void {
        this.route.paramMap.pipe(
            takeUntil(this.destroy$)
        ).subscribe(params => {
            const subCategoryId = params.get('subId');
            console.log('[调试] 接收到的分类ID:', subCategoryId);

            if (!subCategoryId) {
                console.error('未收到有效分类ID');
                return;
            }

            this.currentCategory = {
                id: subCategoryId,
                name: this.getCategoryName(subCategoryId)
            };

            console.log('[调试] 当前分类:', this.currentCategory);
        });
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getCategoryName(id: string | null): string {
        const names: { [key: string]: string } = {
            'game': '游戏点卡',  // 添加主分类映射
            'vpn': 'VPN服务',
            'cloud': '云存储',
            'highspeed': '高速下载',
            'batch': '批量下载',
            'private': '私有下载',
            'weibo': '微博涨粉',
            'video-views': '视频播放量',
            'live': '直播人气',
            'website': '网站建设',
            'app': 'APP开发',
            'steam': 'Steam充值',
            'psn': 'PSN点卡'
        };
        return names[id || ''] || '未知分类';
    }
}
