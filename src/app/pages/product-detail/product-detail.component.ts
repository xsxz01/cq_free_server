import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

// 模拟商品详情数据
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Steam 50元充值卡',
    price: 49.9,
    image: 'https://picsum.photos/500/300?random=11',
    description: '支持Steam平台所有游戏充值，即时到账，支持退款服务',
    details: ['24小时自动发货', '支持支付宝/微信支付', '适用于国区账号']
  },
  {
    id: 2,
    name: 'PSN 100港币点卡',
    price: 89.9,
    image: 'https://picsum.photos/500/300?random=12',
    description: 'PlayStation Network 港服点卡，支持支付宝付款',
    details: ['即时到账', '支持PS5/PS4', '自动发送兑换码']
  },
  {
    id: 3,
    name: '全球VPN年费套餐',
    price: 299,
    image: 'https://picsum.photos/500/300?random=13',
    description: '多国节点支持，高速稳定连接',
    details: ['支持5台设备', '无限流量', '24/7技术支持']
  },
  {
    id: 11,
    name: '直播间万人气套餐',
    price: 199,
    image: 'https://picsum.photos/500/300?random=21',
    description: '实时提升直播间人气和互动',
    details: ['自然流量', '支持主流直播平台', '即时生效']
  }
];

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterModule],
  viewProviders: [
    provideIcons(bootstrapIcons)
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = { 
    name: '加载中...',
    price: 0,
    description: '正在加载商品信息',
    details: []
  };
  
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('当前请求的商品ID:', productId);  // 添加调试日志
    
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === productId);
    console.log('查找到的商品:', foundProduct);  // 添加查找结果日志
    
    if (foundProduct) {
      this.product = foundProduct;
    } else {
      console.error(`商品 ${productId} 不存在`);
      this.product.name = '商品不存在';
    }
  }
  async navigateBack() {
    const transition = document.startViewTransition(() => {
      // 使用Angular的Location服务返回上一页
      window.history.back();
    });
    
    transition.ready.then(() => {
      document.documentElement.animate(
        [
          { transform: 'translateX(0)', opacity: 1 },
          { transform: 'translateX(100%)', opacity: 0 }
        ],
        {
          duration: 300,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-old(root)'
        }
      );
    });
  }
}
