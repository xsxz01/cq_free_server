import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent {
  @Input() selectedTime = '00:00';
  @Output() timeChanged = new EventEmitter<string>();

  // 解析时间
  get currentTime() {
    const [hours, minutes] = this.selectedTime.split(':').map(Number);
    return { hours: hours || 0, minutes: minutes || 0 };
  }

  // 调整小时
  adjustHour(increment: boolean) {
    let newHour = this.currentTime.hours + (increment ? 1 : -1);
    newHour = (newHour + 24) % 24; // 确保0-23范围
    this.updateTime(newHour, this.currentTime.minutes);
  }

  // 调整分钟
  adjustMinute(increment: boolean) {
    let newMinute = this.currentTime.minutes + (increment ? 1 : -1);
    newMinute = (newMinute + 60) % 60; // 确保0-59范围
    this.updateTime(this.currentTime.hours, newMinute);
  }

  // 更新时间并发射事件
  private updateTime(hours: number, minutes: number) {
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    this.selectedTime = timeString;
    this.timeChanged.emit(timeString);
  }

  // 处理直接输入
  onTimeInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(input)) {
      this.timeChanged.emit(input);
    } else {
      // 输入无效时恢复原值
      (event.target as HTMLInputElement).value = this.selectedTime;
    }
  }
}
