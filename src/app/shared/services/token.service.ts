import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenStorageName: string = "userToken";
  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.tokenStorageName, token);
  }

  getToken() {
    let token: string = localStorage.getItem("userToken");
    // alert("token"+token)
    if (token == null || token == 'undefined') {
      return "";
    }
    return token;
  }

  hasAccessToken(): boolean {
    return (localStorage.getItem("userToken") != null && localStorage.getItem("userToken").length > 0)
}
  removeToken() {
    
    localStorage.setItem(this.tokenStorageName, "");
    localStorage.removeItem(this.tokenStorageName);
  }

  
}
