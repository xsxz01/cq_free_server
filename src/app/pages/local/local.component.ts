import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { MatMenuModule, type MatMenu } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';


interface GameVersion {
  id: number;
  name: string;
  version: string;
  status: "running" | "stopped";
}

@Component({
  selector: "app-local",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: "./local.component.html",
  styleUrls: ["./local.component.scss"],
})
export class LocalComponent {
  @ViewChild('serverMenu') serverMenu!: MatMenu;
  versions: GameVersion[] = Array(20)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      name: `热血传奇版本 ${i + 1}`,
      version: `v1.${i}.${Math.floor(Math.random() * 10)}`,
      status: Math.random() > 0.5 ? "running" : "stopped",
    }));

  currentPage = 1;
  pageSize = 20;
  totalPages = 5;

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  prevPage() {
    this.currentPage = Math.max(1, this.currentPage - 1);
  }

  nextPage() {
    this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
  }

  gotoPage(page: number) {
    this.currentPage = page;
  }

  start(item: GameVersion) {
    item.status = "running";
  }

  stop(item: GameVersion) {
    item.status = "stopped";
  }

  delete(item: GameVersion) {
    this.versions = this.versions.filter((v) => v.id !== item.id);
  }
}
