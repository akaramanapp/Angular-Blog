import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;
    constructor(private router: Router) {
        firebase.initializeApp({
            apiKey: "AIzaSyDcr5Y7r0opbC_ktmAb_D3E1YerwgP3ecY",
            authDomain: "myblog-1733e.firebaseapp.com",
            databaseURL: "https://myblog-1733e.firebaseio.com",
            storageBucket: "myblog-1733e.appspot.com",
            messagingSenderId: "561815772455"
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error){
            alert(error.message + ' Please Try Again!');
        });
    }

    verifyUser(){
        this.authUser = firebase.auth().currentUser;
        if(this.authUser){
            alert(this.authUser.email + ' Hoş Geldin!');
            this.loggedInUser = this.authUser.email;

            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string){
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
        .catch(function(error){
            alert(error.message + ' Unable to login!')
        });
    }

    logout(){
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function(){
            alert('Logged Out!');
        }, function(error){
            alert('${error.message} Unable to logout. Try Again!')
        });
    }
}