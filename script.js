// زر الهمبرجر وقائمة التنقل
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    // تبديل فئة 'show' لإظهار/إخفاء القائمة
    navLinks.classList.toggle('show');
    // لتغيير أيقونة الهمبرجر عند الفتح والإغلاق
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times'); // استخدام أيقونة X عند الفتح
});

// إخفاء القائمة عند النقر على رابط (في وضع الجوال)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('show');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ----------------------------------------------------
// تأثير ظهور الأقسام عند التمرير (Scroll Animation)
// ----------------------------------------------------

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // إظهار العناصر الداخلية بترتيب زمني
            const elements = entry.target.querySelectorAll('h2, p, li, .card, .project-card, .contact-icon');
            elements.forEach((el, index) => {
                // تأخير بسيط لتأثير ظهور متتابع
                el.style.transitionDelay = `${index * 0.1}s`; 
                // نضمن إزالة التأخير بعد الظهور لكيلا يؤثر على حركات أخرى لاحقة
                setTimeout(() => el.style.transitionDelay = '0s', 1200); 
            });
            // نوقف المراقبة بعد ظهور القسم
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // يظهر القسم عندما يكون 15% منه مرئيًا
});

sections.forEach(sec => {
    observer.observe(sec);
});

// ----------------------------------------------------
// (ملاحظة: تم إزالة كود الـ Smooth page transition الذي يتضمن fade-out
// لأنه قد يسبب مشاكل في تجربة المستخدم والأداء. الـ scroll-behavior: smooth 
// في CSS كافٍ للانتقال السلس.)
// ----------------------------------------------------