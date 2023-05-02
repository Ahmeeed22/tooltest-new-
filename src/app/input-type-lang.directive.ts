import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputTypeLang]'
})
export class InputTypeLangDirective {

  @Input() defaultLang: 'ar'|'en'="en";
  arPattern=/^[^A-Za-z]*$/ ;
  enPattern=/^[A-Za-z0-9_@./#&+-,$ ]*$/ ;

  constructor(private _el:ElementRef) {
    console.log(this.defaultLang);
 
   }
  @HostListener('paste' , ['$event'])
  @HostListener('input', ['$event'])
  onEvent(event:any){
    let clipboardData = event.clipboardData ;
    let pastedText = clipboardData?.getData('text/plain');

    if(event.type==="paste" && !pastedText.match(this[`${this.defaultLang}Pattern`])) {event.preventDefault();this._el.nativeElement.value=this._el.nativeElement.value.slice(0, -1)}
    else if(!this._el.nativeElement.value.match(this[`${this.defaultLang}Pattern`])) this._el.nativeElement.value=this._el.nativeElement.value.slice(0, -1)

    }
}
