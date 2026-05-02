document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SPLASH SCREEN MƏNTİQİ ---
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
        splash.style.transform = 'translateY(-100vh)'; 
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 800); 
    }, 2400); 

    // --- 2. DİNAMİK ARXA FON LOQOLARI (Yeni Siyahı) ---
    const techBg = document.getElementById('tech-bg');
    // SƏNİN TƏLƏBİNƏ UYĞUN: Yalnız HTML, CSS, JS, React, Bootstrap və Git qaldı. Go, Dart, Node silindi.
    const techClasses = [
        'fa-brands fa-html5', 
        'fa-brands fa-css3-alt', 
        'fa-brands fa-js', 
        'fa-brands fa-react', 
        'fa-brands fa-bootstrap', 
        'fa-brands fa-git-alt'
    ];
    const iconElements = [];

    for (let i = 0; i < 15; i++) {
        let iTag = document.createElement('i');
        let randomClass = techClasses[Math.floor(Math.random() * techClasses.length)];
        iTag.className = `${randomClass} tech-icon`;
        
        let size = Math.random() * 80 + 40; 
        let posX = Math.random() * 100; 
        let posY = Math.random() * 100; 
        
        iTag.style.fontSize = `${size}px`;
        iTag.style.left = `${posX}vw`;
        iTag.style.top = `${posY}vh`;
        iTag.dataset.speed = Math.random() * 0.05 + 0.01;
        
        techBg.appendChild(iTag);
        iconElements.push(iTag);
    }

    // --- 3. MOUSE İZLƏMƏ (GLOW VƏ 3D TILT) ---
    const cursorGlow = document.getElementById('cursor-glow');
    const tiltCards = document.querySelectorAll('.tilt-card');

    document.addEventListener('mousemove', (e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        cursorGlow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        
        iconElements.forEach(icon => {
            let speed = parseFloat(icon.dataset.speed);
            let moveX = (mouseX - centerX) * speed;
            let moveY = (mouseY - centerY) * speed;
            icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            let rect = card.getBoundingClientRect();
            let x = e.clientX - rect.left; 
            let y = e.clientY - rect.top;  
            let centerX = rect.width / 2;
            let centerY = rect.height / 2;
            
            let rotateX = ((y - centerY) / centerY) * -10;
            let rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // --- 4. MODERN THEME SWITCH (DARK/LIGHT) ---
    const themeSwitch = document.getElementById('themeToggle');
    
    themeSwitch.addEventListener('click', () => {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
        }
    });

    // --- 5. DİL DƏYİŞİKLİYİ (SVG BAYRAQLAR ÜÇÜN) ---
    const langEnFlag = document.getElementById('langEn');
    const langAzFlag = document.getElementById('langAz');
    let currentLang = 'en';
    
    function changeLanguage(lang) {
        currentLang = lang;
        if (currentLang === 'en') {
            langEnFlag.classList.add('active');
            langAzFlag.classList.remove('active');
        } else {
            langEnFlag.classList.remove('active');
            langAzFlag.classList.add('active');
        }
        
        document.querySelectorAll('.lang').forEach(el => {
            if (el.innerHTML.includes('<span')) {
                el.innerHTML = el.getAttribute(`data-${currentLang}`);
            } else {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            }
        });

        document.querySelectorAll('.lang-placeholder').forEach(el => {
            el.setAttribute('placeholder', el.getAttribute(`data-${currentLang}`));
        });
    }

    langEnFlag.addEventListener('click', () => { if (currentLang !== 'en') changeLanguage('en'); });
    langAzFlag.addEventListener('click', () => { if (currentLang !== 'az') changeLanguage('az'); });
    changeLanguage('en');

    // --- 6. SCROLL ANIMASIYASI ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -20px 0px" });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});