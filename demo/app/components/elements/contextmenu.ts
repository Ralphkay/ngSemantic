import {Component, Type } from "@angular/core";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { CodeblockComponent, PrismJsDirective } from "../../prismjs/prismjs";
import { ContextMenuService, IContextMenu } from "../../services/contextmenu";

declare var jQuery: any;

@Component({
    directives: [SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES, <Type>CodeblockComponent, <Type>PrismJsDirective],
    selector: "sm-demo-component",
    template: `<sm-card (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" class="ui card">
    <card-title>Hello 1</card-title>
    <card-content>Hello from card</card-content>
</sm-card>`
})
class DemoInnerComponent {

    constructor(public contextmenu: ContextMenuService) {}

    onMouseEnter() {
        this.contextmenu.menu.next({
            action: (): void => { location.assign("/#/elements/accordion"); },
            icon: "add",
            method: 1,
            title: "Add new Card",
        });
    }

    onMouseLeave() {
        this.contextmenu.menu.next({
            action: (): void => { location.assign("/#/elements/accordion"); },
            icon: "add",
            method: 0,
            title: "Add new Card",
        });
    }
}

@Component({
    directives: [SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES, <Type>CodeblockComponent, <Type>PrismJsDirective,
    <Type>DemoInnerComponent],
    selector: "sm-page-contextmenu",
    template: `
    <div class="ui masthead vertical segment">
        <div class="ui container">
            <h1>Conextmenu</h1>
            <p>Based on Semantic UI Dropdown module <i class="icon external"></i>
            <a href="http://semantic-ui.com/modules/dropdown.html" target="_blank">Semantic UI Dropdown</a></p>
        </div>
    </div>
    <div class="main ui container">
    
        <p>To activate contextmenu, press right click anywhere on the page.</p>
        
        <sm-modal selector="modal" title="Simple modal" class="">
            You activated it trough context menu!
        </sm-modal>
        
        <h4 class="header">Demo ( hover on inner components )</h4>
        <sm-demo-component></sm-demo-component>
        
        <sm-contextmenu [items]="menuItems"></sm-contextmenu>
    </div>
    `
})

export class ContextmenuComponent {

    menuItems: Array<IContextMenu> = [];

    constructor(contextmenu: ContextMenuService) {

        contextmenu.menu.subscribe((item: IContextMenu) => {
            if (item.method) {
                this.menuItems = [...this.menuItems, item];
            } else {
                item.method = 1;
                this.menuItems.splice(this.menuItems.indexOf(item), 1);
            }
        });

        contextmenu.menu.next({
            action: (): void => { location.assign("/#/elements/accordion"); },
            icon: "home",
            method: 1,
            title: "Go to Accordion Page",
        });

        contextmenu.menu.next({
            action: (): void => { location.reload(); },
            icon: "refresh",
            method: 1,
            title: "Refresh window"
        });

        contextmenu.menu.next({
            action: (): void => { jQuery(".ui.modal.modal")
                .modal("toggle"); },
            icon: "browser",
            method: 1,
            title: "Open modal Window"
        });
    }
}
