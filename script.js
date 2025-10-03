// =========================================
// 1. تأثير Parallax 3D على حركة الماوس
// =========================================
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  document.querySelectorAll('.player-circle, .news-card, .hero-text').forEach(el => {
    const depth = parseFloat(el.getAttribute('data-depth')) || 0.2;
    el.style.transform = `
      translateX(${x * depth}px) 
      translateY(${y * depth}px) 
      rotateY(${x * depth * 5}deg) 
      rotateX(${y * depth * 5}deg)
    `;
  });
});

// =========================================
// 2. التنقل بين الكاروسيل
// =========================================
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const carouselId = btn.getAttribute('data-carousel');
    const carousel = document.getElementById(`${carouselId}-carousel`);
    const scrollAmount = 340; // عرض البطاقة + المسافة

    if (btn.classList.contains('next')) {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  });
});

// =========================================
// 3. التمرير التلقائي للكاروسيل
// =========================================
const carousels = document.querySelectorAll('.carousel');
let autoScrollIntervals = {};

carousels.forEach((carousel, index) => {
  let scrollPosition = 0;
  
  // إيقاف التمرير التلقائي عند تمرير الماوس
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollIntervals[index]);
  });
  
  // استئناف التمرير التلقائي عند مغادرة الماوس
  carousel.addEventListener('mouseleave', () => {
    startAutoScroll(carousel, index);
  });
  
  // بدء التمرير التلقائي
  startAutoScroll(carousel, index);
});

function startAutoScroll(carousel, index) {
  autoScrollIntervals[index] = setInterval(() => {
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: 2, behavior: 'auto' });
    }
  }, 50);
}

// =========================================
// 4. قائمة التنقل المتجاوبة (Burger Menu)
// =========================================
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// =========================================
// 5. تحريك الأرقام في قسم الإحصائيات
// =========================================
const animateNumbers = () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000; // مدة الأنيميشن بالمللي ثانية
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateNumber = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateNumber);
      } else {
        stat.textContent = target;
      }
    };
    
    updateNumber();
  });
};

// =========================================
// 6. Intersection Observer للتفعيل عند الظهور
// =========================================
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // تفعيل أنيميشن الأرقام عند الوصول لقسم الإحصائيات
      if (entry.target.classList.contains('stats-section')) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// تطبيق Observer على العناصر
document.querySelectorAll('.carousel-section, .stats-section, #news').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 0.8s ease-out';
  observer.observe(section);
});

// =========================================
// 7. تأثيرات إضافية على الصور
// =========================================
document.querySelectorAll('.player-circle img, .news-card img').forEach(img => {
  img.addEventListener('mouseenter', function() {
    this.style.filter = 'brightness(1.2) contrast(1.1)';
  });
  
  img.addEventListener('mouseleave', function() {
    this.style.filter = 'brightness(1) contrast(1)';
  });
});

// =========================================
// 8. زر "استكشف المزيد"
// =========================================
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    document.querySelector('#players').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
}

// =========================================
// 9. إخفاء/إظهار شريط التنقل عند التمرير
// =========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.transform = 'translateY(0)';
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    // التمرير للأسفل - إخفاء الشريط
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // التمرير للأعلى - إظهار الشريط
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// =========================================
// 10. تأثير Smooth Reveal للبطاقات
// =========================================
const revealCards = () => {
  const cards = document.querySelectorAll('.news-card, .stat-card');
  
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
};

// تطبيق التأثير عند تحميل الصفحة
window.addEventListener('load', () => {
  revealCards();
});

// =========================================
// 11. Lazy Loading للصور
// =========================================
const lazyImages = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => {
  imageObserver.observe(img);
});

// =========================================
// 12. تأثيرات صوتية عند التفاعل (اختياري)
// =========================================
const addHoverSound = () => {
  const hoverElements = document.querySelectorAll('.player-circle, .news-card, .cta-button');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      // يمكن إضافة صوت هنا إذا أردت
      element.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
  });
};

addHoverSound();

// =========================================
// 13. تحسين الأداء - Debounce للأحداث
// =========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// تطبيق debounce على حدث resize
window.addEventListener('resize', debounce(() => {
  console.log('تم تغيير حجم النافذة');
  // يمكن إضافة وظائف إعادة الحساب هنا
}, 250));

// =========================================
// 14. رسالة ترحيب في Console
// =========================================
console.log('%c⚽ مرحباً بك في عالم كرة القدم! ⚽', 
  'font-size: 20px; color: #ff0000; font-weight: bold; text-shadow: 2px 2px 4px #000;'
);

console.log('%cموقع متطور بتقنيات حديثة 🚀', 
  'font-size: 14px; color: #00f; font-weight: bold;'
);

// =========================================
// 15. تحميل البيانات الديناميكية (مثال)
// =========================================
const loadDynamicContent = async () => {
  try {
    // يمكن هنا استدعاء API لجلب الأخبار الحقيقية
    // const response = await fetch('https://api.example.com/news');
    // const data = await response.json();
    // updateNewsSection(data);
    
    console.log('جاهز لتحميل المحتوى الديناميكي');
  } catch (error) {
    console.error('خطأ في تحميل البيانات:', error);
  }
};

// تفعيل التحميل الديناميكي
loadDynamicContent();

// =========================================
// 16. حماية ضد النقر بالزر الأيمن (اختياري)
// =========================================
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault();
//   alert('النقر بالزر الأيمن معطل!');
// });

console.log('✅ جميع السكريبتات تم تحميلها بنجاح!');
