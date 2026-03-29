const cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log(cart);


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
      total += price;

      updateCart();
      showToast();
    });
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

}

// تشغيل
document.addEventListener('DOMContentLoaded', initCartSystem);


////////////////////////* ⌃ CART Animation ⌃ */////////////////////////

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
function displayCart() {

    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    const container = document.querySelector('#cart-items');
    const subtotalEl = document.querySelector('#subtotal');
    const totalEl = document.querySelector('#total');
    const shippingEl = document.querySelector('#shipping'); // لازم تضيفه في HTML

    if (!container) return;

    container.innerHTML = "";

    let subtotal = 0;

    cartData.forEach((product, index) => {

        const div = document.createElement('div');
        div.classList.add('cart-item');

        subtotal += product.price;

        div.innerHTML = `
            <img src="${product.img}" />
            <div class="info">
                <p>${product.title}</p>
                <span>${product.price} TND</span>
            </div>

            <!-- زر حذف -->
            <button class="remove-btn" data-index="${index}">X</button>
        `;

        container.appendChild(div);
    });

    // 🗑️ حذف المنتجات
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {

            const index = btn.getAttribute('data-index');

            cartData.splice(index, 1);

            localStorage.setItem('cart', JSON.stringify(cartData));

            displayCart(); // تحديث
        });
    });

    // 🚚 livraison
    let shipping = 7;

    if (subtotal >= 200) {
        shipping = 0;
    }

    // 💰 total
    let finalTotal = subtotal + shipping;

    // تحديث subtotal
    if (subtotalEl) {
        subtotalEl.innerText = subtotal.toFixed(2) + " TND";
    }

    // تحديث livraison + اللون
    if (shippingEl) {

        if (shipping === 0) {
            shippingEl.innerText = "Gratuit";
            shippingEl.style.color = "#28a745";
            shippingEl.style.fontWeight = "bold";
        } else {
            shippingEl.innerText = shipping + " TND";
            shippingEl.style.color = "black";
            shippingEl.style.fontWeight = "normal";
        }
    }

    // تحديث total
    if (totalEl) {
        totalEl.innerText = finalTotal.toFixed(2) + " TND";
    }
}

// تشغيل
displayCart();







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



/* //////////////////////                   ///////////////////*/
 /* //////////////////////      popuos           ///////////////////*/
function sendOrder() {
    // 🧾 معلومات المستخدم
    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName  = document.getElementById("lastName")?.value.trim();
    const email     = document.getElementById("email")?.value.trim();
    const phone     = document.getElementById("phone")?.value.trim();
    const address   = document.getElementById("address")?.value.trim();

    // ⚠️ تحقق من الإدخال
    if (!firstName || !lastName || !email || !phone || !address) {
        alert("⚠️ يرجى ملء جميع الحقول");
        return;
    }

    // 🛒 cart
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
        cart = [];
    }

    // 💰 الحساب
    const subtotal = cart.reduce((acc, item) => acc + (item.price || 0), 0);
    const shipping = subtotal > 200 ? 0 : 7;
    const total = subtotal + shipping;

    // 📦 البيانات
    const data = {
        customer: { firstName, lastName, email, phone, address },
        cart,
        subtotal,
        shipping,
        total
    };

    // 🚀 إرسال للسيرفر
    fetch("/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        console.log("✅ Order sent:", response);

        // 📢 إظهار popup
        const popup = document.getElementById("popup");
        if (popup) popup.style.display = "flex";

        // 🧹 تفريغ cart
        localStorage.removeItem("cart");

        // 🔘 زر OK (هنا دمجنا closePopup)
         const closeBtn = document.getElementById("closePopup");

        if (closeBtn) {
            closeBtn.addEventListener("click", function () {

                // إخفاء popup
                const popup = document.getElementById("popup");
                if (popup) popup.style.display = "none";

                // تفريغ السلة
                localStorage.removeItem("cart");

                // الرجوع للرئيسية
                window.location.href = "index.html";
            });
        }
        console.error("❌ Error:", err);
        alert("❌ صار خطأ، حاول مرة أخرى");
    });
}

 /* //////////////////////      info client           ///////////////////*/
 /* //////////////////////                  ///////////////////*/