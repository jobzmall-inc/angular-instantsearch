import { OnDestroy, OnInit } from '@angular/core';
export declare class Widget {
    init: () => void;
    getConfiguration: () => object;
    render: (params: {
        templatesConfig: object;
        state: object;
        results: {}[];
        createURL: (value: any) => string;
        instantSearchInstance: object;
    }) => void;
    dispose: (params: {
        helper: object;
        state: object;
    }) => object | void;
}
export declare type Connector = (renderFn: (state: object, isFirstRendering: boolean) => void, unmountFn: () => void) => (widgetOptions?: object) => Widget;
export declare class BaseWidget implements OnInit, OnDestroy {
    instantSearchParent: any;
    autoHideContainer?: boolean;
    widget?: Widget;
    state?: object;
    cx: Function;
    constructor(widgetName: string);
    createWidget(connector: Connector, options?: object): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateState: (state: {}, isFirstRendering: boolean) => void | Promise<void>;
    getItemClass(item: {
        isRefined?: boolean;
    }): any;
}