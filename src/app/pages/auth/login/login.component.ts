import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
        private router: Router
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
                next: (res) => {
                    this.handleLoginSuccess(res);
                    this.router.navigateByUrl(
                        this.router.parseUrl(this.router.url).queryParams['returnUrl'] || '/'
                    );
                },
                error: (err) => {
                    this.isLoading = false;
                    console.error('Login failed:', err);
                }
            });
        }
    }

    public handleLoginSuccess(response: any) {
        // 与现有header组件中的状态同步
        window.dispatchEvent(new CustomEvent('auth-change', { detail: true }));
    }
}
