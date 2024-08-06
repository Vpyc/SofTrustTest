import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(18)]],
      topic: ['', Validators.required],
      description: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Форма невалидна');
    }
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  get topic() {
    return this.form.get('topic');
  }

  get description() {
    return this.form.get('description');
  }

  get captcha() {
    return this.form.get('captcha');
  }
}
