import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {
   TREE_DATA: any[] = [
    {
      name: 'Folder 0',
      children: [{name: 'File 0'}, {name: 'File 1'}],
    },
    {
      name: 'Folder 1',
      children: [
        {
          name: 'File 0',
          //children: [{name: 'file 0'}, {name: 'file 1'}],
        },
        {
          name: 'File 1'
        }
      ],
    },
  ];
 
  
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  
  constructor() { 
    this.dataSource.data = this.TREE_DATA;

  }
  hasChild = (_: number, node: any) => node.expandable;


  ngOnInit(): void {
  }

}
