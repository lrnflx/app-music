import { Injectable } from '@angular/core';
// Importez les modules nécessaires pour l'authentification
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    isAuth: boolean =false;
    
    constructor() { }

    // méthode d'authentification
    authenticate(email: string, password: string): Promise<any> {
        
        return firebase.auth().signInWithEmailAndPassword(email, password);
    
    }

    signOut(){
        this.isAuth = false;
    }
}