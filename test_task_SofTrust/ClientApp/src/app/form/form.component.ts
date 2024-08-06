import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Contact, DatabaseService, Topic} from "../services/database.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  _dbService : DatabaseService;
  topics : Topic[] | undefined;
  constructor(private fb: FormBuilder,
              databaseService: DatabaseService)
  {
    this._dbService = databaseService;
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(18)]],
      topic: ['', Validators.required],
      description: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._dbService.getTopics().subscribe(
      (data) => {
        this.topics = data;
      },
      (error) => {
        console.error('Error fetching topics:', error);
      }
    )
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const contact: Contact = {
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        description: this.form.value.description,
        topicId: this.form.value.topic
      };

      this._dbService.sendContact(contact).subscribe(
        response => {
          console.log('Контакт успешно сохранён!', response);
        },
        error => {
          console.error('Ошибка при сохранении контакта:', error);
        }
      );
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
