import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../service/alert.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  captchaUrl = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    captcha: ['', Validators.required], // 新增验证码字段
    rememberMe: [false] // 新增记住我选项
  });
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }
  ngOnInit(): void {
    this.loadCaptcha();
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
          this.loginForm.get('captcha')?.reset();
        }
      },
      error: (err) => {
        console.error('刷新验证码失败:', err);
      }
    });
  }
  onSubmit() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;

      const credentials = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
        captcha: this.loginForm.value.captcha!,
        remember: this.loginForm.value.rememberMe
      };

      this.auth.login(credentials).subscribe({
        next: async (res) => {
          await this.handleLoginSuccess(res);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login failed:', err);
        }
      });
    }
  }

  async handleLoginSuccess(response: any) {
    console.log(response);
    // 处理response，判断code是否为0，如果不等于0则显示错误信息
    if (response.code !== 0) {
      this.isLoading = false;
      await this.alertService.error(response.msg, "center");
      return;  
    }
    // 设置token
    this.auth.setToken(response.token);
    // 处理登录成功后的逻辑
    await this.alertService.success(response.msg, "center");
    // 跳转到dashboard
    await this.router.navigate(['/dashboard']);
  }
}
