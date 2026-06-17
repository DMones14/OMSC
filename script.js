gsap.registerPlugin(ScrollTrigger);

        const smoothScrollTo = (target) => {
            if (!target) return;
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        // ===== HAMBURGER MENU FUNCTIONALITY =====
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

        if (hamburgerMenu && mobileMenu) {
            hamburgerMenu.addEventListener('click', () => {
                hamburgerMenu.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburgerMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });

            // Close menu when scrolling
            window.addEventListener('scroll', () => {
                hamburgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        }

        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    splashScreen.classList.add('hide');
                    setTimeout(() => splashScreen.remove(), 600);
                }, 1600);
            });
        }

        // ===== CONTACT BRANCH MAP SWITCHING =====
        const officeItems = document.querySelectorAll('.office-item');
        const mapIframe = document.querySelector('#map iframe');

        if (officeItems.length && mapIframe) {
            const selectBranch = (item) => {
                officeItems.forEach(card => card.classList.remove('active'));
                item.classList.add('active');

                const lat = item.getAttribute('data-lat');
                const lng = item.getAttribute('data-lng');
                const zoom = 18;
                if (lat && lng) {
                    mapIframe.src = `https://maps.google.com/maps?ll=${lat},${lng}&q=${lat},${lng}&z=${zoom}&output=embed`;
                }
            };

            officeItems.forEach((item, index) => {
                item.addEventListener('click', () => selectBranch(item));
                if (index === 0) {
                    selectBranch(item);
                }
            });
        }

        // ===== LEADING THE WAY SCROLL ANIMATIONS =====
        gsap.fromTo('.ltw-header',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.leading-the-way',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.ltw-compass',
            { opacity: 0, scale: 0.5, rotationZ: -45 },
            {
                opacity: 1,
                scale: 1,
                rotationZ: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.leading-the-way',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.ltw-main-message',
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.leading-the-way',
                    start: 'top 60%'
                },
                delay: 0.2
            }
        );

        gsap.fromTo('.ltw-description',
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.leading-the-way',
                    start: 'top 55%'
                },
                delay: 0.4
            }
        );

        gsap.fromTo('.ltw-badge',
            { opacity: 0, scale: 0, rotationZ: 360 },
            {
                opacity: 1,
                scale: 1,
                rotationZ: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.leading-the-way',
                    start: 'top 50%'
                },
                delay: 0.6
            }
        );

        // ===== TABLE OF CONTENTS NAVIGATION =====
        document.querySelectorAll('.toc-item').forEach(item => {
            item.addEventListener('click', () => {
                const linkId = item.getAttribute('data-link');
                const target = document.getElementById(linkId);
                smoothScrollTo(target);
            });
        });

        // Table of Contents scroll animations
        document.querySelectorAll('.toc-item').forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: '.table-of-contents',
                        start: 'top 70%'
                    },
                    delay: index * 0.1
                }
            );
        });

        // ===== HERO ANIMATIONS =====
        gsap.fromTo('.hero-content h1', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.2 }
        );

        gsap.fromTo('.hero-content p', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.4 }
        );

        gsap.fromTo('.cta-button', 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, delay: 0.6 }
        );

        // ===== HERO BACKGROUND PARTICLES =====
        const heroParticleField = document.getElementById('heroParticleField');
        if (heroParticleField) {
            const particleCount = 120;
            const particles = [];
            const colors = [
                'rgba(255, 255, 255, 0.9)',
                'rgba(0, 212, 255, 0.85)',
                'rgba(255, 193, 7, 0.75)',
                'rgba(0, 168, 232, 0.7)'
            ];

            const createHeroParticle = () => {
                const span = document.createElement('span');
                const size = Math.random() * 6 + 4;
                const x = Math.random() * heroParticleField.clientWidth;
                const y = Math.random() * heroParticleField.clientHeight;
                const speed = Math.random() * 0.25 + 0.25;
                const drift = Math.random() * 0.3 - 0.15;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const opacity = Math.random() * 0.4 + 0.4;

                span.className = 'hero-particle';
                span.style.width = `${size}px`;
                span.style.height = `${size}px`;
                span.style.background = color;
                span.style.opacity = opacity;
                heroParticleField.appendChild(span);

                return { el: span, x, y, speed, drift };
            };

            for (let i = 0; i < particleCount; i += 1) {
                particles.push(createHeroParticle());
            }

            const animateHeroParticles = () => {
                const bounds = heroParticleField.getBoundingClientRect();
                const width = bounds.width;
                const height = bounds.height;

                particles.forEach((particle) => {
                    particle.x += particle.drift * 0.3;
                    particle.y -= particle.speed;
                    particle.drift += Math.random() * 0.02 - 0.01;

                    if (particle.y < -30) {
                        particle.y = height + 20;
                        particle.x = Math.random() * width;
                        particle.speed = Math.random() * 0.25 + 0.25;
                        particle.drift = Math.random() * 0.3 - 0.15;
                    }
                    if (particle.x < -30) particle.x = width + 30;
                    if (particle.x > width + 30) particle.x = -30;

                    particle.el.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
                });

                requestAnimationFrame(animateHeroParticles);
            };

            animateHeroParticles();
        }

        // ===== 3D CAROUSEL ANIMATIONS =====
        const carouselItems = document.querySelectorAll('.carousel-item');
        
        // Animate carousel items on load with staggered effect
        carouselItems.forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, scale: 0.5, rotateX: -90 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    rotateX: 0,
                    duration: 0.8,
                    delay: 0.3 + index * 0.1
                }
            );

            // Glow pulse effect
            gsap.to(item, {
                boxShadow: '0 0 30px rgba(255, 193, 7, 0.5), 0 20px 60px rgba(0, 0, 0, 0.5)',
                duration: 2,
                repeat: -1,
                yoyo: true,
                delay: index * 0.3
            });
        });

        // ===== CAROUSEL INTERACTIVE HOVER =====
        const carouselContainer = document.querySelector('.carousel-container');
        let isHovering = false;

        document.querySelector('.hero-3d-bg').addEventListener('mouseenter', () => {
            isHovering = true;
            gsap.to(carouselContainer, { animationPlayState: 'paused', duration: 0.3 });
        });

        document.querySelector('.hero-3d-bg').addEventListener('mouseleave', () => {
            isHovering = false;
            gsap.to(carouselContainer, { animationPlayState: 'running', duration: 0.3 });
        });

        // Mouse move parallax effect on carousel
        document.addEventListener('mousemove', (e) => {
            if (isHovering) {
                const x = (e.clientX / window.innerWidth) - 0.5;
                const y = (e.clientY / window.innerHeight) - 0.5;
                
                gsap.to(carouselContainer, {
                    rotateX: y * 5,
                    rotateY: x * 5,
                    duration: 0.3
                });
            }
        });

        // ===== FLOATING CARDS ANIMATION =====
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50, rotateX: -20 },
                { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.8 + index * 0.2 }
            );

            // Floating animation
            gsap.to(card, {
                y: 20,
                rotation: 5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Hover effect
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.05, duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3 });
            });
        });

        // ===== SCROLL ANIMATIONS =====
        // About section
        gsap.to('.about-grid', {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            }
        });

        // Service cards stagger
        document.querySelectorAll('.service-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.services',
                        start: 'top 60%'
                    },
                    delay: index * 0.1
                }
            );
        });

        // Certification items
        document.querySelectorAll('.cert-item').forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: '.certifications',
                        start: 'top 60%'
                    },
                    delay: index * 0.05
                }
            );
        });

        // Survey & Certification Section Animations
        gsap.fromTo('.survey-visual',
            { opacity: 0, x: -50, rotateY: -30 },
            {
                opacity: 1,
                x: 0,
                rotateY: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.survey-certification',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.survey-content',
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.survey-certification',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.survey-title',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.survey-certification',
                    start: 'top 65%'
                },
                delay: 0.2
            }
        );

        // Animate survey service items with stagger
        document.querySelectorAll('.survey-service-item').forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: '.survey-certification',
                        start: 'top 60%'
                    },
                    delay: 0.3 + index * 0.1
                }
            );
        });

        // Value cards
        document.querySelectorAll('.value-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: '.core-values',
                        start: 'top 60%'
                    },
                    delay: index * 0.08
                }
            );
        });

        // Mission & Vision Cards
        document.querySelectorAll('.mission-vision-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50, rotateX: -20 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.core-values',
                        start: 'top 70%'
                    },
                    delay: index * 0.2
                }
            );
        });

        // ===== COURSE FILTERING =====
        function filterCourses(category) {
            const courses = document.querySelectorAll('.course-item');
            const buttons = document.querySelectorAll('.tab-button');

            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            courses.forEach(course => {
                const courseCategory = course.getAttribute('data-category');
                if (courseCategory === category || category === 'All') {
                    gsap.to(course, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
                } else {
                    gsap.to(course, { opacity: 0.2, duration: 0.3, pointerEvents: 'none' });
                }
            });
        }

        // ===== NAVIGATION SCROLL EFFECT =====
        let lastScrollTop = 0;
        const nav = document.querySelector('nav');

        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                gsap.to(nav, { y: -100, duration: 0.3 });
            } else {
                // Scrolling up
                gsap.to(nav, { y: 0, duration: 0.3 });
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // ===== SMOOTH SCROLL LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                smoothScrollTo(target);
            });
        });

        // ===== ANIME.JS - INTERACTIVE CURSOR EFFECT =====
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            document.querySelectorAll('.service-card, .cert-item, .value-card').forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementX = rect.left + rect.width / 2;
                const elementY = rect.top + rect.height / 2;

                const distance = Math.sqrt((x - elementX) ** 2 + (y - elementY) ** 2);
                
                if (distance < 200) {
                    const angle = Math.atan2(y - elementY, x - elementX);
                    const moveX = Math.cos(angle) * (200 - distance) * 0.05;
                    const moveY = Math.sin(angle) * (200 - distance) * 0.05;

                    gsap.to(element, {
                        x: moveX,
                        y: moveY,
                        duration: 0.3
                    });
                } else {
                    gsap.to(element, {
                        x: 0,
                        y: 0,
                        duration: 0.3
                    });
                }
            });
        });

        // ===== SERVICES DETAILS PARTICLE FIELD =====
        const detailParticleField = document.getElementById('detailParticleField');
        if (detailParticleField) {
            const particleCount = 90;
            const particles = [];
            const colors = [
                'rgba(0,212,255,0.85)',
                'rgba(255,193,7,0.75)',
                'rgba(255,255,255,0.65)',
                'rgba(0,168,232,0.7)'
            ];

            const fieldRect = detailParticleField.getBoundingClientRect();
            const fieldWidth = Math.max(fieldRect.width, window.innerWidth);
            const fieldHeight = Math.max(fieldRect.height, window.innerHeight);

            const mouse = { x: fieldWidth / 2, y: fieldHeight / 2 };

            const createParticle = () => {
                const particle = document.createElement('span');
                const size = Math.random() * 6 + 4;
                const x = Math.random() * fieldWidth;
                const y = Math.random() * fieldHeight;
                const speed = Math.random() * 0.4 + 0.4;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const opacity = Math.random() * 0.4 + 0.4;

                particle.className = 'particle';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = color;
                particle.style.opacity = opacity;
                particle.style.left = '0';
                particle.style.top = '0';

                detailParticleField.appendChild(particle);

                return { el: particle, x, y, vx: 0, vy: 0, speed };
            };

            for (let i = 0; i < particleCount; i += 1) {
                particles.push(createParticle());
            }

            document.addEventListener('mousemove', (event) => {
                const bounds = detailParticleField.getBoundingClientRect();
                mouse.x = event.clientX - bounds.left;
                mouse.y = event.clientY - bounds.top;
            });

            const animateParticles = () => {
                const bounds = detailParticleField.getBoundingClientRect();
                const width = bounds.width;
                const height = bounds.height;

                particles.forEach((particle) => {
                    const dx = mouse.x - particle.x;
                    const dy = mouse.y - particle.y;
                    const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
                    const force = Math.min(120, 120 / dist) * 0.02;

                    particle.vx += dx / dist * force;
                    particle.vy += dy / dist * force;
                    particle.vx *= 0.98;
                    particle.vy *= 0.98;
                    particle.y -= particle.speed;
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.y < -20) {
                        particle.y = height + 20;
                        particle.x = Math.random() * width;
                    }
                    if (particle.x < -20) particle.x = width + 20;
                    if (particle.x > width + 20) particle.x = -20;
                    if (particle.y > height + 20) particle.y = -20;

                    particle.el.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
                });

                requestAnimationFrame(animateParticles);
            };

            animateParticles();
        }

        const galleryOverlay = document.getElementById('galleryOverlay');
        const galleryOverlayImage = document.getElementById('galleryOverlayImage');
        const galleryOverlayCaption = document.getElementById('galleryOverlayCaption');
        const galleryOverlayClose = document.getElementById('galleryOverlayClose');
        const galleryOverlayBackdrop = document.getElementById('galleryOverlayBackdrop');
        const galleryOverlayPrev = document.getElementById('galleryOverlayPrev');
        const galleryOverlayNext = document.getElementById('galleryOverlayNext');

        const galleryItems = [];
        document.querySelectorAll('.gallery-card').forEach(card => {
            const photo = card.querySelector('.gallery-photo');
            const caption = card.querySelector('.gallery-caption').textContent.trim();
            const key = `${photo.src}::${caption}`;
            if (photo && !galleryItems.some(item => item.key === key)) {
                galleryItems.push({ key, src: photo.src, alt: photo.alt || caption, caption });
            }
        });

        let currentGalleryIndex = 0;

        const showGalleryItem = (index, direction) => {
            currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
            const { src, alt, caption } = galleryItems[currentGalleryIndex];

            // If no direction provided just swap immediately (used on initial open)
            if (!direction) {
                galleryOverlayImage.src = src;
                galleryOverlayImage.alt = alt;
                galleryOverlayCaption.textContent = caption;
                return;
            }

            // Animate current image out then swap src and animate the new image in
            const outX = direction === 'left' ? -240 : 240;
            const outRotate = direction === 'left' ? -18 : 18;

            gsap.to(galleryOverlayImage, {
                x: outX,
                rotationY: outRotate,
                scale: 0.94,
                filter: 'blur(4px)',
                opacity: 0,
                duration: 0.42,
                ease: 'power2.in',
                onComplete: () => {
                    // swap image and caption
                    galleryOverlayImage.src = src;
                    galleryOverlayImage.alt = alt;
                    galleryOverlayCaption.textContent = caption;

                    // position off-screen on opposite side and animate in
                    const inX = direction === 'left' ? 240 : -240;
                    gsap.set(galleryOverlayImage, { x: inX, rotationY: -outRotate, scale: 0.94, opacity: 0, filter: 'blur(6px)' });
                    gsap.to(galleryOverlayImage, {
                        x: 0,
                        rotationY: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        opacity: 1,
                        duration: 0.7,
                        ease: 'power3.out'
                    });

                    // subtle caption/text animation
                    gsap.fromTo('.gallery-overlay-copy', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
                }
            });
        };

        const openGalleryOverlay = ({ src, alt, caption }) => {
            galleryOverlayImage.src = src;
            galleryOverlayImage.alt = alt;
            galleryOverlayCaption.textContent = caption;
            galleryOverlay.classList.add('is-visible');
            galleryOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');

            gsap.fromTo('.gallery-overlay-panel',
                { opacity: 0, scale: 0.92, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );

            gsap.fromTo('.gallery-overlay-nav',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
            );
        };

        const closeGalleryOverlay = () => {
            galleryOverlay.classList.remove('is-visible');
            galleryOverlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
        };

        document.querySelectorAll('.gallery-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const photo = card.querySelector('.gallery-photo');
                const caption = card.querySelector('.gallery-caption').textContent.trim();
                if (!photo) return;
                currentGalleryIndex = galleryItems.findIndex(item => item.src === photo.src && item.caption === caption);
                if (currentGalleryIndex === -1) currentGalleryIndex = 0;
                openGalleryOverlay(galleryItems[currentGalleryIndex]);
            });
        });

        const showNextGalleryItem = () => showGalleryItem(currentGalleryIndex + 1, 'left');
        const showPrevGalleryItem = () => showGalleryItem(currentGalleryIndex - 1, 'right');

        galleryOverlayClose.addEventListener('click', closeGalleryOverlay);
        galleryOverlayBackdrop.addEventListener('click', closeGalleryOverlay);
        galleryOverlayNext.addEventListener('click', showNextGalleryItem);
        galleryOverlayPrev.addEventListener('click', showPrevGalleryItem);
        document.addEventListener('keydown', (e) => {
            if (!galleryOverlay.classList.contains('is-visible')) return;
            if (e.key === 'Escape') {
                closeGalleryOverlay();
            }
            if (e.key === 'ArrowRight') {
                showNextGalleryItem();
            }
            if (e.key === 'ArrowLeft') {
                showPrevGalleryItem();
            }
        });

        gsap.to('.gallery-overlay-nav', {
            y: 6,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // ===== PARALLAX EFFECT =====
        gsap.utils.toArray('.about, .training, .core-values').forEach((section) => {
            gsap.fromTo(section,
                { backgroundPosition: '0% 0%' },
                {
                    backgroundPosition: '0% 100%',
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        markers: false
                    }
                }
            );
        });

        // ===== ENHANCED HERO SECTION SCROLL ANIMATIONS =====
        gsap.to('.carousel-container', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom center',
                scrub: 0.5,
                markers: false
            },
            rotationY: 180,
            ease: 'none'
        });

        // Parallax effect on hero content
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom center',
                scrub: true,
                markers: false
            },
            y: 100,
            opacity: 0.8,
            ease: 'none'
        });

        // ===== ENHANCED SURVEY SECTION IMMERSIVE ANIMATIONS =====
        
        // Survey visual parallax entrance
        gsap.fromTo('.survey-visual',
            { opacity: 0, x: -100, rotationY: -45 },
            {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: '.survey-certification',
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1,
                    markers: false
                }
            }
        );

        // Survey content slide in
        gsap.fromTo('.survey-content',
            { opacity: 0, x: 100 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: '.survey-certification',
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1,
                    markers: false
                }
            }
        );

        // Survey title animation
        gsap.fromTo('.survey-title',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.survey-certification',
                    start: 'top 70%',
                    end: 'top 50%',
                    scrub: 0.5,
                    markers: false
                }
            }
        );

        // Staggered survey service items
        document.querySelectorAll('.survey-service-item').forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.survey-certification',
                        start: 'top 65%',
                        end: 'top 35%',
                        scrub: 0.5,
                        markers: false
                    },
                    delay: index * 0.15
                }
            );
        });

        // Survey image card floating animation
        gsap.to('.survey-card-3d',
            {
                scrollTrigger: {
                    trigger: '.survey-certification',
                    start: 'top 80%',
                    end: 'top -20%',
                    scrub: 1,
                    markers: false
                },
                y: -50,
                rotationX: 10,
                ease: 'none'
            }
        );

        // ===== QUOTE SECTION SCROLL ANIMATIONS =====
        gsap.fromTo('.quote-text',
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.quote-mark',
            { opacity: 0, rotationZ: -45 },
            {
                opacity: 0.3,
                rotationZ: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 75%'
                }
            }
        );

        gsap.fromTo('.quote-source',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 65%'
                },
                delay: 0.3
            }
        );

        gsap.fromTo('.quote-accent-line',
            { opacity: 0, scaleX: 0 },
            {
                opacity: 1,
                scaleX: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 60%'
                },
                delay: 0.5
            }
        );

        // ===== WAVE BACKGROUND SCROLL PARALLAX =====
        gsap.to('.wave-bg',
            {
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                    markers: false
                },
                y: 50,
                opacity: 1,
                ease: 'none'
            }
        );

        // ===== FLOATING PARTICLES PARALLAX =====
        document.querySelectorAll('.float-particle').forEach((particle, index) => {
            gsap.to(particle,
                {
                    scrollTrigger: {
                        trigger: '.quote-section',
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 0.5,
                        markers: false
                    },
                    y: -80 - (index * 10),
                    x: (index % 2 === 0 ? 30 : -30),
                    opacity: 0.8,
                    ease: 'none'
                }
            );
        });

        // ===== QUOTE CONTAINER SCROLL EFFECT =====
        gsap.to('.quote-container',
            {
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                    markers: false
                },
                letterSpacing: '2px',
                ease: 'none'
            }
        );

        // ===== MARITIME PARTNER SCROLL ANIMATIONS =====
        gsap.fromTo('.partner-header',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.maritime-partner',
                    start: 'top 70%'
                }
            }
        );

        document.querySelectorAll('.partner-logo-item').forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 40, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: '.maritime-partner',
                        start: 'top 65%'
                    },
                    delay: index * 0.12
                }
            );
        });

        const scrollToTopBtn = document.getElementById('scrollToTopBtn');

        window.addEventListener('scroll', () => {
            if (!scrollToTopBtn) return;
            if (window.scrollY > 280) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                gsap.to(scrollToTopBtn, {
                    scale: 0.92,
                    duration: 0.12,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power1.inOut'
                });
            });
        }

        // ===== PAGE LOAD ANIMATION ===== 
        window.addEventListener('load', () => {
            gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.5 });
        });