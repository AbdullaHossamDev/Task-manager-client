import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  addWorkflow(workflowData){
    return this.http.post<any>(`${this.baseUrl}/workflow/save`, workflowData);
  }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/workflow/getAll`);
  }

  getWorkflow(id){
    return this.http.get<any>(`${this.baseUrl}/workflow/${id}`);
  }

  update(workflowUpdated){
    return this.http.put<any>(`${this.baseUrl}/workflow/update`, workflowUpdated);
  }

  delete(id){
    return this.http.delete<any>(`${this.baseUrl}/workflow/delete/${id}`);
  }



}
