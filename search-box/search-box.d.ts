import { EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { noop } from '../utils';
export declare class NgAisSearchBox extends BaseWidget implements AfterViewInit {
    instantSearchParent: any;
    searchBox: ElementRef;
    placeholder: string;
    submitTitle: string;
    resetTitle: string;
    searchAsYouType: boolean;
    autofocus: boolean;
    submit: EventEmitter<{}>;
    reset: EventEmitter<{}>;
    change: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    state: {
        query: string;
        refine: typeof noop;
    };
    constructor(instantSearchParent: any);
    ngAfterViewInit(): void;
    handleChange(query: string): void;
    handleSubmit(event: MouseEvent): void;
    handleReset(event: MouseEvent): void;
}