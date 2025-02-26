import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileSizePipe } from '../../pipe/file-size.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-launchers',
  standalone: true,
  imports: [CommonModule, RouterModule, FileSizePipe, NgIcon],
  viewProviders: [
    provideIcons({...bootstrapIcons }), 
  ],
  templateUrl: './launchers.component.html',
  styleUrl: './launchers.component.css'
})
export class LaunchersComponent {
  // 模拟文件数据
  files = [
    {
      name: 'cq_free_v2.3.0.zip',
      size: 2548231,
      date: new Date('2024-03-15')
    },
    {
      name: 'cq_enterprise_v1.9.2.rar',
      size: 15728640,
      date: new Date('2024-03-18')
    },
    {
      name: 'cq_ultimate_x64_2024.7z',
      size: 5242880,
      date: new Date('2024-03-20')
    },
    {
      name: 'cq_mobile_edition_v3.1.apk',
      size: 8921088,
      date: new Date('2024-03-21')
    },
    {
      name: 'cq_tools_suite_v5.7.zip',
      size: 1048576,
      date: new Date('2024-03-22')
    }
  ];
}
