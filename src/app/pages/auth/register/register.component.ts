import { Component, type OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import type { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../service/alert.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  captchaUrl = '';

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    captcha: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.loadCaptcha();
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
        const userData = {
            username: this.registerForm.value.username!,
            email: this.registerForm.value.email!,
            password: this.registerForm.value.password!,
            captcha: this.registerForm.value.captcha!
          } as User;
      this.auth.register(userData).subscribe({
        next: async (res) => this.handleRegistrationSuccess(res),
        error: (err) => console.error('注册失败:', err)
      });
    }
  }
  async handleRegistrationSuccess(response: any): Promise<void> {
    // 处理注册成功的逻辑
    // 判断code是否为0，如果是0则注册成功
    if (response.code === 0) {
      // 判断是否是验证码错误
      if (response.msg === '验证码错误') {
        await this.alertService.error(response.msg);
        this.refreshCaptcha();
        return;
      }
      await this.alertService.success(response.msg);
      await this.router.navigate(['/auth/login']);
      return;
    } else {
      await this.alertService.error(response.msg);
      this.refreshCaptcha();
    }
  }

  loadCaptcha() {
    this.auth.getCaptchaImage().subscribe({
      next: (blob: Blob) => {
        if (blob instanceof Blob) {
          this.captchaUrl = URL.createObjectURL(blob);
        } else {
          console.error('Invalid captcha response');
          this.refreshCaptcha();
        }
      },
      error: (err) => {
        console.error('加载验证码失败:', err);
        this.refreshCaptcha();
      }
    });
  }

  refreshCaptcha() {
    this.auth.refreshCaptcha().subscribe({
      next: (blob: Blob) => {
        if (blob instanceof Blob) {
          this.captchaUrl = URL.createObjectURL(blob);
          this.registerForm.get('captcha')?.reset();
        }
      },
      error: (err) => {
        console.error('刷新验证码失败:', err);
      }
    });
  }

  public passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }
}
