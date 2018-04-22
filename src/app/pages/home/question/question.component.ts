import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goRegister() {
    this.router.navigate(['home/register']);
  }

}
