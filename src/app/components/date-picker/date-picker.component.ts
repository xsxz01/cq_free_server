import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  // 输入属性
  @Input() selectedDate?: Date;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  // 输出事件
  @Output() dateChanged = new EventEmitter<Date>();
  @Output() canceled = new EventEmitter<void>();

  // 组件状态
  currentMonthDate = new Date();
  days: Date[] = [];
  weekdayLabels = ['一', '二', '三', '四', '五', '六', '日'];

  ngOnInit() {
    this.generateCalendarDays();
  }

  // 月份切换
  prevMonth() {
    this.currentMonthDate = new Date(
      this.currentMonthDate.getFullYear(),
      this.currentMonthDate.getMonth() - 1,
      1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentMonthDate = new Date(
      this.currentMonthDate.getFullYear(),
      this.currentMonthDate.getMonth() + 1,
      1
    );
    this.generateCalendarDays();
  }

  // 生成日期网格
  private generateCalendarDays() {
    const baseDate = this.currentMonthDate;
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const startFrom = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // 周一开始
    const startDate = new Date(year, month, 1 - startFrom);
    
    this.days = Array.from({length: 42}, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
    
    this.currentMonthDate = new Date(year, month, 1);
  }

  // 日期选择处理
  // 新增显示状态
  showCalendar = false;

  // 修改日期选择方法
  selectDate(date: Date) {
    if (this.isDateDisabled(date)) return;
    this.selectedDate = date;
    this.showCalendar = false; // 选择后关闭弹窗
  }

  // 新增输入框点击处理
  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  // 修改确认方法
  confirm() {
    if (this.selectedDate) {
      this.dateChanged.emit(this.selectedDate);
      this.showCalendar = false; // 确认后关闭弹窗
    }
  }

  // 修改取消方法
  cancel() {
    this.canceled.emit();
    this.showCalendar = false; // 取消后关闭弹窗
  }

  // 判断选中状态
  isSelected(date: Date): boolean {
    return this.selectedDate?.toDateString() === date.toDateString();
  }

  // 判断日期是否禁用
  private isDateDisabled(date: Date): boolean {
    return !!(
      (this.minDate && date < this.minDate) ||
      (this.maxDate && date > this.maxDate)
    );
  }

  // 快捷选择今天
  selectToday() {
    this.selectedDate = new Date();
    this.generateCalendarDays();
    this.confirm();
  }

  // 当前月份显示文本
  get currentMonth(): string {
    return `${this.currentMonthDate.getFullYear()}年 ${(this.currentMonthDate.getMonth() + 1).toString().padStart(2, '0')}月`;
  }
}