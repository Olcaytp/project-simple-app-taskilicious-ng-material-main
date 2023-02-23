import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category.model';
import { Task } from '../task.model';
import { Member } from '../member.model';

const baseUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/categories';

const taskUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/tasks';

const memberUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/team-members';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  photoUploadUrl = 'https://upload.uploadcare.com/base/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(taskUrl);
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(memberUrl);
  }

  getCategory(id: any): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
  }

  getTask(id: any): Observable<Task> {
    return this.http.get<Task>(`${taskUrl}/${id}`);
  }

  getMember(id: any): Observable<Member> {
    return this.http.get<Member>(`${memberUrl}/${id}`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  createTask(teamMembers: string[], teamMemberIds: string[], data: any): Observable<any> {
    data.teamMemberIds = teamMemberIds;
    data.teamMembers = teamMembers;
    return this.http.post(taskUrl, data);
  }

  crateMember(teamMembers: [], data: any): Observable<any> {
    data.teamMembers = teamMembers;
    return this.http.post(memberUrl, data);
  }

  updateCategory(id: any, data: any): Observable<any> {
    data.id = id;
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  updateTask(id: number, teamMembers: string[], teamMemberIds: string[], data: any): Observable<any> {
    data.teamMemberIds = teamMemberIds;
    data.teamMembers = teamMembers;
    return this.http.put(`${taskUrl}/${id}`, data);
  }

  updateMember(id: any, data: any): Observable<any> {
    return this.http.put(`${memberUrl}/${id}`, data);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteTask(id: any): Observable<any> {
    return this.http.delete(`${taskUrl}/${id}`);
  }

  deleteMember(id: any): Observable<any> {
    return this.http.delete(`${memberUrl}/${id}`);
  }

  uploadPhoto(file: File): Observable<any> {
    const formData: FormData = new FormData();
    
    formData.append('file', file);

    return this.http.post<any>(this.photoUploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
    
  }


}
