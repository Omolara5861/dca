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
