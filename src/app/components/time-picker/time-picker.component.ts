import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-time-picker",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.scss"],
})
export class TimePickerComponent {
  @Input() selectedHour = 0;
  @Input() selectedMinute = 0;
  @Input() selectedTime = ""; // 接收字符串格式时间
  @Output() timeChanged = new EventEmitter<string>(); // 输出字符串格式时间

  showPicker = false;

  togglePicker() {
    this.showPicker = !this.showPicker;
  }

  private parseTime(timeStr: string): { hour: number; minute: number } {
    const [hour = 0, minute = 0] = (timeStr || "").split(":").map(Number);
    return { hour, minute };
  }

  // 修改确认方法
  confirm() {
    const time = this.formatTime();
    this.timeChanged.emit(time);
    this.showPicker = false;
  }

  // 初始化时解析时间
  ngOnInit() {
    const { hour, minute } = this.parseTime(this.selectedTime);
    this.selectedHour = hour;
    this.selectedMinute = minute;
  }

  // 调整小时
  adjustHour(increment: boolean) {
    this.selectedHour = (this.selectedHour + (increment ? 1 : -1) + 24) % 24;
  }

  // 调整分钟
  adjustMinute(increment: boolean) {
    this.selectedMinute =
      (this.selectedMinute + (increment ? 1 : -1) + 60) % 60;
  }

  // 取消选择
  cancel() {
    this.showPicker = false;
  }

  // 格式化显示时间
  formatTime(): string {
    return `${this.padNumber(this.selectedHour)}:${this.padNumber(
      this.selectedMinute
    )}`;
  }

  // 补零函数
  padNumber(num: number): string {
    return num.toString().padStart(2, "0");
  }
}
