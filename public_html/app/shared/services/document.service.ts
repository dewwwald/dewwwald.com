import {Injectable} from '@angular/core'
import { document } from '@angular/platform-browser/src/facade/browser';

@Injectable()
export class DocumentService
{
    constructor(){}

    get nativeDocument() : Document
    {
        return document;
    }
}
