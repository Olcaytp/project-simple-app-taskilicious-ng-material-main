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

	constructor(private dataService: DataService, 
		private route: ActivatedRoute, 
		private router: Router 
		) { }

	ngOnInit(): void {
		this.dataService.getCategories().subscribe((data: any) => {
			this.categories = data;
		});
	}

	delete(id: number) {
		this.dataService.deleteCategory(id).subscribe(data => {
			console.log(data);
			this.router.navigate(['/categories']);
		})
	}
}
