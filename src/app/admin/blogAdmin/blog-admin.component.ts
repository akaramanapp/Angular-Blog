import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';


@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit {
  theUser: string;
  menuChoice: string;
  blogPosts: Blog[];
  singlePost: Blog;
  formDisplay: boolean = false;
  loading: boolean = false;

  constructor(
    private userSVC: UserService,
    private router: Router,
    private blogAdminSVC: BlogAdminService
  ) { }

  logout() {
    this.userSVC.logout();
    this.router.navigate(['']);
  }

  chooseMode(mode: string) {
    this.menuChoice = mode;
  }

  ngOnInit() {
    this.loading = true;
    this.theUser = this.userSVC.loggedInUser;
    this.getPosts();
  }

  getPosts() {
    let dbRef = firebase.database().ref('blogPosts/');
    dbRef.once('value')
      .then((snapshot) => {
        let tmp: string[] = snapshot.val();
        this.blogPosts = Object.keys(tmp).map(key => tmp[key])
        this.loading = false
      });
  }

  editPost(thePost: Blog) {
    this.singlePost = thePost;
    this.formDisplay = true;
  }

  cancelEdit() {
    this.formDisplay = true;
  }

  updatePost(single: Blog) {
    this.blogAdminSVC.editPost(single);
    this.formDisplay = false;
  }

  deletePost(single: Blog) {
    let verify = confirm('Silmek istediğinize emin misiniz?');
    if (verify == true) {
      this.blogAdminSVC.removePost(single);
      this.router.navigate(['/admin/']);
    } else {
      alert('Noting deleted.');
    }
  }
}
