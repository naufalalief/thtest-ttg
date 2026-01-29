// =============================
// Ambil elemen-elemen penting
// =============================
const get = id => document.getElementById(id);
const form = get("registerForm");
const fullname = get("fullname");
const email = get("email");
const password = get("password");
const confirmPassword = get("confirmPassword");
const fullnameError = get("fullnameError");
const emailError = get("emailError");
const passwordError = get("passwordError");
const confirmPasswordError = get("confirmPasswordError");
const successMessage = get("successMessage");

// =============================
// Fungsi validasi email
// =============================
const validateEmail = emailValue =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

// =============================
// Validasi Nama Lengkap
// =============================
function validateFullname() {
  const value = fullname.value.trim();
  if (!value) {
    fullnameError.textContent = "Nama lengkap wajib diisi.";
    return false;
  }
  fullnameError.textContent = "";
  return true;
}

// =============================
// Validasi Email
// =============================
function validateEmailField() {
  const value = email.value.trim();
  if (!value) {
    emailError.textContent = "Email wajib diisi.";
    return false;
  }
  if (!validateEmail(value)) {
    emailError.textContent = "Format email tidak valid.";
    return false;
  }
  emailError.textContent = "";
  return true;
}

// =============================
// Validasi Password
// =============================
function validatePassword() {
  if (password.value.length < 8) {
    passwordError.textContent = "Password minimal 8 karakter.";
    return false;
  }
  passwordError.textContent = "";
  return true;
}

// =============================
// Validasi Konfirmasi Password
// =============================
function validateConfirmPassword() {
  if (confirmPassword.value.length < 8) {
    confirmPasswordError.textContent =
      "Konfirmasi password minimal 8 karakter.";
    return false;
  }
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Konfirmasi password tidak cocok.";
    return false;
  }
  confirmPasswordError.textContent = "";
  return true;
}

// =============================
// Event Listener: Validasi Dinamis
// =============================
fullname.addEventListener("blur", validateFullname);
fullname.addEventListener("input", validateFullname);
email.addEventListener("blur", validateEmailField);
email.addEventListener("input", validateEmailField);
password.addEventListener("blur", validatePassword);
password.addEventListener("input", () => {
  validatePassword();
  validateConfirmPassword(); // update error konfirmasi jika password berubah
});
confirmPassword.addEventListener("blur", validateConfirmPassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

// =============================
// Event Listener: Submit Form
// =============================
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  successMessage.textContent = "";
  // Validasi semua field
  const validFullname = validateFullname();
  const validEmail = validateEmailField();
  const validPassword = validatePassword();
  const validConfirm = validateConfirmPassword();
  if (validFullname && validEmail && validPassword && validConfirm) {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullname.value,
          email: email.value,
          password: password.value,
        }),
      });
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
      } else if (data.message) {
        emailError.textContent = data.message;
      }
    } catch {
      successMessage.textContent = "Gagal terhubung ke server.";
    }
  }
});
