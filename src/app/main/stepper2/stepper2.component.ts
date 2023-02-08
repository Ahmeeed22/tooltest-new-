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
    projectTitle: ['',[ Validators.required , Validators.maxLength(100)]],
    projectType: ['', Validators.required ],
    // projectCategory: [, Validators.required],
    desc : ['' , [Validators.required , Validators.maxLength(2000)]]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['',Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [],
  });

  thirdFormMain = this._formBuilder.group({
    testing_technique :[null,Validators.required] 
  })
  isEditable = true;

  stepperOrientation: Observable<StepperOrientation>;

  mat_step_header:HTMLCollectionOf<Element>=document.getElementsByTagName('mat-step-header')
// nada

isChecked: boolean = true;
userStoryForm1 = this._formBuilder.group({
  format:['user_story'],
  use_case_title: ['', [Validators.required,Validators.maxLength(100)]],
  asA: ['', [Validators.required,Validators.maxLength(100)]],
  want: ['',[Validators.required,Validators.maxLength(3000)]],
  soThat: ['',[Validators.required,Validators.maxLength(2200)]],
  userFlow: ['', [Validators.required,Validators.maxLength(2500)]],
});
useCaseForm2 = this._formBuilder.group({
  format:['use_case'],
  use_case_title: ['', [Validators.required,Validators.maxLength(100)]],
  use_case_description: ['',[Validators.required,Validators.maxLength(3500)]],
  actor: ['',[Validators.required,Validators.maxLength(100)]],
  precondtion: ['',[Validators.required,Validators.maxLength(1700)]],
  flow:['',[Validators.required,Validators.maxLength(2500)]]

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
    stepper.previous();
  }

  goForward(stepper: MatStepper){
      console.log(stepper);
      stepper.next();
  }

  goForwardToComplet(stepper: MatStepper){
    if(this.sh ===1){
      this.userStoryForm1.markAllAsTouched()
      if (this.userStoryForm1.valid && this.thirdFormMain.valid ) {
        stepper.next()
      }
    }
    if (this.sh ===0) {
      this.useCaseForm2.markAllAsTouched()
      if (this.useCaseForm2.valid && this.thirdFormMain.valid ) {
        stepper.next()
      }
    }
    
  }

  resetWizard(){
    window.location.reload();
  }

}
