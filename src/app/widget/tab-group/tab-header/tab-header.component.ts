import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

@Component({
  selector: "app-tab-header",
  templateUrl: "./tab-header.component.html",
  styleUrls: ["./tab-header.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabHeaderComponent {
  @Input({ required: true }) labels: string[];

  @Input({ required: true }) activeSelected: number | undefined;

  @Output() onSelect = new EventEmitter<number>();

  @Output() onClose = new EventEmitter<number>();

  constructor() {}
}
