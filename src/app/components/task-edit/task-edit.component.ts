import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/category.model';
import { Task } from 'src/app/task.model';
import { DataService } from 'src/app/Service/data.service';
import { Member } from 'src/app/member.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  enteredName = '';
  category: Category;
  form!: FormGroup;
  id: any;

  categories: Category[] = [];
  categoryid: number;

  tasks: Task[] = [];
  selectedTask: any;
  filteredTasks: Task[] = [];
  taskID: any;

  members: Member[] = [];
  teamMemberIds: string[] = [];
  teamMembers: string[] = [];
  

  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required])
    });

    this.dataService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });


    this.taskID = this.route.snapshot.paramMap.get('id');
    this.dataService.getTasks().subscribe((data: any) => {
      this.tasks = data;
      this.selectedTask = this.tasks.find((task: Task) => task.id === this.taskID);
      this.filteredTasks = this.tasks.filter((task: Task) => task.categoryId === this.categoryid);
    });

    this.dataService.getMembers().subscribe((data: any) => {
      this.members = data;
    });
  }

  updateTeamMember(member: any, isChecked: boolean) {
    if (isChecked) {
      this.teamMemberIds.push(member.id);
      this.teamMembers.push(member);
    } else {
      let index = this.teamMemberIds.indexOf(member.id);
      this.teamMemberIds.splice(index, 1);
      this.teamMembers.splice(index, 1);
    }
  }

  Submit() {
    if (this.form.invalid) {
      return;
    }
    this.dataService.updateTask(this.selectedTask.id, this.teamMembers, this.teamMemberIds, this.form.value)
    .subscribe(data => {
      this.router.navigate(['categories', this.form.value.categoryId]);
    })
  }

}
