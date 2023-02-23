import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category.model';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	categories: Category[] = [];
	selectedCategory: any;

	value = "";


	constructor(private dataService: DataService, 
		private route: ActivatedRoute, 
		private router: Router 
		) { }

	ngOnInit(): void {
		this.dataService.getCategories().subscribe((data: any) => {
			this.categories = data;
		});
	}

	ascSort() {
		//make categories names first letter uppercase
		this.categories.forEach(category => {
			category.name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
		});

		let sortedCategories = this.categories.sort((a, b) => a.name.localeCompare(b.name));
		this.categories = sortedCategories;
	}

	descSort() {
		//make categories names first letter uppercase
		this.categories.forEach(category => {
			category.name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
		});
		//sort categories descending by name
		let descSortedCategories =  this.categories.sort((a, b) => {
			if (a.name > b.name) {
				return -1;
			}
			if (a.name < b.name) {
				return 1;
			}
			return 0;
		});
		this.categories = descSortedCategories;
	}

	delete(id: number) {
		this.dataService.deleteCategory(id).subscribe(data => {
			console.log(data);
			this.router.navigate(['/categories']);
		})
	}
}
