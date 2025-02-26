import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true // 如果使用独立组件则添加
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20, completeWords = false, ellipsis = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}