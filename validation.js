const authForm = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const generalError = document.getElementById('generalError');

const login = 'admin@test.com';
const password = '111111';

authForm.addEventListener('submit', (event) => {
  event.preventDefault();

  emailError.textContent = '';
  passwordError.textContent = '';
  generalError.textContent = '';

  emailError.style.opacity = 0;
  passwordError.style.opacity = 0;
  generalError.style.opacity = 0;

  let isValid = true;

  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Поле "Почта" не должно быть пустым';
    emailError.style.opacity = 1;
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailError.textContent = 'Неверный формат email';
    emailError.style.opacity = 1;
    isValid = false;
  }
  if (passwordInput.value.trim() === '') {
    passwordError.textContent = 'Поле "Пароль" не должно быть пустым';
    passwordError.style.opacity = 1;
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    passwordError.textContent = 'Пароль должен быть не менее 6 символов';
    passwordError.style.opacity = 1;
    isValid = false;
  }

  if (isValid) {
    const isLoginValid = emailInput.value === login;
    const isPasswordValid = passwordInput.value === password;
    const response = {
      status: 200,
      statusText: 'OK',
      json: () =>
        Promise.resolve({
          message:
            isLoginValid && isPasswordValid
              ? 'Форма успешно отправлена!'
              : 'Ошибка авторизации',
          success: isLoginValid && isPasswordValid,
        }),
    };
    response.json().then((data) => {
      if (data.success) {
        generalError.textContent = data.message;
        generalError.style.opacity = 1;
      } else {
        generalError.textContent = 'Неверный логин или пароль';
        generalError.style.opacity = 1;
      }
    });
  }
});
