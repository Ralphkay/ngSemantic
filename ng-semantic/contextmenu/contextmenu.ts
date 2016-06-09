import { Component, Input, ChangeDetectionStrategy, HostListener, Renderer } from "@angular/core";

/**
 * Implementation of Dropdown module on right click
 *
 * @link http://semantic-ui.com/modules/dropdown.html
 */
@Component({
    selector: "sm-contextmenu",
    styles: [`.sm-contextmenu { position: fixed; z-index: 1000; }`],
    template: `<div 
[style.left.px]="_position?.x" [style.top.px]="_position?.y"
[ngClass]="{'active visible': show}" class="ui dropdown sm-contextmenu">
 <div 
 [ngClass]="{'visible animating slide down in': show, 'hidden': !show}"  class="ui menu transition">
 <a (click)="menu.action()" *ngFor="let menu of items" class="item">
 <i class="{{menu.icon}} icon"></i>
 {{menu.title}}
 </a>
 </div>
 </div>
`
})
export class SemanticContextMenuComponent {
    _position: { x: number, y: number } = { x: 0, y: 0 };
    show: boolean = false;

    @Input() items: Array<{}>;

    @HostListener("document:click")
    public clickedOutside(): void {
        this.show = false;
    }

    constructor(renderer: Renderer) {

        renderer.listenGlobal("body", "contextmenu", (event: MouseEvent): void => {

            this._position = { x: event.clientX, y: event.clientY };
            this.show = true;

            // disable showing browser context menu
            event.preventDefault();
        });
    }
}
