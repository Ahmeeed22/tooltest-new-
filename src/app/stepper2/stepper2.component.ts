import { Component, OnInit ,ElementRef ,AfterViewInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
export interface User {
  name: string;
  id?:Number
}
@Component({
  selector: 'app-stepper2',
  templateUrl: './stepper2.component.html',
  styleUrls: ['./stepper2.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})

export class Stepper2Component implements OnInit ,AfterViewInit {
  categories: {}[]= [
    {
      name: 'category 1',
      id: 1
    },
    {
      name: 'category 2',
      id: 2
    },
    {
      name: 'category 3',
      id: 3
    },
    {
      name: 'category 4',
      id: 4
    }
  ]
  firstFormGroup = this._formBuilder.group({
    projectName: ['', Validators.required],
    projectType: ['', Validators.required],
    projectCategory: [, Validators.required],
    desc : ['' , Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['',Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [],
  });
  isEditable = true;

  stepperOrientation: Observable<StepperOrientation>;

  mat_step_header:HTMLCollectionOf<Element>=document.getElementsByTagName('mat-step-header')
// nada

isChecked: boolean = true;
userForm1 = this._formBuilder.group({
  asA: ['', Validators.required],
  want: ['',Validators.required],
  soThat: ['',Validators.required],
  userFlow: ['', Validators.required],
});
userForm2 = this._formBuilder.group({
  title: ['', Validators.required],
  desceiption: ['',Validators.required],
  actor: ['',Validators.required],
  precondtion: ['',Validators.required],
  flow:['',Validators.required]

});
sh: any
//nada
  
  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver ,private elementRef:ElementRef) {
    this.stepperOrientation = breakpointObserver
  .observe('(min-width: 1000px)')
  .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
}

// auto complete
// projectCategory = new FormControl<string | User>('');
  options: User[] = [{name: 'Mary',id:1}, {name: 'Shelley',id:2}, {name: 'Igor',id:3}];
  filteredOptions?: Observable<User[]>;

  ngOnInit() {
    

  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('mat-step-header')
                                  .addEventListener('click', this.onClick.bind(this));
  }
  
  onClick(event:any) {
    event.preventDefault()
    console.log(event);
  
  }

  goBack(stepper: MatStepper){
    console.log(stepper.selectedIndex);
    console.log(stepper.selectionChange);
    
    
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    this.firstFormGroup.controls.projectCategory.markAsTouched()
      stepper.next();
  }


  getResult(){
    console.log(this.firstFormGroup.controls.projectCategory.value);
    
  }
  resetWizard(){
    window.location.reload();
  }

  // nada

  addUserForm1() {
    console.log(this.userForm1.value);
  }
  addUserForm2() {
    console.log(this.userForm2.value);
  }
}
