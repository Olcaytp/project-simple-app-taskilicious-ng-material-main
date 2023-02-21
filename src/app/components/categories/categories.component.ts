import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category.model';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
	selectedCategory: any;

	constructor(private categoryService: CategoryService) { }

	ngOnInit(): void {
	this.categoryService.getAll().subscribe(data => {
	  this.categories = data;
		console.log(this.categories);
	})
	}

	showInfo(category: any) {
	this.selectedCategory = category;
	console.log(this.selectedCategory);
	}

}
