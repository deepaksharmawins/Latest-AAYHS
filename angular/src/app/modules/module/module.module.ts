import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyMaintenanceComponent } from './components/yearly-maintenance/yearly-maintenance.component';
import { StallAssignmentComponent } from './components/stall-assignment/stall-assignment.component';
import { SharedModule } from '../../shared/shared.module';
import { ModuleRoutingModule } from './module-routing.module';
import { ReportsComponent } from './components/reports/reports.component';
import { ScansComponent } from './components/scans/scans.component';
import { StatementsComponent } from './components/statements/statements.component';
import { FinancialsComponent } from './components/financials/financials.component';
import { OtherReportsComponent } from './components/other-reports/other-reports.component';



@NgModule({
  declarations: [YearlyMaintenanceComponent, ReportsComponent, StallAssignmentComponent, ScansComponent, StatementsComponent, FinancialsComponent, OtherReportsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModuleRoutingModule
  ]
})
export class ModuleModule { }
