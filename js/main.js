// Современные функции для сайта приложений

// Используем современные возможности JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация прелоадера
    initPreloader();
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
    
    // Инициализация кнопки "Вверх"
    initBackToTop();
    
    // Инициализация переключателя темы
    initThemeToggle();
    
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация отложенной загрузки изображений
    initLazyLoad();
    
    // Инициализация счетчиков
    initCounters();
    
    // Инициализация эффекта печатающегося текста
    initTypedEffect();
    
    // Инициализация слайдера отзывов
    initTestimonialsSlider();
    
    // Инициализация модальных окон приложений
    initAppModals();
    
    // Инициализация формы обратной связи
    initContactForm();
    
    // Инициализация анимации при скролле
    initScrollAnimation();
    
    // Инициализация динамического фона
    initDynamicBackground();
    
    // Инициализация библиотеки AOS для анимаций при прокрутке
    initAOS();
    
    // Инициализация обработки мобильных событий
    initMobileSupport();
});

// Функция для инициализации прелоадера
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Скрываем прелоадер после загрузки страницы
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        
        // Удаляем прелоадер из DOM после завершения анимации
        setTimeout(() => {
            preloader.style.display = 'none';
            // Добавляем класс loaded для плавного показа фона
            document.body.classList.add('loaded');
            
            // Обновляем AOS после загрузки страницы для правильного отображения анимаций
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 500);
    });
}

// Функция для инициализации плавной прокрутки
function initSmoothScroll() {
    // Находим все ссылки, которые ведут к якорям на странице
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Используем современный метод scrollIntoView с плавной прокруткой
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Закрываем мобильное меню при переходе по ссылке
            const mobileMenu = document.querySelector('.nav-links');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.mobile-menu-btn').classList.remove('active');
            }
        });
    });
}

// Функция для инициализации кнопки "Вверх"
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    // Показываем кнопку при прокрутке вниз
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Прокручиваем страницу вверх при клике на кнопку
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Функция для инициализации переключателя темы
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.error('Элемент переключения темы не найден!');
        return;
    }
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    
    // Устанавливаем тему при загрузке страницы
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
    
    // Переключаем тему при изменении чекбокса
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            // Включаем темную тему
            document.body.classList.add('dark-theme');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Включаем светлую тему
            document.body.classList.remove('dark-theme');
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Функция для инициализации мобильного меню
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Функция для инициализации отложенной загрузки изображений
function initLazyLoad() {
    // Используем современный Intersection Observer API
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.lazy-load');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Запасной вариант для старых браузеров
        const lazyImages = document.querySelectorAll('.lazy-load');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
        });
    }
}

// Функция для инициализации счетчиков
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.count);
                const duration = 2000; // 2 секунды
                const step = target / (duration / 16); // 60 FPS
                
                let current = 0;
                const updateCount = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Функция для инициализации эффекта печатающегося текста
function initTypedEffect() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const words = ['команда разработчиков', 'инновационные решения', 'передовые технологии', 'опыт и профессионализм'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000; // Пауза перед удалением
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Пауза перед следующим словом
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Запускаем анимацию печати
    setTimeout(type, 1000);
}

// Функция для инициализации слайдера отзывов
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (!testimonialCards.length || !dots.length) return;
    
    // Инициализация для мобильных устройств
    if (window.innerWidth <= 768) {
        let currentIndex = 0;
        
        // Скрываем все отзывы, кроме первого
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Функция для переключения отзывов
        function showTestimonial(index) {
            // Скрываем текущий отзыв
            testimonialCards[currentIndex].style.display = 'none';
            dots[currentIndex].classList.remove('active');
            
            // Показываем новый отзыв
            currentIndex = index;
            testimonialCards[currentIndex].style.display = 'flex';
            dots[currentIndex].classList.add('active');
        }
        
        // Добавляем обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Автоматическое переключение отзывов
        let testimonialInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(nextIndex);
        }, 5000);
        
        // Останавливаем автопереключение при наведении
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            card.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(() => {
                    let nextIndex = (currentIndex + 1) % testimonialCards.length;
                    showTestimonial(nextIndex);
                }, 5000);
            });
        });
    } else {
        // На десктопе добавляем выделение карточки при наведении
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Удаляем выделение с других карточек
                testimonialCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                // Применяем эффект притягивания внимания
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.zIndex = '2';
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('active');
                card.style.transform = '';
                card.style.zIndex = '';
            });
        });
        
        // Добавляем функционал для точек на десктопе
        // Прокручиваем к соответствующему отзыву
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Убираем активный класс со всех точек
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Прокручиваем до соответствующей карточки с плавной анимацией
                testimonialCards[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Добавляем эффект выделения
                testimonialCards.forEach(card => {
                    card.classList.remove('highlighted');
                    card.style.transform = '';
                });
                testimonialCards[index].classList.add('highlighted');
                testimonialCards[index].style.transform = 'translateY(-10px) scale(1.02)';
                
                // Убираем выделение через 2 секунды
                setTimeout(() => {
                    testimonialCards[index].style.transform = '';
                }, 2000);
            });
        });
    }
    
    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        // Перезагружаем страницу при изменении размера окна для переинициализации слайдера
        if ((window.innerWidth <= 768 && !isMobile) || (window.innerWidth > 768 && isMobile)) {
            location.reload();
        }
    });
    
    // Флаг для определения текущего состояния
    const isMobile = window.innerWidth <= 768;
}

// Функция для инициализации модальных окон приложений
function initAppModals() {
    const appCards = document.querySelectorAll('.app-card');
    const modal = document.querySelector('.app-modal');
    const modalContent = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    if (!appCards.length || !modal || !modalContent || !closeModal) return;
    
    // Контент для каждого приложения
    const appDetails = {
        gdetachka: {
            title: 'ГдеТачка?',
            description: 'ГдеТачка? - мобильное приложение, которое поможет вам никогда не забыть, где вы припарковали свой автомобиль. Оно автоматически сохраняет геолокацию вашей машины и предоставляет удобные инструменты для навигации к ней.',
            features: [
                'Автоматическое сохранение местоположения парковки',
                'Навигация к месту парковки с указанием расстояния и направления',
                'Возможность делать фото и заметки о месте парковки',
                'Оповещения о времени парковки и окончании оплаты',
                'Работает без подключения к интернету'
            ],
            icon: 'images/где тачка.jpg',
            link: 'https://www.rustore.ru/catalog/app/com.example.gdemashina'
        },
        subscription: {
            title: 'Менеджер подписок',
            description: 'Менеджер подписок - приложение для контроля и управления всеми вашими подписками в одном месте. Отслеживайте платежи, получайте уведомления о списаниях и оптимизируйте свои расходы на подписки.',
            features: [
                'Учет всех ваших подписок в одном месте',
                'Уведомления о предстоящих списаниях',
                'Статистика и аналитика расходов на подписки',
                'Рекомендации по оптимизации расходов',
                'Возможность отменять подписки прямо из приложения'
            ],
            icon: 'images/менеджер подписок.jpg',
            link: 'https://www.rustore.ru/catalog/app/com.example.podpiska'
        },
        ecowalley: {
            title: 'Эко кошелек: с советами от ИИ',
            description: 'Эко кошелек - это умное приложение для управления личными финансами с встроенным искусственным интеллектом, который анализирует ваши траты и дает персональные рекомендации по экономии и инвестициям.',
            features: [
                'Умный анализ расходов и доходов',
                'Персональные рекомендации по экономии от ИИ',
                'Планирование бюджета и постановка финансовых целей',
                'Автоматическая категоризация трат',
                'Экологический подход к финансам и советы по устойчивому потреблению'
            ],
            icon: 'images/Эко кошёлек.jpg',
            link: 'https://www.rustore.ru/catalog/app/com.example.ecocoshel2'
        },
        stepbystep: {
            title: 'Step by step: бесплатный шагомер',
            description: 'Step by step - это современный шагомер, который точно подсчитывает ваши шаги, калории и пройденное расстояние. Приложение помогает поддерживать активный образ жизни и следить за ежедневной физической активностью.',
            features: [
                'Точный подсчет шагов, калорий и дистанции',
                'Минимальное потребление заряда батареи',
                'Статистика активности по дням, неделям и месяцам',
                'Установка целей и достижений',
                'Интеграция с Google Fit и Apple Health'
            ],
            icon: 'images/step by step.jpg',
            link: 'https://www.rustore.ru/catalog/app/com.example.stepsync'
        },
        evomotion: {
            title: 'EvoMotion AI',
            description: 'EvoMotion AI - инновационное приложение для тренировок с использованием искусственного интеллекта. Оно анализирует технику выполнения упражнений в реальном времени и дает рекомендации по их улучшению.',
            features: [
                'Анализ техники выполнения упражнений через камеру смартфона',
                'Персональные рекомендации по коррекции техники',
                'Более 100 упражнений с подробными инструкциями',
                'Персонализированные программы тренировок',
                'Отслеживание прогресса и улучшений'
            ],
            icon: 'images/EvoMotion AI.jpg',
            link: 'https://www.rustore.ru/catalog/app/com.example.kakafit'
        }
    };
    
    // Открытие модального окна с информацией о приложении
    appCards.forEach(card => {
        const detailsBtn = card.querySelector('.details-btn');
        
        if (!detailsBtn) return;
        
        detailsBtn.addEventListener('click', () => {
            const appId = card.dataset.app;
            const appData = appDetails[appId];
            
            if (!appData) return;
            
            // Заполняем модальное окно данными о приложении
            modalContent.innerHTML = `
                <div class="modal-app-header">
                    <div class="modal-app-icon">
                        <img src="${appData.icon}" alt="${appData.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 12px;">
                    </div>
                    <div class="modal-app-title">
                        <h3>${appData.title}</h3>
                    </div>
                </div>
                <div class="modal-app-description">
                    <p>${appData.description}</p>
                </div>
                <div class="modal-app-features">
                    <h4>Основные возможности:</h4>
                    <ul>
                        ${appData.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-app-cta">
                    <a href="${appData.link}" class="btn primary-btn" target="_blank">
                        <i class="fas fa-download"></i> Скачать приложение
                    </a>
                </div>
            `;
            
            // Показываем модальное окно
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
    });
    
    // Закрытие модального окна при клике вне контента
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
        }
    });
    
    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
        }
    });
}

// Функция для инициализации формы обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Здесь будет отправка данных формы на сервер
        // Для примера просто выводим сообщение об успешной отправке
        
        // Создаем всплывающее сообщение
        const notification = document.createElement('div');
        notification.classList.add('notification', 'success');
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-content">
                <h4>Сообщение отправлено!</h4>
                <p>Спасибо за ваше обращение, ${formValues.name}. Мы свяжемся с вами в ближайшее время.</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Добавляем сообщение на страницу
        document.body.appendChild(notification);
        
        // Анимируем появление
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Удаляем сообщение через 5 секунд
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Обработчик для кнопки закрытия
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Сбрасываем форму
        contactForm.reset();
    });
    
    // Анимация полей ввода при фокусе
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Проверяем при загрузке, если поле уже содержит значение
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Функция для инициализации анимации при скролле
function initScrollAnimation() {
    // Используем Intersection Observer для анимации элементов при прокрутке
    const animatedElements = document.querySelectorAll('.section-header, .app-card, .stat-item, .value-item');
    
    if (!animatedElements.length) return;
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Плавное появление и исчезновение хедера при прокрутке
    const header = document.querySelector('header');
    if (!header) return;
    
    // Сделаем хедер изначально видимым
    header.classList.add('visible');
    
    let lastScrollTop = 0;
    let isScrollingDown = false;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Определяем направление прокрутки
        isScrollingDown = currentScroll > lastScrollTop && currentScroll > 50;
        
        // Управляем видимостью хедера
        if (isScrollingDown) {
            header.classList.remove('visible');
        } else {
            header.classList.add('visible');
        }
        
        // Добавляем класс scrolled для изменения внешнего вида
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
}

// Функция для инициализации динамического фона
function initDynamicBackground() {
    const orbs = document.querySelectorAll('.gradient-orb');
    const dynamicBackground = document.querySelector('.dynamic-background');
    
    if (!orbs.length || !dynamicBackground) return;
    
    // Эффект параллакса для фона при движении мыши по всему документу
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Разная скорость движения для каждого шара
        orbs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        orbs[1].style.transform = `translate(${-x * 25}px, ${-y * 25}px)`;
        orbs[2].style.transform = `translate(${x * 20}px, ${-y * 20}px)`;
    });
    
    // Адаптивное изменение фона при прокрутке всей страницы
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const scrollPercentage = scrollY / (documentHeight - windowHeight);
        
        // Плавное изменение эффектов фона по мере прокрутки страницы
        orbs[0].style.opacity = 0.5 - (scrollPercentage * 0.1);
        orbs[1].style.opacity = 0.4 + (scrollPercentage * 0.1);
        orbs[2].style.filter = `blur(${40 + scrollPercentage * 10}px)`;
        
        // Добавляем вращение для усиления эффекта глубины
        orbs[0].style.transform += ` rotate(${scrollPercentage * 10}deg)`;
        orbs[1].style.transform += ` rotate(-${scrollPercentage * 15}deg)`;
        orbs[2].style.transform += ` rotate(${scrollPercentage * 5}deg)`;
    });
    
    // Создаем непрерывный поток частиц для более живого фона
    setInterval(() => createRandomParticle(), 500);
    
    // Начальная генерация частиц
    for (let i = 0; i < 15; i++) {
        createRandomParticle();
    }
    
    // Функция для создания случайной частицы
    function createRandomParticle() {
        const particles = document.querySelector('.particles');
        if (!particles) return;
        
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные параметры для частицы для большего разнообразия
        const size = Math.random() * 8 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 2;
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Применяем случайные стили
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.opacity = opacity;
        particle.style.setProperty('--rise-time', `${duration}s`);
        particle.style.animationDelay = `${delay}s`;
        
        // Случайный цвет для некоторых частиц
        if (Math.random() > 0.7) {
            const hue = Math.floor(Math.random() * 60) + 200; // оттенки синего и фиолетового
            particle.style.backgroundColor = `hsla(${hue}, 80%, 70%, ${opacity})`;
        }
        
        particles.appendChild(particle);
        
        // Удаляем частицу после завершения анимации
        setTimeout(() => {
            if (particles.contains(particle)) {
                particles.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
}

// Функция для инициализации библиотеки AOS
function initAOS() {
    // Проверяем, доступна ли библиотека AOS
    if (typeof AOS !== 'undefined') {
        // Инициализируем AOS с нужными параметрами
        AOS.init({
            // Глобальные настройки
            duration: 500, // уменьшаем продолжительность анимации с 800 до 500мс
            easing: 'ease-out', // меняем функцию плавности для более быстрого эффекта
            once: false, // повторять ли анимацию при прокрутке вверх-вниз
            mirror: true, // отражать ли анимацию при прокрутке вверх
            anchorPlacement: 'top-center', // определяет, какая позиция элемента относительно окна должна триггерить анимацию
            offset: 80, // уменьшаем смещение с 120 до 80 пикселей для более быстрого срабатывания
            delay: 0, // задержка по умолчанию
            
            // Дополнительные параметры для мобильных устройств
            disable: false, // не отключаем анимацию на маленьких экранах
            startEvent: 'DOMContentLoaded', // когда начинать наблюдение за элементами
            
            // Параметры для дебага
            debounceDelay: 30, // уменьшаем задержку debounce для более быстрой реакции
            throttleDelay: 50, // уменьшаем задержку throttle для более быстрой реакции
        });
        
        // Обновляем AOS при изменении размера окна
        window.addEventListener('resize', () => {
            AOS.refresh();
        });
    }
}

// Функция для инициализации обработки мобильных событий
function initMobileSupport() {
    // Определяем, является ли устройство мобильным
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Добавляем класс mobile к body для применения мобильных стилей
        document.body.classList.add('mobile-device');
        
        // Оптимизация динамического фона для мобильных устройств
        const dynamicBg = document.querySelector('.dynamic-background');
        if (dynamicBg) {
            // Уменьшаем количество частиц на мобильных устройствах
            const particles = dynamicBg.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                // Показываем только половину частиц для экономии ресурсов
                if (index % 2 !== 0) {
                    particle.style.display = 'none';
                }
            });
        }
        
        // Добавляем обработку касаний для слайдера отзывов
        const testimonialsContainer = document.querySelector('.testimonials-container');
        if (testimonialsContainer) {
            let startX, endX;
            let threshold = 50; // Минимальное расстояние свайпа
            
            testimonialsContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });
            
            testimonialsContainer.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const dots = document.querySelectorAll('.testimonial-dots .dot');
                if (!dots.length) return;
                
                // Находим текущую активную точку
                let activeIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
                if (activeIndex === -1) activeIndex = 0;
                
                if (startX - endX > threshold) {
                    // Свайп влево - следующий отзыв
                    const nextIndex = (activeIndex + 1) % dots.length;
                    dots[nextIndex].click();
                } else if (endX - startX > threshold) {
                    // Свайп вправо - предыдущий отзыв
                    const prevIndex = (activeIndex - 1 + dots.length) % dots.length;
                    dots[prevIndex].click();
                }
            }
        }
        
        // Улучшение взаимодействия с формами на мобильных устройствах
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Увеличиваем область касания для элементов формы
            input.style.fontSize = '16px'; // Предотвращает масштабирование формы на iPhone
            
            // Скролл к активному полю ввода для предотвращения перекрытия виртуальной клавиатурой
            input.addEventListener('focus', () => {
                // Даем немного времени для появления клавиатуры
                setTimeout(() => {
                    // Плавно прокручиваем к элементу
                    input.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }, { passive: true });
        });
        
        // Оптимизация обработки событий прокрутки
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            // Если таймаут уже установлен, очищаем его
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            // Устанавливаем новый таймаут
            scrollTimeout = setTimeout(() => {
                // Обновляем AOS на мобильных устройствах только после завершения прокрутки
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 200);
        }, { passive: true });
    }
} 