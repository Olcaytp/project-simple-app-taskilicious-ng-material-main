import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category.model';
import { Task } from '../task.model';
import { Member } from '../member.model';

const baseUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/categories';

const taskUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/tasks';

const memberUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/team-members';

const photoUploadUrl = 'https://upload.uploadcare.com/base/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  createTask(data: any): Observable<any> {
    return this.http.post(taskUrl, data);
  }

  crateMember(data: any): Observable<any> {
    return this.http.post(memberUrl, data);
  }

  updateCategory(id: any, data: any): Observable<any> {
    data.id = id;
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  updateTask(id: any, data: any): Observable<any> {
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

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${photoUploadUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${photoUploadUrl}/files`);
  }


}
