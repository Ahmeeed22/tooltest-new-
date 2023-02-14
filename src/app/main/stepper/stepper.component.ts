
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class StepperComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
        this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }



  ngOnInit(): void {
  }

}

  //  TREE_DATA: any[] = [
  //   {
  //     name: 'Folder 0',
  //     children: [{name: 'File 0'}, {name: 'File 1'}],
  //   },
  //   {
  //     name: 'Folder 1',
  //     children: [
  //       {
  //         name: 'File 0',
  //         //children: [{name: 'file 0'}, {name: 'file 1'}],
  //       },
  //       {
  //         name: 'File 1'
  //       }
  //     ],
  //   },
  // ];
 
  
  // private _transformer = (node: any, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //   };
  // };

  // treeControl = new FlatTreeControl<any>(
  //   node => node.level,
  //   node => node.expandable,
  // );

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   node => node.level,
  //   node => node.expandable,
  //   node => node.children,
  // );

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
//   constructor() { 
    // this.dataSource.data = this.TREE_DATA;

//   }
  // hasChild = (_: number, node: any) => node.expandable;
