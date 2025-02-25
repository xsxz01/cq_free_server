import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileSizePipe } from "../../pipe/file-size.pipe";

@Component({
  selector: 'app-tools',
  imports: [CommonModule, RouterModule, FileSizePipe],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {
  // 分类数据
  categories = [
    { id: 1, name: '压缩工具', icon: 'bi-file-zip' },
    { id: 2, name: '系统工具', icon: 'bi-pc' },
    { id: 3, name: '安全工具', icon: 'bi-shield-lock' },
    { id: 4, name: '网络工具', icon: 'bi-globe' },
    { id: 5, name: '开发工具', icon: 'bi-code-square' },
    { id: 6, name: '数据恢复', icon: 'bi-hdd' }
  ];

  // 工具数据
  tools = [
    {
      id: 1,
      title: 'CQ工具箱专业版',
      description: '集成式服务器管理工具套件，包含端口检测、资源监控等多项功能',
      password: 'cq2024',
      version: '2.3.1',
      rating: 4.8,
      size: 134217728, // 128MB
      updateDate: new Date('2024-03-20')
    },
    {
      id: 2,
      title: '云端同步助手',
      description: '多平台数据实时同步工具，支持FTP/SFTP协议传输',
      password: 'cloud#123',
      version: '1.2.0',
      rating: 4.5,
      size: 52428800, // 50MB
      updateDate: new Date('2024-03-18')
    },
    // 添加更多工具数据...
    ...Array.from({length: 12}, (_, i) => ({
      id: i + 3,
      title: `实用工具套件 v${i+1}.0`,
      description: `第${i+1}代综合工具包，包含系统优化、文件管理等多项实用功能`,
      password: `tool${i+1}@pass`,
      version: '1.2.0',
      rating: 4.5,
      size: 52428800, // 50MB
      updateDate: new Date('2024-03-18')
    }))
  ];
}
