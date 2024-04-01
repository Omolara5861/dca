/*=============== SWIPER JS ===============*/
let swiperCards = new Swiper(".card__content", {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});

function selectOption(plan) {
  const paymentPlans = document.querySelectorAll('.payment-plan');
  const installmentBtn = document.getElementById('installmentPayment');
  const oneTimeBtn = document.getElementById('oneTimePayment');
    paymentPlans.forEach(plan => plan.classList.remove('active'));

    if (plan === 'installment') {
        document.getElementById('installment').classList.add('active');
      installmentBtn.classList.add('active');
      oneTimeBtn.classList.remove('active');
    }
    else {
      document.getElementById('oneTime').classList.add('active');
      oneTimeBtn.classList.add('active');
      installmentBtn.classList.remove('active');
    }
  
}


document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopBtn = document.getElementById("scrollToTop");

  // Add scroll event listener to the window
  window.addEventListener("scroll", function () {
    // If user scrolls down by a certain amount, display the scroll-to-top button
    if (window.pageYOffset > 100) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Add click event listener to scroll-to-top button
  scrollToTopBtn.addEventListener("click", function () {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
