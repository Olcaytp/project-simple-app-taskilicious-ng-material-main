import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category.model';
import { Task } from '../task.model';

const baseUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/categories';

const taskUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/tasks';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(taskUrl);
  }

  getCategory(id: any): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
  }

  getTask(id: any): Observable<Task> {
    return this.http.get<Task>(`${taskUrl}/${id}`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(taskUrl, data);
  }

  updateCategory(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  updateTask(id: any, data: any): Observable<any> {
    return this.http.put(`${taskUrl}/${id}`, data);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteTask(id: any): Observable<any> {
    return this.http.delete(`${taskUrl}/${id}`);
  }

  deleteAllCategories(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  deleteAllTasks(): Observable<any> {
    return this.http.delete(taskUrl);
  }

  findByTitle(title: any): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}?title=${title}`);
  }


}
