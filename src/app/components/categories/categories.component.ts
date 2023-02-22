import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

	constructor(private categoryService: CategoryService, 
		private route: ActivatedRoute, 
		private router: Router 
		) { }

	ngOnInit(): void {
		this.categoryService.getCategories().subscribe((data: any) => {
			this.categories = data;
		});
	}

	// delete(id: number) {
	// 	this.categoryService.deleteCategory(id).subscribe(data => {
	// 		console.log(data);
	// 		this.router.navigate(['/categories']);
	// 	})
	// }
}
