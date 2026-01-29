// =============================
// Ambil elemen-elemen penting
// =============================
const form = document.getElementById("registerForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const successMessage = document.getElementById("successMessage");

// =============================
// Fungsi validasi email
// =============================
function validateEmail(emailValue) {
  // Regex sederhana untuk validasi email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

// =============================
// Validasi Nama Lengkap
// =============================
function validateFullname() {
  if (fullname.value.trim() === "") {
    fullnameError.textContent = "Nama lengkap wajib diisi.";
    return false;
  } else {
    fullnameError.textContent = "";
    return true;
  }
}

// =============================
// Validasi Email
// =============================
function validateEmailField() {
  if (email.value.trim() === "") {
    emailError.textContent = "Email wajib diisi.";
    return false;
  } else if (!validateEmail(email.value.trim())) {
    emailError.textContent = "Format email tidak valid.";
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}

// =============================
// Validasi Password
// =============================
function validatePassword() {
  if (password.value.length < 8) {
    passwordError.textContent = "Password minimal 8 karakter.";
    return false;
  } else {
    passwordError.textContent = "";
    return true;
  }
}

// =============================
// Validasi Konfirmasi Password
// =============================
function validateConfirmPassword() {
  if (confirmPassword.value.length < 8) {
    confirmPasswordError.textContent =
      "Konfirmasi password minimal 8 karakter.";
    return false;
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Konfirmasi password tidak cocok.";
    return false;
  } else {
    confirmPasswordError.textContent = "";
    return true;
  }
}

// =============================
// Event Listener: Validasi Dinamis
// =============================
fullname.addEventListener("blur", validateFullname);
fullname.addEventListener("input", validateFullname);
email.addEventListener("blur", validateEmailField);
email.addEventListener("input", validateEmailField);
password.addEventListener("blur", validatePassword);
password.addEventListener("input", function () {
  validatePassword();
  validateConfirmPassword(); // update error konfirmasi jika password berubah
});
confirmPassword.addEventListener("blur", validateConfirmPassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

// =============================
// Event Listener: Submit Form
// =============================
form.addEventListener("submit", function (e) {
  e.preventDefault();
  successMessage.textContent = "";
  // Validasi semua field
  const validFullname = validateFullname();
  const validEmail = validateEmailField();
  const validPassword = validatePassword();
  const validConfirm = validateConfirmPassword();
  if (validFullname && validEmail && validPassword && validConfirm) {
    // Kirim data ke backend Express
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          successMessage.textContent = "Pendaftaran Berhasil";
          form.reset();
          setTimeout(() => {
            fullnameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
          }, 100);
          console.log(data);
        } else {
          // Tampilkan pesan error dari backend
          if (data.message) {
            emailError.textContent = data.message;
          }
        }
      })
      .catch(() => {
        successMessage.textContent = "Gagal terhubung ke server.";
      });
  }
});
