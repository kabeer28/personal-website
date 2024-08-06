document.addEventListener('DOMContentLoaded', function() {
    const buttonLinks = document.querySelectorAll('.button-link');
    
    buttonLinks.forEach(buttonLink => {
        buttonLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = buttonLink.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
