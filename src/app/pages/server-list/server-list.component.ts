import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ShortUrlPipe } from "../../pipe/short-url.pipe";
import { DateTimePickerComponent } from "../../components/date-time-picker/date-time-picker.component";
import { DatePickerComponent } from "../../components/date-picker/date-picker.component";
import { TruncatePipe } from "../../pipe/truncate.pipe";
import { TimePickerComponent } from "../../components/time-picker/time-picker.component";

interface ServerInfo {
  name: string;
  website: string;
  openTime: Date;
  region: string;
  version: string;
  line: string;
  qq: string;
  priority: number; // 添加优先级字段（1: 最高 3: 最低）
}
@Component({
  selector: "app-server-list",
  imports: [
    CommonModule,
    RouterModule,
    ShortUrlPipe,
    FormsModule,
    DatePickerComponent,
    TruncatePipe,
    TimePickerComponent
],
  templateUrl: "./server-list.component.html",
  styleUrls: ["./server-list.component.scss"],
})
export class ServerListComponent {
  // 在组件类中添加以下属性
  selectedTags = new Set<string>();
  tags = [
    "无限刀",
    "攻速版",
    "复古",
    "微变",
    "中变",
    "超变",
    "单职业",
    "多大陆",
  ];
  timeOptions = [
    { label: "15分钟内", value: 15 },
    { label: "1小时内", value: 60 },
    { label: "24小时内", value: 1440 },
    { label: "一周内", value: 10080 },
  ];
  selectedTime?: number;
  startTime: string = "00:00";
  endTime: string = "00:00";
  searchText = "";
  startDate: Date = new Date();
  endDate: Date = new Date();

  onTimeChanged(type: "start" | "end", time: string) {
    if (type === "start") {
      this.startTime = time;
    } else {
      this.endTime = time;
    }
  }

  // 添加方法
  toggleTag(tag: string) {
    this.selectedTags.has(tag)
      ? this.selectedTags.delete(tag)
      : this.selectedTags.add(tag);
    this.filterServers();
  }

  selectTime(minutes: number) {
    this.selectedTime = minutes;
    this.filterServers();
  }

  applyCustomTime() {
    this.selectedTime = undefined;
    this.filterServers();
  }

  search() {
    this.filterServers();
  }

  filterServers() {
    // 实现筛选逻辑，根据选择的条件过滤 serverList
  }
  // 新增组件属性
  activePicker: "start-date" | "end-date" | "time-picker" | null = null;
  currentMonth = "";
  days: Date[] = [];
  selectedHour: number = 0;
  selectedMinute: number = 0;
  tempTimeType: "start" | "end" = "start";

  onDateSelected(type: "start" | "end", date: Date) {
    if (type === "start") {
      this.startDate = date;
    } else {
      this.endDate = date;
    }
  }

  // 时间增减方法
  adjustTime(unit: "hour" | "minute", increment: boolean) {
    if (unit === "hour") {
      this.selectedHour = (this.selectedHour + (increment ? 1 : -1) + 24) % 24;
    } else {
      this.selectedMinute =
        (this.selectedMinute + (increment ? 5 : -5) + 60) % 60;
    }
  }
  serverList: ServerInfo[] = [
    // 高优先级数据（红色边框）
    {
      name: "🔥 皇冠·激情战场",
      website: "https://hwzb.com",
      openTime: new Date(),
      region: "全国BGP",
      line: "电信一区",
      version: "全新战法/爆率全开/千人在线",
      qq: "66889900",
      priority: 1,
    },
    // 中优先级数据（黄色边框）
    {
      name: "⭐ 龙魂·经典复古",
      website: "https://lhfg.com",
      openTime: new Date(Date.now() - 3600000 * 5),
      region: "华南双线",
      line: "电信一区",
      version: "1.76复古/无英雄/手动练级",
      qq: "11223344",
      priority: 2,
    },
    // 低优先级数据（蓝色边框）
    {
      name: "寒冰·沉默世界",
      website: "https://hbsj.com",
      openTime: new Date(Date.now() - 3600000 * 24),
      region: "西南电信",
      line: "电信一区",
      version: "长久沉默/装备可回收",
      qq: "55667788",
      priority: 3,
    },
    // 更多假数据...
    {
      name: "战神·终极觉醒",
      website: "https://zsjx.com",
      openTime: new Date(Date.now() - 3600000 * 3),
      region: "华东多线",
      line: "电信一区",
      version: "独家版本/首战奖励",
      qq: "33221144",
      priority: 1,
    },
    {
      name: "明月·修仙传说",
      website: "https://myxx.com",
      openTime: new Date(Date.now() - 3600000 * 12),
      region: "华中双线",
      line: "电信一区",
      version: "修仙养成/境界突破",
      qq: "90908877",
      priority: 2,
    },
  ].sort((a, b) => a.priority - b.priority); // 根据优先级排序

  // 在组件类中添加
  onStartDateChanged(date: Date) {
    this.startDate = date;
  }

  onStartTimeChanged(time: string) {
    this.startTime = time;
  }

  onEndDateChanged(date: Date) {
    this.endDate = date;
  }

  onEndTimeChanged(time: string) {
    this.endTime = time;
  }
}
