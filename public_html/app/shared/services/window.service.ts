import {Injectable} from '@angular/core'
import { window } from '@angular/platform-browser/src/facade/browser';

@Injectable()
export class WindowService
{
    constructor(){}

    get nativeWindow() : Window
    {
        return window;
    }
}
