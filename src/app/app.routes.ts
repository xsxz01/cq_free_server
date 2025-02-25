import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DataManagementComponent } from "./pages/data-management/data-management.component";
import { ExploreComponent } from "./pages/explore/explore.component";
import { LocalComponent } from "./pages/local/local.component";
import { LaunchersComponent } from "./pages/launchers/launchers.component";
import { ToolsComponent } from "./pages/tools/tools.component";

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
  { 
    path: "explore", 
    component: ExploreComponent,
    title: "探索版本" 
  },
  { 
    path: "local", 
    component: LocalComponent,
    title: "本地版本" 
  },
  { 
    path: "launchers", 
    component: LaunchersComponent,
    title: "免费列表" 
  },
  { 
    path: "tools", 
    component: ToolsComponent,
    title: "常用工具" 
  },
];
