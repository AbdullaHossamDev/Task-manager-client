import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  addTask(taskData){
    return this.http.post<any>(`${this.baseUrl}/task/save`, taskData);
  }

  getTask(id){
    return this.http.get<any>(`${this.baseUrl}/task/get/${id}`);
  }

  getMyTasks(){
    return this.http.get<any>(`${this.baseUrl}/task/get`);
  }

  update(fieldToUpdate){
    return this.http.patch<any>(`${this.baseUrl}/task/update`, fieldToUpdate);
  }

  updateAll(taskUpdated){
    return this.http.put<any>(`${this.baseUrl}/task/update`, taskUpdated);
  }

  delete(id){
    return this.http.delete<any>(`${this.baseUrl}/task/delete/${id}`)
  }


}
