import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'abbreviate'})
export class AbbreviatePipe implements PipeTransform {
  transform(value: string): string {
    const num = parseInt(value);
    if (num >= 1000000) return (num/1000000).toFixed(1) + 'm';
    if (num >= 1000) return (num/1000).toFixed(1) + 'k';
    return num.toString();
  }
}