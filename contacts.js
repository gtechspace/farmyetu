let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 3000); // 3 seconds per slide

<script>
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const phone = "254720696721"; // 👈 your WhatsApp number here (without +)
    const text = `Hello, my name is ${name}.\nEmail: ${email}\nMessage: ${message}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank"); // Open WhatsApp chat in new tab
  });
</script>
