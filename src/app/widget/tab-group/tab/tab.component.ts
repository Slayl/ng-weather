import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @HostBinding("attr.is-active") @Input() isActive = false;

  @Input({ required: true }) label: string;
}
