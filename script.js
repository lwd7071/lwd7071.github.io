// Xử lý chuyển đổi Dark / Light Theme & lưu vào localStorage
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Khởi tạo theme từ bộ nhớ hoặc mặc định dark theo yêu cầu
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// Xử lý Mobile Menu
const mobileBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Đóng menu & cập nhật active ngay khi click vào link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    navMenu.classList.remove('open');
  });
});

// Highlight link menu khi scroll tới section tương ứng
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.pageYOffset + 250;
  const isAtBottom = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - 70);

  // Nếu cuộn gần chạm đáy trang, ưu tiên kích hoạt mục contact
  if (isAtBottom) {
    current = 'contact';
  } else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
  }

  if (current) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
});
