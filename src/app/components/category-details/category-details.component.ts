import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/category.model';
import { CategoryService } from 'src/app/Service/category.service';
import { Task } from 'src/app/task.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  categories: Category[] = [];
	selectedCategory: any;
  categoryid: any;

  tasks: Task[] = [];
  selectedTask: any;
  filteredTasks: Task[] = [];
  taskID: any;

  constructor(private categoryService: CategoryService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.selectedCategory = this.categories.find((category: Category) => category.id === this.categoryid);
    });

    this.taskID = this.route.snapshot.paramMap.get('id');
    this.categoryService.getTasks().subscribe((data: any) => {
      this.tasks = data;
      this.selectedTask = this.tasks.find((task: Task) => task.id === this.taskID);
      this.filteredTasks = this.tasks.filter((task: Task) => task.categoryId === this.categoryid);
    });
  }

	delete(id: number) {
		this.categoryService.deleteTask(id).subscribe(data => {
			this.router.navigate(['/categories']);
		})
	}

}
