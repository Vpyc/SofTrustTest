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
  captchaText: string | undefined;
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
      captcha: ['', [Validators.required, this.captchaValidator.bind(this)]]
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
    this.generateCaptcha();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const contact: Contact = {
        id : 0,
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
      this.generateCaptcha()
    }
  }

  generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captchaText = '';
    for (let i = 0; i < 6; i++) {
      this.captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }

  captchaValidator(control: { value: string | undefined; }) {
    if (control.value !== this.captchaText) {
      return { incorrect: true };
    }
    return null;
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
