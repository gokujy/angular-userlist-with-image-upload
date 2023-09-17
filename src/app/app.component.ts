import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog'
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { TodoAddComponent } from './todo-add/todo-add.component';


//// INTER FACE FOR 
export interface todoInter {
  title: string;
  assingDate: number;
  dueDate: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'moon';

  // SET VAR
  todoSource : any;
  displayedColumns : string[] = ['title','assingDate','dueDate','status','File','Action'];

  constructor(public dialog: MatDialog){
    this.getListOfTodo();
  }

  // GET LOCAL LIST OF TODO
  getListOfTodo(){
    const dataLocal = localStorage.getItem("todooDetails") as any;
    const data     = JSON.parse(dataLocal);
    this.todoSource =  data;
  }

  /// OPEN ADD NEW TODO BOX
  openDialog(e : any = null,i : any = null): void {
    const dialogRef = this.dialog.open(TodoAddComponent, {
      height: '500px',
      width: '400px',
      data : {details : e,index : i}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.getListOfTodo();
      }
    });
  }


  /// ADDED TODO CAN WE DELETE CONFIME BOX
  deleteDialog(i : number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '160px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteTodo(i)
      }
    });
  }

  /// DELETE ADDED TODO LIST
  deleteTodo(e : any){

    const dataLocal = localStorage.getItem("todooDetails") as any;
    const data     = JSON.parse(dataLocal);
    data.splice(e,1);

    localStorage.setItem("todooDetails", JSON.stringify(data));
    
    this.getListOfTodo();
  }

  /// SEARCH FROM LOCAL DATA LIST.
  searchData(e : any){
    this.getListOfTodo();
    if (e.target.value.length >= 1) {
      this.todoSource = this.todoSource.filter((item : any) => {
        return ((item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) || (item.status .toLowerCase().indexOf(e.target.value.toLowerCase()) > -1));
      });
    } else if (e.target.value.length < 1) {
      this.getListOfTodo();
    }
  }
}
