import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  // SET VAR
  todoData      : FormGroup;
  selectedFiles : any;
  todoDetails   : any;
  todoIndex     : number;

  constructor(public fb:FormBuilder,private dialogRef: MatDialogRef<TodoAddComponent>,@Inject(MAT_DIALOG_DATA) data : any) { 
   
    this.todoDetails  = data.details;
    this.todoIndex    = data.index;
    
    // CALL FORM
    this.todoData = this.fb.group({
      title      : ['',Validators.required],
      assingDate : ['',Validators.required],
      dueDate    : ['',Validators.required],
      status     : ['',Validators.required],
    })
  }

  ngOnInit(): void {
    if(this.todoDetails){
      this.todoData.patchValue(this.todoDetails);
    } 
  }

  // SUBMIT DATA
  submitTodo(){
    
    let data : any = [];
    let todo:  any;

    this.todoData.value.file = this.selectedFiles ? this.selectedFiles : '';  
    
    const dataLocal = localStorage.getItem("todooDetails") as any;
    const parse     = JSON.parse(dataLocal);
    if(parse){
      console.log(parse);
      todo = [...parse,this.todoData.value];
    }else{
      todo = [...data,this.todoData.value];
    }
          
    localStorage.setItem("todooDetails", JSON.stringify(todo));
    this.dialogRef.close();
  }

  // UPDATE ADDED TODO LIST
  updateTodo(){
    
    this.todoData.value.file = this.selectedFiles ? this.selectedFiles : this.todoDetails.file;  
    
    const dataLocal = localStorage.getItem("todooDetails") as any;
    const parse     = JSON.parse(dataLocal);
    parse[this.todoIndex]   = this.todoData.value;
          
    localStorage.setItem("todooDetails", JSON.stringify(parse));
    this.dialogRef.close();
  }

  //CLOSR TODO EDIT BOX
  closeDialog(){
    this.dialogRef.close(1);
  }

  // CONVERT FILE BASE64
  convertFile(event : any) {
    const file = event.target.files[0];
    const size = Math.round(event.target.files[0].size / 1024);
    const type = event.target.files[0].type.split("/");

    if(size >= 200){
      alert("image only with 200kb max size");
      debugger
    }else if(type[1] != 'png' && type[1] != 'jpg'){
      alert("document format not supported supported formats jpeg, png");
    }else{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.selectedFiles = reader.result;
      };
    }
}
}
