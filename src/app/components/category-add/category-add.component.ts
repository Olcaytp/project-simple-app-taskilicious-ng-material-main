import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/category.model';
import { CategoryService } from 'src/app/Service/category.service';

	@Component({
	selector: 'app-category-add',
	templateUrl: './category-add.component.html',
	styleUrls: ['./category-add.component.scss']
	})
	export class CategoryAddComponent implements OnInit {
	enteredName = '';
	category: Category;
	form!: FormGroup;

	constructor(private categoryService: CategoryService, private router: Router) { }

	ngOnInit(): void {
	this.form = new FormGroup({
		name: new FormControl(null, [Validators.required])
	});
	}

	Submit() {
	console.log(this.form.value);
	if (this.form.invalid) {
		return;
	}
	this.categoryService.createCategory(this.form.value).subscribe(data => {
		console.log(data);
		this.router.navigate(['/']);
	})
	} 

}
