import { EventEmitter, Renderer } from "@angular/core";
export declare class SemanticContextMenuComponent {
    _position: {
        x: number;
        y: number;
    };
    show: boolean;
    items: Array<{}>;
    reducer: EventEmitter<{}>;
    clickedOutside(): void;
    constructor(renderer: Renderer);
}
