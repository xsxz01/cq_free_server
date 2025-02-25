import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DataManagementComponent } from "./pages/data-management/data-management.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    title: "仪表盘",
  },
  {
    path: "data",
    component: DataManagementComponent,
    title: "数据管理",
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];
