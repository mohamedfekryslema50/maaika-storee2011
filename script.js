import { initializeApp } from "https://gstatic.com";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://gstatic.com";

const firebaseConfig = {
    apiKey: "AIzaSyCyFpLzs7rV_fFIRM4mgj0B8br2vg2eAXo",
    authDomain: "://firebaseapp.com",
    projectId: "maika-print-store3",
    storageBucket: "maika-print-store3.firebasestorage.app",
    messagingSenderId: "1025183069733",
    appId: "1:1025183069733:web:5f55bd46c12a5312eb31cc",
    measurementId: "G-6T17BW82VZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// دالة الدخول السلس للمتجر
window.enterStore = function() {
    const splash = document.getElementById('splash-screen');
    const store = document.getElementById('main-store');
    
    splash.style.opacity = '0';
    splash.style.visibility = 'hidden';
    
    setTimeout(() => {
        splash.classList.add('hidden');
        store.classList.remove('hidden');
    }, 600);
}

// ربط كليك زر الدخول
document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', window.enterStore);
    }
});

// سحب وعرض المنتجات لايف من الفايربيس
const productsContainer = document.getElementById('products-container');
const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
    productsContainer.innerHTML = '';
    
    if(snapshot.empty) {
        productsContainer.innerHTML = '<p style="text-align:center; width:100%; color:#a3968e;">المعرض فارغ حالياً، أضف منتجات من لوحة التحكم.</p>';
        return;
    }

    snapshot.forEach((doc) => {
        const product = doc.data();
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <span style="font-size:0.75rem; color:var(--accent-color); border:1px solid var(--accent-color); padding:2px 8px; border-radius:10px; display:inline-block; margin-top:10px;">${product.category}</span>
            <h3>${product.name}</h3>
            <p style="color:#a3968e; font-size:0.9rem;">${product.desc}</p>
            <span class="price">${product.price} ج.م</span>
            <button class="order-btn" onclick="orderProduct('${product.name}', '${product.price} ج.م')">اطلب الآن عبر الواتساب</button>
        `;
        productsContainer.appendChild(card);
    });
});

window.orderProduct = function(productName, productPrice) {
    const phoneNumber = "201025386551"; 
    const message = `مرحباً MAIKA PRINT STORE، أريد طلب هذا💀 المنتج:\n\n📦 المنتج: ${productName}\n💰 السعر: ${productPrice}\n\nهل هو متاح حالياً؟`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me{phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
