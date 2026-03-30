////////////////////////* ⌄  Slider1 pc phone  ⌄ */////////////////////////

const slides00 = document.querySelector('.slides00');
const slide00 = document.querySelectorAll('.slide00');

let index00 = 0;
let total00 = slide00.length;

/* 🔥 نعمل متغير للتايمر */
let autoSlide00;

/* ================= NEXT ================= */
function nextSlide00() {
  index00++;
  if (index00 >= total00) {
    index00 = 0;
  }
  updateSlide00();
}

/* ================= PREV ================= */
function prevSlide00() {
  index00--;
  if (index00 < 0) {
    index00 = total00 - 1;
  }
  updateSlide00();
}

/* ================= UPDATE ================= */
function updateSlide00() {
  slides00.style.transform = `translateX(-${index00 * 100}%)`;
}

/* ================= AUTO ================= */
function startAuto00() {
  autoSlide00 = setInterval(nextSlide00, 4000);
}

/* 🔥 نوقف و نرجع نشغل */
function resetAuto00() {
  clearInterval(autoSlide00);
  startAuto00();
}

/* ================= BUTTONS ================= */
document.querySelector('.next00').onclick = () => {
  nextSlide00();
  resetAuto00(); /* 👈 الحل */
};

document.querySelector('.prev00').onclick = () => {
  prevSlide00();
  resetAuto00(); /* 👈 الحل */
};

/* ================= START ================= */
startAuto00();

/* ================= SWIPE ================= */
const touch1 = {
   startX: 0 ,
   endX: 0
};
const slider00 = document.querySelector('.slider00');

/* لما يلمس الشاشة */
slider00.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

/* لما يرفع اصبعه */
slider00.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = startX - endX;

  if (diff > 50) {
    // swipe left 👉 next
    nextSlide00();
    resetAuto00();
  } else if (diff < -50) {
    // swipe right 👉 prev
    prevSlide00();
    resetAuto00();
  }
}

////////////////////////* ⌃  Slider1 pc phone  ⌃ */////////////////////////



////////////////////////* ⌄ Drop down ☰ ⌄ */////////////////////////
document.addEventListener("DOMContentLoaded", function () {

    const dropdown = document.querySelector(".shopDropdown");
    const btn = document.querySelector(".shopBtn");

    if(!dropdown || !btn) return;

    btn.addEventListener("click", function(e) {
        e.preventDefault();
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });

});
////////////////////////* ⌃ Drop down ☰ ⌃ */////////////////////////


////////////////////////* ⌄ menu + submenu ⌄ */////////////////////////

function openMenu(){
    const menu = document.getElementById("sideMenu");
    if(menu){
        menu.classList.add("active");
    }
}

function closeMenu(){
    const menu = document.getElementById("sideMenu");
    if(menu){
        menu.classList.remove("active");
    }
}

function toggleSubMenu() {
    var menu = document.getElementById("subMenu");
    var title = document.querySelector(".submenu-title");

    if(!menu || !title) return;

    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        title.innerHTML = "Boutique -";
    } else {
        title.innerHTML = "Boutique +";
    }
}
////////////////////////* ⌃ menu + submenu ⌃ */////////////////////////






////////////////////////* ⌄ slider2 item par 3 image ⌄ */////////////////////////

(function () {
    const container = document.querySelector('.items-container');
    const items = container.children;

    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    let index = 0;
    const visibleItems = 3;

    let startX = 0;
    let autoSlide = null;

    const SWIPE_THRESHOLD = 40;

    // ================= UPDATE =================
    function updateSlider() {
        container.scrollLeft = index * (container.clientWidth / visibleItems);
    }

    // ================= NEXT / PREV =================
    function nextSlide() {
        index = (index < items.length - visibleItems)
            ? index + visibleItems
            : 0;
        updateSlider();
    }

    function prevSlide() {
        index = (index > 0)
            ? index - visibleItems
            : 0;
        updateSlider();
    }

    // ================= BUTTONS =================
    nextBtn.onclick = () => {
        nextSlide();
        restartAuto();
    };

    prevBtn.onclick = () => {
        prevSlide();
        restartAuto();
    };

    // ================= TOUCH (خفيف) =================
    container.ontouchstart = (e) => {
        startX = e.touches[0].clientX;
        stopAuto();
    };

    container.ontouchend = (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (Math.abs(diff) < 25) {
            startAuto();
            return;
        }

        if (diff > SWIPE_THRESHOLD) {
            nextSlide();
        } else {
            prevSlide();
        }

        startAuto();
    };

    // ================= AUTO (optimized) =================
    function startAuto() {
        if (autoSlide) return; // يمنع duplication
        autoSlide = setInterval(nextSlide, 5000);
    }

    function stopAuto() {
        clearInterval(autoSlide);
        autoSlide = null;
    }

    function restartAuto() {
        stopAuto();
        startAuto();
    }

    startAuto();

})();






////////////////////////* ⌃ slider2 item par 3 image ⌃ */////////////////////////




////////////////////////* ⌄ CART Animation ⌄ */////////////////////////

function initCartSystem() {

  const buttons = document.querySelectorAll('.buy-btn, .buy-btn2');
  const cartCount = document.querySelector('.cart-count');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const cartItems = document.querySelector('.cart-items');
  const totalPrice = document.querySelector('.cart-total-price');
  const cartIcon = document.querySelector('.cart220');
  const shippingPriceEl = document.querySelector('.cart-shipping');
  const finalPriceEl = document.querySelector('.cart-final');

  const toast = document.querySelector('.toast');
  const closeToast = document.querySelector('.close-toast');

  // 🔴 الحماية (هذا أهم سطر)
  if (!cartIcon || !cartDropdown || !cartItems || !totalPrice) {
    return;
  }

  let cart = [];
  let total = 0;

  // 🆕 التحقق من انتهاء 24 ساعة
  const savedTime = localStorage.getItem("cart_time");
  if (savedTime) {
    const now = Date.now();
    const diff = now - parseInt(savedTime);

    if (diff > 7 * 24 * 60 * 60 * 1000) { // 168 ساعة
      localStorage.removeItem("cart");
      localStorage.removeItem("cart_time");
    }
  }

  // ✅ استرجاع السلة بعد refresh
  const savedCart = JSON.parse(localStorage.getItem("cart"));

  if (savedCart) {  
    cart = savedCart;

    cart.forEach(item => {
      total += item.price;
    });

    updateCart(); // تحديث الواجهة
  }

  // ================= ADD =================
  if (buttons.length > 0) {
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const item = btn.closest('.item, .unit');
        if (!item) return;

        const img = item.querySelector('img')?.src || "";
        const title = item.querySelector('.name, h4')?.innerText || "Product";

        const priceElement = item.querySelector('.new, .now');
        if (!priceElement) return;

        const priceText = priceElement.innerText;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

        cart.push({ img, title, price });

        // 🆕 تخزين الوقت أول مرة
        localStorage.setItem("cart_time", Date.now());
        saveCart(cart);
        total += price;

        updateCart();
        showToast();
      });
    });
  }

  function setupCheckout() {
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', () => {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = "facture.html";
    });
  }

  // ================= UPDATE =================
  function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach((product, index) => {

      const div = document.createElement('div');
      div.classList.add('cart-item');

      div.innerHTML = `
        <img src="${product.img}">
        <div class="info">
          <p>${product.title}</p>
          <span>${product.price} TND</span>
        </div>
        <button class="remove-btn" data-index="${index}">✕</button>
      `;

      cartItems.appendChild(div);
    });

    if (cartCount) cartCount.innerText = cart.length;
    if (totalPrice) totalPrice.innerText = total.toFixed(2) + " TND";

    let shipping = 7;
    if (total >= 200) shipping = 0;

    if (shippingPriceEl) shippingPriceEl.innerText = shipping + " TND";

    const finalTotal = total + shipping;
    if (finalPriceEl) finalPriceEl.innerText = finalTotal.toFixed(2) + " TND";

    addRemoveEvents();
  }

  // ================= REMOVE =================
  function addRemoveEvents() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const index = btn.getAttribute('data-index');

        total -= cart[index].price;
        cart.splice(index, 1);
        saveCart(cart);
        updateCart();
      });
    });
  }

  // ================= TOGGLE =================
  if (cartIcon && cartDropdown) {
    cartIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      cartDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      cartDropdown.classList.remove('show');
    });
  }

  // ================= TOAST FIX =================
  function showToast() {
    if (!toast) return;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  if (closeToast) {
    closeToast.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  setupCheckout()
}

// تشغيل
document.addEventListener('DOMContentLoaded', initCartSystem);


////////////////////////* ⌃ CART Animation ⌃ */////////////////////////


//////////////////////////////////* ⌄  PopUps ⌄ *///////////////////////////////////
function initPopupSystem() {

  const popup = document.querySelector(".product-popup");
  const popupImg = popup.querySelector("img");
  const popupTitle = popup.querySelector(".title");
  const popupPrice = popup.querySelector(".price");
  const popupBtn = popup.querySelector(".buy-btn-popup");
  const closeBtn = popup.querySelector(".close-popup");

  let currentItem = null;

  // 🔍 فتح popup
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      const item = btn.closest(".item, .unit");
      if (!item) return;

      const imgEl = item.querySelector("img");
      const titleEl = item.querySelector(".name, h4");
      const priceEl = item.querySelector(".new, .now");

      currentItem = item;

      popupImg.src = imgEl ? imgEl.src : "";
      popupTitle.innerText = titleEl ? titleEl.innerText : "";
      popupPrice.innerText = priceEl ? priceEl.innerText : "";

      popup.classList.add("show");
    });
  });

  // ❌ غلق popup
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });

  // 🛒 زر الشراء من popup
  popupBtn.addEventListener("click", () => {

    if (!currentItem) return;

    // ✅ الحل الصحيح هنا
    const realBtn = currentItem.querySelector(".buy-btn, .buy-btn2");

    if (realBtn) {
      realBtn.click();
    } else {
      console.log("❌ ما لقيتش زر الشراء");
    }

    popup.classList.remove("show");
  });

}


// تشغيل
document.addEventListener("DOMContentLoaded", initPopupSystem);

//////////////////////////////////*  ⌃ PopUps ⌃ *///////////////////////////////////

//////////////////////////////////*  ⌄ atached with server.js ⌄ *///////////////////////////////////

function initForm() {
    const form = document.getElementById("formMessage");
    const popup = document.getElementById("popupMsgNew");

    if (!form || !popup) {
        console.log("❌ form or popup not found");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const message = form.querySelector("input[name='message']").value.trim();
        if (!message) return;

        try {
            await fetch("/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            // ✅ إظهار popup
            popup.classList.add("show");

            // إخفاء بعد 1.5s
            setTimeout(() => {
                popup.classList.remove("show");
            }, 1500);

            form.reset();

        } catch (err) {
            console.log("error:", err);
        }
    });
}

// مهم
document.addEventListener("DOMContentLoaded", initForm);

//////////////////////////////////*  ⌃ atached with server.js ⌃ *///////////////////////////////////





////////////////////////* ⌄ footer ⌄ */////////////////////////

function initFooterAccordion() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const boxes = document.querySelectorAll(".footer-box");

  boxes.forEach(box => {
    const title = box.querySelector(".footer-title, .footer-title2");
    const content = box.querySelector(".footer-links, .newsletter");

    if (!title || !content) return;

    // reset
    title.onclick = null;
    content.style.maxHeight = null;

    if (isMobile) {
      title.onclick = () => {

        const isActive = box.classList.contains("active");

        // نسكر الكل
        boxes.forEach(b => {
          b.classList.remove("active");
          const c = b.querySelector(".footer-links, .newsletter");
          if (c) c.style.maxHeight = null;
        });

        // نفتح الحالي
        if (!isActive) {
          box.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      };
    } else {
      // PC
      box.classList.remove("active");
      content.style.maxHeight = "none";
    }
  });
}

window.addEventListener("load", initFooterAccordion);
window.addEventListener("resize", initFooterAccordion);
////////////////////////* ⌃ footer ⌃ */////////////////////////









////////////////////////* ⌄ reade panier ⌄ */////////////////////////
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));

}////////////////////////* ⌃ reade panier ⌃ */////////////////////////