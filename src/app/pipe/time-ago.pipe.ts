import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    const days = parseInt(value);
    if (days === 0) return '今天更新';
    if (days === 1) return '昨天更新';
    if (days <= 7) return `${days} 天前`;
    if (days <= 30) return `${Math.floor(days/7)} 周前`;
    return `${Math.floor(days/30)} 月前`;
  }
}