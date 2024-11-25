// Select the navigation list, sections, and scroll-to-top button
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const scrollToTopButton = document.getElementById('scrollToTop');
const navbar = document.querySelector('.page__header');

// Dynamically build the navigation menu
sections.forEach(section => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.innerHTML = section.dataset.nav; //read-only property of the HTMLElement interface 
    navLink.href = `#${section.id}`;
    navLink.classList.add('menu__link');

    // Smooth scrolling
    navLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        section.scrollIntoView({ behavior: 'smooth' });

        // Update active class manually for navList and section
        sections.forEach(sec =>
            sec.classList.remove('active'));
        section.classList.add('active');

        navbarList.querySelectorAll('.menu__link').forEach(link => {
            link.classList.remove('active');
            link.style.backgroundColor = '';
        });

        navLink.classList.add('active');
        navLink.style.backgroundColor = '#6043ae';
    });

    navItem.appendChild(navLink);
    navbarList.appendChild(navItem);
});

// nav link on scroll
document.addEventListener('scroll', () => {

    // Show or hide scroll-to-top button
    if (window.scrollY > window.innerHeight) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            // Mark this section as active
            section.classList.add('active');

            // Update the navigation link for this section
            const navLink = document.querySelector(`a[href="#${section.id}"]`);
            navLink.classList.add('active');
            navLink.style.backgroundColor = '#6043ae';
        } else {
            // Remove active class from sections and links when not in view
            section.classList.remove('active');
            const navLink = document.querySelector(`a[href="#${section.id}"]`);
            navLink.classList.remove('active');
            navLink.style.backgroundColor = '';
        }
    });
});

// Scroll-to-top button functionality
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hide navbar when not scrolling
let isScrolling;
document.addEventListener('scroll', () => {
    navbar.style.display = 'block'; // Show navbar while scrolling

    clearTimeout(isScrolling); // Clear timeout if user is scrolling
    isScrolling = setTimeout(() => {
        navbar.style.display = 'none'; // Hide navbar after scrolling stops
    }, 5000); // 9 seconds delay
});

// Make sections collapsible
document.addEventListener('DOMContentLoaded', function () {
    sections.forEach(section => {
        const button = section.querySelector('.collapse-button');
        const content = section.querySelector('.collapsible-content');

        // Initially hide part of the content
        content.style.maxHeight = '200px'; // Controls how much content is visible initially
        content.style.overflow = 'hidden';
        content.style.opacity = '0.57';

        button.addEventListener('click', function () {

            if (content.style.maxHeight === '200px') { // Check if it is collapsed
                content.style.maxHeight = `${content.scrollHeight}px`; // Show full content
                content.style.opacity = '1';
                button.textContent = 'Read Less';  // Change button text
            } else {
                content.style.maxHeight = '200px'; // Collapse the content
                content.style.opacity = '0.3';
                button.textContent = 'Read More';  // Change button text
            }
        });
    });
});


//footer
// Dynamically set the current year
document.getElementById('year').textContent = new Date().getFullYear();





