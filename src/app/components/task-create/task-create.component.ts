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
	teamMemberIds: string[] = [];
	teamMembers: string[] = [];

	url: any; //Angular 11, for stricter type
	msg = "";

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
			console.log("members")
			console.log(this.members)
		});

		this.form = new FormGroup({
			name: new FormControl(null, [Validators.required]),
			categoryId: new FormControl(null, [Validators.required])
		});
	}

	addTeamMember(member: any, isChecked: boolean) {
		if(isChecked) {
		console.log("memberId")
		this.teamMemberIds.push(member.id);
		this.teamMembers.push(member);
	} else {
		let index = this.teamMemberIds.indexOf(member.id);
		this.teamMemberIds.splice(index, 1);
		this.teamMembers.splice(index, 1);
	}
	console.log(this.teamMemberIds)
	console.log(this.teamMembers)
	}

	 //selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}

		this.dataService.uploadPhoto(this.url).subscribe((data: any) => {
			console.log(data);
			this.form.patchValue({
				photo: data.file
			});
		});
	}

	Submit() {
		if (this.form.invalid) {
			return;
		}
		this.dataService.createTask( this.teamMembers, this.teamMemberIds, this.form.value).subscribe(data => {
			this.router.navigate(['categories', this.form.value.categoryId]);
		})
	}

}
