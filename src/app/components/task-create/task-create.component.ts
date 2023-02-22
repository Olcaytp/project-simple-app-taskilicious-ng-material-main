import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category.model';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
	selector: 'app-task-create',
	templateUrl: './task-create.component.html',
	styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
	enteredName = '';
	category: Category;
	form!: FormGroup;
	id: any;

	categories: Category[] = [];
	selectedCategory: any;
	categoryid: any;

	constructor(private categoryService: CategoryService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(null, [Validators.required]),
			categoryId: new FormControl(null, [Validators.required])
		});
		this.categoryid = this.route.snapshot.paramMap.get('id');
		this.categoryService.getCategories().subscribe((data: any) => {
			this.categories = data;
			this.selectedCategory = this.categories.find((category: Category) => category.id === this.categoryid);
		});
	}

	Submit() {
		if (this.form.invalid) {
			return;
		}
		this.categoryService.createTask(this.form.value).subscribe(data => {
			this.router.navigate(['categories', this.form.value.categoryId]);
		})
	}

}
