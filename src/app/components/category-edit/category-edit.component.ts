import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category.model';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  enteredName = '';
	category: Category;
	form!: FormGroup;

  constructor(private categoryService: CategoryService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategory(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.category = data;
    });
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  Submit() {
    if (this.form.invalid) {
      return;
    }

    this.categoryService.updateCategory(this.category.id, this.form.value).subscribe(data => {
      this.router.navigate(['/']);
    })
    } 

}
