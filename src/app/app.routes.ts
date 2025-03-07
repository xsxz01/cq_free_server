import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DataManagementComponent } from "./pages/data-management/data-management.component";
import { ExploreComponent } from "./pages/explore/explore.component";
import { LocalComponent } from "./pages/local/local.component";
import { LaunchersComponent } from "./pages/launchers/launchers.component";
import { ToolsComponent } from "./pages/tools/tools.component";
import { ServerListComponent } from './pages/server-list/server-list.component';
import { OnlineServiceComponent } from './pages/online-service/online-service.component';
import { CategoryDetailComponent } from "./pages/category-detail/category-detail.component";
import { CategoryProductsComponent } from "./pages/category-products/category-products.component";

const routes: Routes = [
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
  {
    path: 'server-list',
    title: '开服列表',
    component: ServerListComponent
  },
  {
    path: 'online-service',
    loadComponent: () => import('./pages/online-service/online-service.component').then(m => m.OnlineServiceComponent)
  },
  {
    path: 'benefit-mall',
    loadComponent: () => import('./pages/benefit-mall/benefit-mall.component').then(m => m.BenefitMallComponent)
  },
  {
    path: 'category',
    component: CategoryDetailComponent,
    children: [
      { 
        path: ':subId',
        component: CategoryProductsComponent
      }
    ]
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    data: { animation: 'product-detail' }
  }
];

export { routes };