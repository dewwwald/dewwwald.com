import {Injectable} from '@angular/core'
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class DocumentService
{
    constructor(){}

    get nativeDocument()
    {
        return DOCUMENT;
    }
}
