import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  effect,
  EventEmitter,
  Output,
  QueryList,
  signal,
} from "@angular/core";
import { TabComponent } from "./tab/tab.component";

const ACTIVE_TAB_STORAGE_KEY = "activeSelected";

@Component({
  selector: "app-tab-group",
  templateUrl: "./tab-group.component.html",
  styleUrls: ["./tab-group.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent {
  @Output() onClose = new EventEmitter<number>();

  @ContentChildren(TabComponent) set tabs(tabs: QueryList<TabComponent>) {
    this.labels.set(tabs.map((tab) => tab.label));

    this._tabs.set(tabs);

    const activeSelectedCache = +localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);

    if (activeSelectedCache >= 0 && activeSelectedCache < tabs.length) {
      this.activeSelected.set(activeSelectedCache);
    } else if (tabs.length > 0) {
      this.activeSelected.set(0);
    }
  }

  readonly labels = signal<string[]>([]);
  readonly activeSelected = signal<number | undefined>(undefined);

  private readonly _tabs = signal<QueryList<TabComponent> | undefined>(
    undefined
  );

  constructor() {
    effect(() => {
      const activeSelected = this.activeSelected();

      localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeSelected + "");

      this._tabs()
        ?.toArray()
        .forEach((tab, i) => {
          tab.isActive = i === activeSelected;
        });
    }, {
      allowSignalWrites: true
    });
  }

  onSelect(index: number) {
    this.activeSelected.set(index);
  }
}
