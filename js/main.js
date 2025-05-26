
// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            
            // Scroll to the target section smoothly
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close the mobile menu if it's open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Add active class to navigation items when scrolling
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav item
                const currentNavItem = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);
                if (currentNavItem) {
                    currentNavItem.classList.add('active');
                }
            }
        });

        // Change navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (scrollPosition > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animate skill bars when they come into view
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Initial check for skill section in viewport
    function checkSkills() {
        if (isInViewport(skillSection)) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            // Remove the scroll event listener after animation
            window.removeEventListener('scroll', checkSkills);
        }
    }
    
    // Add scroll event listener for skill animation
    window.addEventListener('scroll', checkSkills);
    // Check on initial load as well
    checkSkills();
    
    // Portfolio item hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        const info = item.querySelector('.portfolio-info');
        
        item.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            info.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            info.style.transform = 'translateY(20px)';
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            this.reset();
        });
    }
});