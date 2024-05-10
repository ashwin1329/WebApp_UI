import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}signup`,userObj);
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
}

















// export class ApiService {

//   constructor(private http: HttpClient) { }

//   postEmploye(data: any){ 
//     return this.http.post("http://localhost:3000/posts",data)
//     .pipe(map((res:any)=>{   
//     return res;   
//     }))     
//   }
     
//   getEmployee(){    
//     return this.http.get("http://localhost:3000/posts")
//     .pipe(map((res:any)=>{
//     return res; 
//     }))  
//   }

//   updateEmployee(data:any,id: number){
//     return this.http.put("http://localhost:3000/posts/"+id,data)
//     .pipe(map((res:any)=>{   
//     return res;  
//     })) 
//   }
     
//   deleteEmployee(id:number){
//     return this.http.delete("http://localhost:3000/posts/"+id)
//     .pipe(map((res:any)=>{
//     return res;   
//     }))  
//   }
// }
