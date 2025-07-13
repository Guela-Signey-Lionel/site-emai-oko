// Navigation mobile
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Effet de scroll sur la navbar
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Animation au scroll améliorée
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.mission-card, .project-card, .team-member, .why-card, .type-card, .partner-logo, .section-header, .about-content, .contact-content').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Animation des compteurs
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Animation des éléments au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Animation séquentielle des éléments de la hero section
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animation des cartes avec délai
    const cards = document.querySelectorAll('.mission-card, .project-card, .team-member, .why-card, .type-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 500 + (index * 100));
    });
    
    // Animation des icônes
    const icons = document.querySelectorAll('.mission-icon, .why-icon');
    icons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0.3)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.8s ease-out';
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 800 + (index * 150));
    });
    
    // Animation du formulaire
    const joinForm = document.querySelector('.join-form');
    if (joinForm) {
        joinForm.style.opacity = '0';
        joinForm.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            joinForm.style.transition = 'all 0.8s ease-out';
            joinForm.style.opacity = '1';
            joinForm.style.transform = 'scale(1)';
        }, 1000);
    }
});

// Animation au hover des cartes
document.querySelectorAll('.mission-card, .project-card, .team-member, .why-card, .type-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
});

// Animation des boutons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(34, 197, 94, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Animation des liens de navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
            const carouselItems = document.querySelectorAll('.carousel-item');
            let current = 0;
            setInterval(() => {
                carouselItems[current].style.display = 'none';
                current = (current + 1) % carouselItems.length;
                carouselItems[current].style.display = 'block';
        }, 6000);
    });

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation simple
    if (!name || !email || !subject || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
    showNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success');
    
    // Réinitialiser le formulaire
    this.reset();
});

// Fonction de validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour afficher les notifications
function showNotification(message, type) {
    // Supprimer les notifications existantes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Ajouter les styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Gérer la fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Effet de parallaxe léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Animation des compteurs (si vous voulez ajouter des statistiques)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Masquer le loader si présent
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Ajouter une classe pour indiquer que la page est chargée
    document.body.classList.add('loaded');
    
    // Gestion du bouton "Voir plus de photos"
    const toggleButton = document.getElementById('toggle-gallery');
    const galleryFull = document.getElementById('galerie-photos');
    
    if (toggleButton && galleryFull) {
        let isGalleryVisible = false;
        
        toggleButton.addEventListener('click', function() {
            console.log('Bouton cliqué!'); // Debug
            if (isGalleryVisible) {
                // Cacher la galerie
                galleryFull.style.display = 'none';
                toggleButton.textContent = 'Voir plus de photos';
                isGalleryVisible = false;
                
                // Scroll vers le haut de la section galerie
                galleryFull.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            } else {
                // Afficher la galerie
                galleryFull.style.display = 'block';
                toggleButton.textContent = 'Voir moins de photos';
                isGalleryVisible = true;
                
                // Scroll vers la galerie complète
                galleryFull.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }
});

// Gestion des erreurs d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Image+Non+Disponible';
    });
});

// Fonction de traduction
function translatePage(language) {
    const currentTranslations = translations[language];
    
    // Navigation
    document.querySelector('a[href="#accueil"]').textContent = currentTranslations['nav-accueil'];
    document.querySelector('a[href="#a-propos"]').textContent = currentTranslations['nav-a-propos'];
    document.querySelector('a[href="#missions"]').textContent = currentTranslations['nav-missions'];
    document.querySelector('a[href="#projets"]').textContent = currentTranslations['nav-projets'];
    document.querySelector('a[href="#equipe"]').textContent = currentTranslations['nav-equipe'];
    document.querySelector('a[href="#contact"]').textContent = currentTranslations['nav-contact'];
    document.querySelector('a[href="#rejoignez-nous"]').textContent = currentTranslations['nav-rejoignez'];

    // Hero Section
    document.querySelector('.hero-title').innerHTML = currentTranslations['hero-title'].replace('É Maï Oko', '<span style="font-weight: 700; letter-spacing: 1px;">É</span><span style="font-weight: 700; letter-spacing: 1px;"> Maï Oko</span>');
    document.querySelector('.hero-subtitle').textContent = currentTranslations['hero-subtitle'];
    document.querySelector('.hero-description').textContent = currentTranslations['hero-description'];
    document.querySelector('.hero-buttons .btn-primary').textContent = currentTranslations['hero-btn-decouvrir'];
    document.querySelector('.hero-buttons .btn-secondary').textContent = currentTranslations['hero-btn-contacter'];

    // Carousel Info
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length >= 8) {
        carouselItems[0].querySelector('h3').textContent = currentTranslations['carousel-education-title'];
        carouselItems[0].querySelector('p').textContent = currentTranslations['carousel-education-desc'];
        carouselItems[1].querySelector('h3').textContent = currentTranslations['carousel-sante-title'];
        carouselItems[1].querySelector('p').textContent = currentTranslations['carousel-sante-desc'];
        carouselItems[2].querySelector('h3').textContent = currentTranslations['carousel-environnement-title'];
        carouselItems[2].querySelector('p').textContent = currentTranslations['carousel-environnement-desc'];
        carouselItems[3].querySelector('h3').textContent = currentTranslations['carousel-economie-title'];
        carouselItems[3].querySelector('p').textContent = currentTranslations['carousel-economie-desc'];
        carouselItems[4].querySelector('h3').textContent = currentTranslations['carousel-protection-title'];
        carouselItems[4].querySelector('p').textContent = currentTranslations['carousel-protection-desc'];
        carouselItems[5].querySelector('h3').textContent = currentTranslations['carousel-alimentation-title'];
        carouselItems[5].querySelector('p').textContent = currentTranslations['carousel-alimentation-desc'];
        carouselItems[6].querySelector('h3').textContent = currentTranslations['carousel-hygiene-title'];
        carouselItems[6].querySelector('p').textContent = currentTranslations['carousel-hygiene-desc'];
        carouselItems[7].querySelector('h3').textContent = currentTranslations['carousel-gouvernance-title'];
        carouselItems[7].querySelector('p').textContent = currentTranslations['carousel-gouvernance-desc'];
    }

    // À Propos Section
    document.querySelector('#a-propos .section-header h2').textContent = currentTranslations['about-title'];
    document.querySelector('#a-propos .section-header p').textContent = currentTranslations['about-subtitle'];
    document.querySelector('#a-propos .about-text h3:first-of-type').textContent = currentTranslations['about-history-title'];
    document.querySelector('#a-propos .about-text p').textContent = currentTranslations['about-history-text'];
    document.querySelector('#a-propos .about-text h3:last-of-type').textContent = currentTranslations['about-values-title'];
    
    const valuesList = document.querySelector('#a-propos .values-list');
    if (valuesList) {
        const valuesItems = valuesList.querySelectorAll('li');
        valuesItems[0].innerHTML = `<i class="fas fa-heart"></i> ${currentTranslations['about-solidarite']}`;
        valuesItems[1].innerHTML = `<i class="fas fa-hands-helping"></i> ${currentTranslations['about-travail']}`;
        valuesItems[2].innerHTML = `<i class="fas fa-leaf"></i> ${currentTranslations['about-developpement']}`;
    }

    // Section Partenaires
    const partnersTitle = document.querySelector('.partners-section .section-header h2');
    if (partnersTitle) {
        partnersTitle.textContent = currentTranslations['partners-title'];
    }

    const partnersSubtitle = document.querySelector('.partners-section .section-header p');
    if (partnersSubtitle) {
        partnersSubtitle.textContent = currentTranslations['partners-subtitle'];
    }

    // Missions Section
    document.querySelector('#missions .section-header h2').textContent = currentTranslations['missions-title'];
    document.querySelector('#missions .section-header p').textContent = currentTranslations['missions-subtitle'];
    
    const missionCards = document.querySelectorAll('.mission-card');
    if (missionCards.length >= 8) {
        missionCards[0].querySelector('h3').textContent = currentTranslations['mission-education-title'];
        missionCards[0].querySelector('p').textContent = currentTranslations['mission-education-desc'];
        missionCards[1].querySelector('h3').textContent = currentTranslations['mission-sante-title'];
        missionCards[1].querySelector('p').textContent = currentTranslations['mission-sante-desc'];
        missionCards[2].querySelector('h3').textContent = currentTranslations['mission-environnement-title'];
        missionCards[2].querySelector('p').textContent = currentTranslations['mission-environnement-desc'];
        missionCards[3].querySelector('h3').textContent = currentTranslations['mission-economie-title'];
        missionCards[3].querySelector('p').textContent = currentTranslations['mission-economie-desc'];
        missionCards[4].querySelector('h3').textContent = currentTranslations['mission-protection-title'];
        missionCards[4].querySelector('p').textContent = currentTranslations['mission-protection-desc'];
        missionCards[5].querySelector('h3').textContent = currentTranslations['mission-alimentation-title'];
        missionCards[5].querySelector('p').textContent = currentTranslations['mission-alimentation-desc'];
        missionCards[6].querySelector('h3').textContent = currentTranslations['mission-hygiene-title'];
        missionCards[6].querySelector('p').textContent = currentTranslations['mission-hygiene-desc'];
        missionCards[7].querySelector('h3').textContent = currentTranslations['mission-gouvernance-title'];
        missionCards[7].querySelector('p').textContent = currentTranslations['mission-gouvernance-desc'];
    }

    // Projets Section
    const projetsSections = document.querySelectorAll('#projets .section-header h2');
    if (projetsSections.length > 0) {
        projetsSections[0].textContent = currentTranslations['projets-title'];
    }
    
    const projetsSubtitles = document.querySelectorAll('#projets .section-header p');
    if (projetsSubtitles.length > 0) {
        projetsSubtitles[0].textContent = currentTranslations['projets-subtitle'];
    }

    // Activités en cours et réalisées
    const activitesEnCours = document.querySelector('#projets .section-header h3');
    if (activitesEnCours) {
        activitesEnCours.textContent = currentTranslations['activites-en-cours'] || 'Activités en cours';
    }

    const activitesRealisees = document.querySelector('.activites-realisees-titre');
    if (activitesRealisees) {
        activitesRealisees.textContent = currentTranslations['activites-realisees'] || 'Activités réalisées';
    }

    // Galerie des activités réalisées
    const galerieActivites = document.querySelector('.gallery-section h3');
    if (galerieActivites) {
        galerieActivites.textContent = currentTranslations['galerie-activites'] || 'Galerie des activités réalisées';
    }

    // Projets individuels
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length >= 6) {
        // Premier projet - Formations Professionnelles
        projectCards[0].querySelector('h3').textContent = currentTranslations['projet-formations-title'];
        projectCards[0].querySelector('p').textContent = currentTranslations['projet-formations-desc'];
        
        // Deuxième projet - Eau, Hygiène et Assainissement
        projectCards[1].querySelector('h3').textContent = currentTranslations['projet-hygiene-title'];
        projectCards[1].querySelector('p').textContent = currentTranslations['projet-hygiene-desc'];
        
        // Troisième projet - Sensibilisation à la Gestion Environnementale
        projectCards[2].querySelector('h3').textContent = currentTranslations['projet-environnement-title'];
        projectCards[2].querySelector('p').textContent = currentTranslations['projet-environnement-desc'];
        
        // Quatrième projet - Relance Économique
        projectCards[3].querySelector('h3').textContent = currentTranslations['projet-economie-title'];
        projectCards[3].querySelector('p').textContent = currentTranslations['projet-economie-desc'];
        
        // Cinquième projet - Sécurité Alimentaire
        projectCards[4].querySelector('h3').textContent = currentTranslations['projet-alimentation-title'];
        projectCards[4].querySelector('p').textContent = currentTranslations['projet-alimentation-desc'];
        
        // Sixième projet - Protection Civile
        projectCards[5].querySelector('h3').textContent = currentTranslations['projet-protection-title'];
        projectCards[5].querySelector('p').textContent = currentTranslations['projet-protection-desc'];
    }

    // Statuts des projets
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        const text = badge.textContent.toLowerCase();
        if (text.includes('en cours') || text.includes('ongoing')) {
            badge.textContent = currentTranslations['status-en-cours'];
        } else if (text.includes('terminé') || text.includes('completed')) {
            badge.textContent = currentTranslations['status-termine'];
        } else if (text.includes('planifié') || text.includes('planned')) {
            badge.textContent = currentTranslations['status-planifie'];
        }
    });

    // Types d'adhésion
    const joinTypesTitle = document.querySelector('#rejoignez-nous .join-types h3');
    if (joinTypesTitle) {
        joinTypesTitle.textContent = currentTranslations['join-types-title'];
    }

    // Librairies Section
    const librairiesTitle = document.querySelector('.library-section h3');
    if (librairiesTitle) {
        librairiesTitle.textContent = currentTranslations['librairies-title'];
    }

    // Videos Section
    const videosTitle = document.querySelector('.videos-section h3');
    if (videosTitle) {
        videosTitle.textContent = currentTranslations['videos-title'];
    }

    // Vidéos de nos activités réalisées
    const videosActivitiesTitle = document.querySelector('.videos-section h3');
    if (videosActivitiesTitle) {
        videosActivitiesTitle.textContent = currentTranslations['videos-activities'] || 'Vidéos de nos activités réalisées';
    }

    // Gallery Section
    const galleryTitles = document.querySelectorAll('.gallery-section h3');
    if (galleryTitles.length > 0) {
        galleryTitles[0].textContent = currentTranslations['gallery-title'];
    }

    const galleryCompleteTitle = document.querySelector('.gallery-full-section h3');
    if (galleryCompleteTitle) {
        galleryCompleteTitle.textContent = currentTranslations['gallery-complete-title'];
    }

    // Toggle button
    const toggleButton = document.getElementById('toggle-gallery');
    if (toggleButton) {
        if (toggleButton.textContent.includes('plus')) {
            toggleButton.textContent = currentTranslations['gallery-toggle-more'];
        } else {
            toggleButton.textContent = currentTranslations['gallery-toggle-less'];
        }
    }

    // Équipe Section
    const equipeTitle = document.querySelector('#equipe .section-header h2');
    if (equipeTitle) {
        equipeTitle.textContent = currentTranslations['equipe-title'];
    }

    const equipeSubtitle = document.querySelector('#equipe .section-header p');
    if (equipeSubtitle) {
        equipeSubtitle.textContent = currentTranslations['equipe-subtitle-alt'];
    }

    // Membres de l'équipe
    const teamMembers = document.querySelectorAll('.team-member');
    if (teamMembers.length >= 8) {
        // Coordonnateur
        teamMembers[0].querySelector('.member-role').textContent = currentTranslations['member-coordonnateur'];
        teamMembers[0].querySelector('.member-description').textContent = currentTranslations['member-coordonnateur-desc'];
        
        // Coordonnateur Adjoint
        teamMembers[1].querySelector('.member-role').textContent = currentTranslations['member-coordonnateur-adjoint'];
        teamMembers[1].querySelector('.member-description').textContent = currentTranslations['member-coordonnateur-adjoint-desc'];
        
        // Rapporteur Général
        teamMembers[2].querySelector('.member-role').textContent = currentTranslations['member-rapporteur'];
        teamMembers[2].querySelector('.member-description').textContent = currentTranslations['member-rapporteur-desc'];
        
        // Trésorière
        teamMembers[3].querySelector('.member-role').textContent = currentTranslations['member-tresoriere'];
        teamMembers[3].querySelector('.member-description').textContent = currentTranslations['member-tresoriere-desc'];
        
        // Commissaire aux Comptes
        teamMembers[4].querySelector('.member-role').textContent = currentTranslations['member-commissaire'];
        teamMembers[4].querySelector('.member-description').textContent = currentTranslations['member-commissaire-desc'];
        
        // Chargée de Matériels
        teamMembers[5].querySelector('.member-role').textContent = currentTranslations['member-materiels'];
        teamMembers[5].querySelector('.member-description').textContent = currentTranslations['member-materiels-desc'];
        
        // Conseiller Technique
        teamMembers[6].querySelector('.member-role').textContent = currentTranslations['member-conseiller'];
        teamMembers[6].querySelector('.member-description').textContent = currentTranslations['member-conseiller-desc'];
        
        // Coordonnateur Projet
        teamMembers[7].querySelector('.member-role').textContent = currentTranslations['member-projet'];
        teamMembers[7].querySelector('.member-description').textContent = currentTranslations['member-projet-desc'];
    }

    // Contact Section
    const contactTitle = document.querySelector('#contact .section-header h2');
    if (contactTitle) {
        contactTitle.textContent = currentTranslations['contact-title'];
    }

    const contactSubtitle = document.querySelector('#contact .section-header p');
    if (contactSubtitle) {
        contactSubtitle.textContent = currentTranslations['contact-subtitle'];
    }

    // Contact form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        const nameInput = contactForm.querySelector('input[name="name"]');
        if (nameInput) nameInput.placeholder = currentTranslations['contact-form-name'];
        
        const emailInput = contactForm.querySelector('input[name="email"]');
        if (emailInput) emailInput.placeholder = currentTranslations['contact-form-email'];
        
        const subjectInput = contactForm.querySelector('input[name="subject"]');
        if (subjectInput) subjectInput.placeholder = currentTranslations['contact-form-subject'];
        
        const messageTextarea = contactForm.querySelector('textarea[name="message"]');
        if (messageTextarea) messageTextarea.placeholder = currentTranslations['contact-form-message'];
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = currentTranslations['contact-form-submit'];
    }

    // Rejoignez-nous Section
    const joinTitle = document.querySelector('#rejoignez-nous .section-header h2');
    if (joinTitle) {
        joinTitle.textContent = currentTranslations['join-title'];
    }

    const joinDescription = document.querySelector('#rejoignez-nous .section-header p');
    if (joinDescription) {
        joinDescription.textContent = currentTranslations['join-description'];
    }

    // Pourquoi nous rejoindre
    const joinWhyTitle = document.querySelector('#rejoignez-nous .join-why h3');
    if (joinWhyTitle) {
        joinWhyTitle.textContent = currentTranslations['join-why-title'];
    }

    // Cartes "Pourquoi nous rejoindre"
    const whyCards = document.querySelectorAll('#rejoignez-nous .why-card');
    if (whyCards.length >= 4) {
        // Solidarité
        whyCards[0].querySelector('.why-title').textContent = currentTranslations['join-solidarite-title'];
        whyCards[0].querySelector('p').textContent = currentTranslations['join-solidarite-desc'];
        
        // Impact environnemental
        whyCards[1].querySelector('.why-title').textContent = currentTranslations['join-environnement-title'];
        whyCards[1].querySelector('p').textContent = currentTranslations['join-environnement-desc'];
        
        // Formations
        whyCards[2].querySelector('.why-title').textContent = currentTranslations['join-formations-title'];
        whyCards[2].querySelector('p').textContent = currentTranslations['join-formations-desc'];
        
        // Réseaux
        whyCards[3].querySelector('.why-title').textContent = currentTranslations['join-reseaux-title'];
        whyCards[3].querySelector('p').textContent = currentTranslations['join-reseaux-desc'];
    }

    // Cartes des types d'adhésion
    const typeCards = document.querySelectorAll('#rejoignez-nous .type-card');
    if (typeCards.length >= 3) {
        // Membre Actif
        typeCards[0].querySelector('.type-title').textContent = currentTranslations['join-type-active-title'];
        typeCards[0].querySelector('p').textContent = currentTranslations['join-type-active-desc'];
        
        // Membre Sympathisant
        typeCards[1].querySelector('.type-title').textContent = currentTranslations['join-type-sympathisant-title'];
        typeCards[1].querySelector('p').textContent = currentTranslations['join-type-sympathisant-desc'];
        
        // Membre Bénéficiaire
        typeCards[2].querySelector('.type-title').textContent = currentTranslations['join-type-beneficiaire-title'];
        typeCards[2].querySelector('p').textContent = currentTranslations['join-type-beneficiaire-desc'];
    }

    // Formulaire d'adhésion
    const joinFormTitle = document.querySelector('#rejoignez-nous .join-form-section h3');
    if (joinFormTitle) {
        joinFormTitle.textContent = currentTranslations['join-form-title'];
    }

    const joinForm = document.querySelector('#rejoignez-nous .join-form');
    if (joinForm) {
        // Champs du formulaire
        const fullnameInput = joinForm.querySelector('input[name="fullname"]');
        if (fullnameInput) fullnameInput.placeholder = currentTranslations['join-form-name'];
        
        const emailInput = joinForm.querySelector('input[name="email"]');
        if (emailInput) emailInput.placeholder = currentTranslations['join-form-email'];
        
        const phoneInput = joinForm.querySelector('input[name="phone"]');
        if (phoneInput) phoneInput.placeholder = currentTranslations['join-form-phone-placeholder'];
        
        const sexSelect = joinForm.querySelector('select[name="sexe"]');
        if (sexSelect) {
            sexSelect.querySelector('option[value=""]').textContent = currentTranslations['join-form-sex-placeholder'];
            sexSelect.querySelector('option[value="Homme"]').textContent = currentTranslations['join-form-sex-man'];
            sexSelect.querySelector('option[value="Femme"]').textContent = currentTranslations['join-form-sex-woman'];
            sexSelect.querySelector('option[value="Autre"]').textContent = currentTranslations['join-form-sex-other'];
        }
        
        const professionInput = joinForm.querySelector('input[name="profession"]');
        if (professionInput) professionInput.placeholder = currentTranslations['join-form-profession-placeholder'];
        
        const addressInput = joinForm.querySelector('input[name="adresse"]');
        if (addressInput) addressInput.placeholder = currentTranslations['join-form-address-placeholder'];
        
        const adhesionTypeSelect = joinForm.querySelector('select[name="type-adhesion"]');
        if (adhesionTypeSelect) {
            adhesionTypeSelect.querySelector('option[value=""]').textContent = currentTranslations['join-form-adhesion-type-placeholder'];
            adhesionTypeSelect.querySelector('option[value="Membre Actif"]').textContent = currentTranslations['join-form-adhesion-active'];
            adhesionTypeSelect.querySelector('option[value="Membre Sympathisant"]').textContent = currentTranslations['join-form-adhesion-sympathisant'];
            adhesionTypeSelect.querySelector('option[value="Membre Bénéficiaire"]').textContent = currentTranslations['join-form-adhesion-beneficiaire'];
        }
        
        const motivationTextarea = joinForm.querySelector('textarea[name="motivation"]');
        if (motivationTextarea) motivationTextarea.placeholder = currentTranslations['join-form-motivation-placeholder'];
        
        // Labels des centres d'intérêt
        const interestsLabel = joinForm.querySelector('label');
        if (interestsLabel) interestsLabel.textContent = currentTranslations['join-form-interests-label'];
        
        const interestsItems = joinForm.querySelectorAll('.interet-item span');
        if (interestsItems.length >= 5) {
            interestsItems[0].textContent = currentTranslations['join-form-interests-environnement'];
            interestsItems[1].textContent = currentTranslations['join-form-interests-cohesion'];
            interestsItems[2].textContent = currentTranslations['join-form-interests-developpement'];
            interestsItems[3].textContent = currentTranslations['join-form-interests-formation'];
            interestsItems[4].textContent = currentTranslations['join-form-interests-culture'];
        }
        
        const photoLabel = joinForm.querySelector('label[for="photo"]');
        if (photoLabel) photoLabel.textContent = currentTranslations['join-form-photo-label'];
        
        const submitBtn = joinForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = currentTranslations['join-form-submit'];
    }

    // Librairie Section
    const librairieItems = document.querySelectorAll('.library-item');
    if (librairieItems.length >= 2) {
        // Dépliant de Présentation
        librairieItems[0].querySelector('h4').textContent = currentTranslations['librairie-presentation-title'];
        librairieItems[0].querySelector('p').textContent = currentTranslations['librairie-presentation-desc'];
        librairieItems[0].querySelector('.file-name').textContent = currentTranslations['librairie-file-presentation'];
        librairieItems[0].querySelector('.file-size').textContent = currentTranslations['librairie-file-size-presentation'];
        
        // Dépliant de Sensibilisation
        librairieItems[1].querySelector('h4').textContent = currentTranslations['librairie-sensibilisation-title'];
        librairieItems[1].querySelector('p').textContent = currentTranslations['librairie-sensibilisation-desc'];
        librairieItems[1].querySelector('.file-name').textContent = currentTranslations['librairie-file-sensibilisation'];
        librairieItems[1].querySelector('.file-size').textContent = currentTranslations['librairie-file-size-sensibilisation'];
    }

    // Vidéos Section - mise à jour du titre
    if (videosActivitiesTitle) {
        videosActivitiesTitle.textContent = currentTranslations['videos-activities-title'];
    }

    // Footer Section
    const footerDescription = document.querySelector('.footer-section p');
    if (footerDescription) {
        footerDescription.textContent = currentTranslations['footer-description'];
    }

    const footerQuickLinks = document.querySelector('.footer-section h4');
    if (footerQuickLinks) {
        footerQuickLinks.textContent = currentTranslations['footer-quick-links'];
    }

    const footerLinks = document.querySelectorAll('.footer-section ul li a');
    if (footerLinks.length >= 4) {
        footerLinks[0].textContent = currentTranslations['footer-home'];
        footerLinks[1].textContent = currentTranslations['footer-about-link'];
        footerLinks[2].textContent = currentTranslations['footer-missions'];
        footerLinks[3].textContent = currentTranslations['footer-projects'];
    }

    const footerRights = document.querySelector('.footer-bottom p');
    if (footerRights) {
        footerRights.textContent = `© 2025 Association E Mai Oko. ${currentTranslations['footer-rights']}.`;
    }

    // Boutons génériques dans les overlays
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(btn => {
        btn.innerHTML = `<i class="fas fa-eye"></i> ${currentTranslations['btn-view']}`;
    });

    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(btn => {
        btn.innerHTML = `<i class="fas fa-download"></i> ${currentTranslations['btn-download']}`;
    });

    // Modal close button
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.textContent = currentTranslations['btn-close'];
    }

    // Sauvegarder la langue dans le localStorage
    localStorage.setItem('selectedLanguage', language);
}

// Gestion du sélecteur de langue
document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Charger la langue sauvegardée ou utiliser le français par défaut
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    if (savedLanguage !== 'fr') {
        translatePage(savedLanguage);
        // Mettre à jour le drapeau affiché
        const selectedOption = document.querySelector(`[data-lang="${savedLanguage}"]`);
        if (selectedOption) {
            const selectedFlag = selectedOption.querySelector('.flag').textContent;
            document.querySelector('.current-flag').textContent = selectedFlag;
            languageOptions.forEach(opt => opt.classList.remove('selected'));
            selectedOption.classList.add('selected');
        }
    }
    
    if (languageBtn && languageDropdown) {
        // Ouvrir/fermer le dropdown
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
            languageBtn.classList.toggle('active');
        });
        
        // Fermer le dropdown en cliquant ailleurs
        document.addEventListener('click', function() {
            languageDropdown.classList.remove('show');
            languageBtn.classList.remove('active');
        });
        
        // Empêcher la fermeture en cliquant dans le dropdown
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Gérer la sélection de langue
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                const selectedFlag = this.querySelector('.flag').textContent;
                
                // Mettre à jour l'affichage du bouton
                document.querySelector('.current-flag').textContent = selectedFlag;
                
                // Mettre à jour la sélection visuelle
                languageOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Fermer le dropdown
                languageDropdown.classList.remove('show');
                languageBtn.classList.remove('active');
                
                // Traduire la page
                translatePage(selectedLang);
            });
        });
    }
});

// Amélioration de l'accessibilité
document.addEventListener('keydown', (e) => {
    // Fermer le menu mobile avec Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Gestion du focus pour l'accessibilité
document.querySelectorAll('.nav-link, .btn, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #2563eb';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Fonctions pour le modal de visualisation des images
function viewImage(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.style.display = 'block';
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restaurer le scroll du body
    document.body.style.overflow = 'auto';
}

// Fermer le modal en cliquant en dehors de l'image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

