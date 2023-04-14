import { Component, Input } from "@angular/core";

/**
 * Country flag icons.
 */
@Component({
  selector: 'app-flag',
  template: '<span class="fi fi-{{code | lowercase}}"></span>'
})
export class FlagComponent {
  // Country code
  @Input()
  code: string = '';

  @Input()
  squared: boolean = false;

  ngOnInit() {
    if (!this.code) {
      console.warn('Flag code is empty.');
    }
  }
}
