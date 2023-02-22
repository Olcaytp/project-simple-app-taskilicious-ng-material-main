import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category.model';
import { Member } from 'src/app/member.model';
import { DataService } from 'src/app/Service/data.service';

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
	categoryid: any;

	members: Member[] = [];
	selectedMember: Member;
	teamMemberIds: number[] = [];
	member: any;

	constructor(private dataService: DataService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.dataService.getCategories().subscribe((data: any) => {
			this.categories = data;
			console.log(this.categories)
		});
		this.dataService.getMembers().subscribe((data: any) => {
			this.members = data;
			console.log(this.members)
		});
		//not working
		this.dataService.getMember(this.route.snapshot.params['id']).subscribe((data: any) => {
			this.member = data;
			console.log(this.member)
		});

		this.form = new FormGroup({
			name: new FormControl(null, [Validators.required]),
			categoryId: new FormControl(null, [Validators.required]),
			teamMemberIds: new FormControl(null, [Validators.required]),
		});
	}

	Submit() {
		if (this.form.invalid) {
			return;
		}
		this.dataService.createTask(this.form.value).subscribe(data => {
			this.router.navigate(['categories', this.form.value.categoryId]);
		})
	}

}
