import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TabGroupComponent } from "./tab-group/tab-group.component";
import { TabHeaderComponent } from "./tab-group/tab-header/tab-header.component";
import { TabComponent } from "./tab-group/tab/tab.component";

@NgModule({
  declarations: [TabGroupComponent, TabHeaderComponent, TabComponent],
  imports: [CommonModule, BrowserModule],
  exports: [TabGroupComponent, TabComponent],
})
export class WidgetModule {}
