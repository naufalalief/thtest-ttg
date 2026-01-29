// =============================
// Ambil elemen-elemen penting (tabel & modal)
// =============================
const userTableBody = document.getElementById("userTableBody");
const pagination = document.getElementById("pagination");
const openAddModalBtn = document.getElementById("openAddModal");
const userModal = document.getElementById("userModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const userForm = document.getElementById("userForm");
const modalFullname = document.getElementById("modalFullname");
const modalEmail = document.getElementById("modalEmail");
const modalPassword = document.getElementById("modalPassword");
const modalConfirmPassword = document.getElementById("modalConfirmPassword");
const modalFullnameError = document.getElementById("modalFullnameError");
const modalEmailError = document.getElementById("modalEmailError");
const modalPasswordError = document.getElementById("modalPasswordError");
const modalConfirmPasswordError = document.getElementById(
  "modalConfirmPasswordError",
);
const modalSubmitBtn = document.getElementById("modalSubmitBtn");
const modalUserId = document.getElementById("userId");
const modalConfirmPasswordGroup = document.getElementById(
  "modalConfirmPasswordGroup",
);
const successMessage = document.getElementById("successMessage");

// =============================
// Fetch & Render User Table with Pagination
// =============================
let currentPage = 1;
let pageSize = 5;
let totalUsers = 0;
let totalPages = 1;

async function fetchUsers(page = 1) {
  try {
    const res = await fetch(
      `http://localhost:3000/users?page=${page}&limit=${pageSize}`,
    );
    const data = await res.json();
    // Data backend: { success, data, pagination }
    const users = Array.isArray(data) ? data : data.data || [];
    const pag = data.pagination || {};
    totalUsers = pag.total || users.length;
    totalPages = Math.max(1, Math.ceil(totalUsers / pageSize));
    renderUserTable(users, page);
    if (users.length > 0) {
      renderPagination(page);
    } else {
      pagination.innerHTML = "";
    }
  } catch (e) {
    userTableBody.innerHTML = `<tr><td colspan="4">Gagal memuat data user</td></tr>`;
    pagination.innerHTML = "";
  }
}

function renderUserTable(users, page) {
  if (!users.length) {
    userTableBody.innerHTML = `<tr><td colspan="4">Belum ada user</td></tr>`;
    return;
  }
  userTableBody.innerHTML = users
    .map(
      (user, i) => `
    <tr>
      <td>${(page - 1) * pageSize + i + 1}</td>
      <td>${user.fullname}</td>
      <td>${user.email}</td>
      <td>
        <button class="edit-btn" data-id="${user.id}" data-fullname="${user.fullname}" data-email="${user.email}">Edit</button>
        <button class="delete-btn" data-id="${user.id}">Hapus</button>
      </td>
    </tr>
  `,
    )
    .join("");
}

function renderPagination(page) {
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }
  let html = "";
  html += `<button class="page-btn" ${page === 1 ? "disabled" : ""} data-page="${page - 1}">&laquo;</button>`;
  // Tampilkan max 5 page number, dengan ... jika banyak
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);
  if (start > 1) html += `<span class="page-ellipsis">...</span>`;
  for (let i = start; i <= end; i++) {
    html += `<button class="page-btn${i === page ? " active" : ""}" data-page="${i}">${i}</button>`;
  }
  if (end < totalPages) html += `<span class="page-ellipsis">...</span>`;
  html += `<button class="page-btn" ${page === totalPages ? "disabled" : ""} data-page="${page + 1}">&raquo;</button>`;
  pagination.innerHTML = html;
}

pagination.addEventListener("click", function (e) {
  if (e.target.classList.contains("page-btn") && !e.target.disabled) {
    const page = parseInt(e.target.dataset.page);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      currentPage = page;
      fetchUsers(currentPage);
    }
  }
});

// =============================
// Modal Logic
// =============================
function openModal(mode, user = null) {
  userModal.style.display = "flex";
  if (mode === "add") {
    modalTitle.textContent = "Tambah User";
    userForm.reset();
    modalUserId.value = "";
    modalPassword.required = true;
    modalConfirmPassword.required = true;
    modalConfirmPasswordGroup.style.display = "block";
  } else if (mode === "edit" && user) {
    modalTitle.textContent = "Edit User";
    modalUserId.value = user.id;
    modalFullname.value = user.fullname;
    modalEmail.value = user.email;
    modalPassword.value = "";
    modalConfirmPassword.value = "";
    modalPassword.required = false;
    modalConfirmPassword.required = false;
    modalConfirmPasswordGroup.style.display = "none";
  }
  clearModalErrors();
}

function closeModal() {
  userModal.style.display = "none";
}

function clearModalErrors() {
  modalFullnameError.textContent = "";
  modalEmailError.textContent = "";
  modalPasswordError.textContent = "";
  modalConfirmPasswordError.textContent = "";
}

// =============================
// Validasi Modal
// =============================
function validateModalFullname() {
  if (modalFullname.value.trim() === "") {
    modalFullnameError.textContent = "Nama lengkap wajib diisi.";
    return false;
  } else {
    modalFullnameError.textContent = "";
    return true;
  }
}
function validateModalEmail() {
  if (modalEmail.value.trim() === "") {
    modalEmailError.textContent = "Email wajib diisi.";
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalEmail.value.trim())) {
    modalEmailError.textContent = "Format email tidak valid.";
    return false;
  } else {
    modalEmailError.textContent = "";
    return true;
  }
}
function validateModalPassword() {
  if (modalPassword.required && modalPassword.value.length < 8) {
    modalPasswordError.textContent = "Password minimal 8 karakter.";
    return false;
  } else {
    modalPasswordError.textContent = "";
    return true;
  }
}
function validateModalConfirmPassword() {
  if (modalConfirmPassword.required && modalConfirmPassword.value.length < 8) {
    modalConfirmPasswordError.textContent =
      "Konfirmasi password minimal 8 karakter.";
    return false;
  } else if (
    modalConfirmPassword.required &&
    modalConfirmPassword.value !== modalPassword.value
  ) {
    modalConfirmPasswordError.textContent = "Konfirmasi password tidak cocok.";
    return false;
  } else {
    modalConfirmPasswordError.textContent = "";
    return true;
  }
}

// =============================
// Event Listener Modal
// =============================
openAddModalBtn.addEventListener("click", () => openModal("add"));
closeModalBtn.addEventListener("click", closeModal);
userModal.addEventListener("click", e => {
  if (e.target === userModal) closeModal();
});
modalFullname.addEventListener("blur", validateModalFullname);
modalFullname.addEventListener("input", validateModalFullname);
modalEmail.addEventListener("blur", validateModalEmail);
modalEmail.addEventListener("input", validateModalEmail);
modalPassword.addEventListener("blur", validateModalPassword);
modalPassword.addEventListener("input", () => {
  validateModalPassword();
  validateModalConfirmPassword();
});
modalConfirmPassword.addEventListener("blur", validateModalConfirmPassword);
modalConfirmPassword.addEventListener("input", validateModalConfirmPassword);

// =============================
// Submit Modal Form (Add/Edit)
// =============================
userForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  clearModalErrors();
  successMessage.textContent = "";
  const validFullname = validateModalFullname();
  const validEmail = validateModalEmail();
  const validPassword = validateModalPassword();
  const validConfirm = validateModalConfirmPassword();
  if (!validFullname || !validEmail || !validPassword || !validConfirm) return;
  const id = modalUserId.value;
  const isEdit = !!id;
  const payload = {
    fullname: modalFullname.value,
    email: modalEmail.value,
  };
  if (!isEdit || (isEdit && modalPassword.value)) {
    payload.password = modalPassword.value;
  }
  try {
    const res = await fetch(
      `http://localhost:3000/users${isEdit ? "/" + id : ""}`,
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await res.json();
    if (res.ok) {
      closeModal();
      fetchUsers();
      successMessage.textContent = isEdit
        ? "User berhasil diupdate"
        : "User berhasil ditambahkan";
    } else {
      if (data.message) modalEmailError.textContent = data.message;
    }
  } catch {
    successMessage.textContent = "Gagal terhubung ke server.";
  }
});

// =============================
// Edit & Delete Button Handler
// =============================
userTableBody.addEventListener("click", async function (e) {
  if (e.target.classList.contains("edit-btn")) {
    const user = {
      id: e.target.dataset.id,
      fullname: e.target.dataset.fullname,
      email: e.target.dataset.email,
    };
    openModal("edit", user);
  } else if (e.target.classList.contains("delete-btn")) {
    if (confirm("Yakin ingin menghapus user ini?")) {
      const id = e.target.dataset.id;
      try {
        const res = await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchUsers();
          successMessage.textContent = "User berhasil dihapus";
        } else {
          successMessage.textContent = "Gagal menghapus user.";
        }
      } catch {
        successMessage.textContent = "Gagal terhubung ke server.";
      }
    }
  }
});

// =============================
// Inisialisasi: Fetch user saat load
// =============================
fetchUsers(currentPage);

// =============================
// (Optional) Hide old form logic
// =============================
// document.getElementById("registerForm")?.remove();

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
