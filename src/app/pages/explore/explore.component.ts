import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, type AfterViewInit, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbbreviatePipe } from '../../pipe/abbreviate.pipe';

@Component({
  selector: 'app-explore',
  imports: [CommonModule, RouterModule, AbbreviatePipe],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit, AfterViewInit {
  // 在组件类中添加
  versions: any[] = [];
  // 控制显示的项目数量
  visibleItems = 12;
  // 搜索框的背景图片
  @ViewChild('searchInput', { static: false })
  searchInputDiv! : ElementRef<HTMLDivElement>;

  ngOnInit() {
    // 在组件初始化时生成假数据
    this.generateFakeData(30);
  }
  
  ngAfterViewInit(): void {
    let randomBg = 'https://picsum.photos/1920/1080?random=' + Math.random()
    // 设置背景图片
    this.searchInputDiv.nativeElement.style.backgroundImage = "url('" + randomBg + "')";
  }

  generateFakeData(count: number) {
    const adjectives = ['专业', '企业', '旗舰', '开发', '测试', '个人'];
    const nouns = ['版', '套餐', '套件', '组合'];

    for (let i = 1; i <= count; i++) {
      this.versions.push({
        id: i,
        name: `v2.${i}.0 ${adjectives[i % 6]}${nouns[i % 4]}`,
        price: `¥ ${Math.round((Math.random() * 500 + 99) / 100) * 100}`,
        updateTime: `${i % 30 + 1}天前`,
        downloads: `${Math.floor(Math.random() * 5000) + 1000}`
      });
    }
  }

  loadMore() {
    this.visibleItems += 12;
  }
}
