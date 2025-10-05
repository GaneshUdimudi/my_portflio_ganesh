$(document).ready(function() {

    particlesJS.load('particles-js', 'assets/particles.json');

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    const formIsActive = true;

    $('#menu').click(function() {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    new Typed('.typing-text', {
        strings: ['an AI & ML Enthusiast', 'a Frontend Developer', 'a Problem Solver'],
        loop: true,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 800,
    });

    fetch('skills.json')
        .then(response => response.json())
        .then(data => {
            let skillsContainer = document.getElementById('skillsContainer');
            let skillsHTML = '';
            data.forEach((skill, index) => {
                skillsHTML += `
                <div class="skill-box" style="animation-delay: ${index * 0.1}s;">
                    <i class="${skill.icon}"></i>
                    <h3>${skill.name}</h3>
                </div>`;
            });
            skillsContainer.innerHTML = skillsHTML;
        });

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            let projectsContainer = document.getElementById('projectsContainer');
            let projectsHTML = '';
            data.forEach(project => {
                projectsHTML += `
                <div class="box tilt">
                    <img draggable="false" src="${project.image}" alt="${project.name}">
                    <div class="content">
                        <h3>${project.name}</h3>
                        <p>${project.desc}</p>
                        <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>`;
            });
            projectsContainer.innerHTML = projectsHTML;
            VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 20 });
        });

    sr.reveal('.home .content, .heading', {});
    sr.reveal('.home .image, .about .image, .contact .image-box', { origin: 'bottom' });
    sr.reveal('.about .content, .contact .content', { origin: 'left' });
    sr.reveal('.skill-box, .education .box, .work .box, .experience .container', { interval: 200 });
    
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();

        if (!formIsActive) {
            alert('Sorry, the contact form is temporarily disabled.');
            return;
        }

        const submitBtn = $('#submit-btn');
        const formStatus = $('#form-status');

        const emailInput = $('input[name="email"]').val().toLowerCase();
        if (!emailInput.endsWith('@gmail.com')) {
            formStatus.text('Error: You must use a valid Gmail address.').removeClass('success').addClass('error');
            return;
        }
        
        const messageInput = $('textarea[name="message"]').val();
        if (messageInput.trim().length < 10) {
            formStatus.text('Error: Please provide a more detailed message.').removeClass('success').addClass('error');
            return;
        }
        
        if ($('input[name="honeypot"]').val()) {
            console.log('Spam detected, submission blocked.');
            return;
        }

        submitBtn.prop('disabled', true);
        submitBtn.html('Submitting... <i class="fa fa-spinner fa-spin"></i>');
        formStatus.hide();

        const serviceID = 'service_oh3joh5';
        const templateID = 'template_ypheq3y';
        const userID = 'D3DDimSSBLWBNSN_T';

        emailjs.sendForm(serviceID, templateID, this, userID)
            .then(() => {
                $('#contact-form')[0].reset();
                formStatus.text('Message sent successfully!').removeClass('error').addClass('success');
            }, (err) => {
                formStatus.text('Failed to send message. Please try again later.').removeClass('success').addClass('error');
            })
            .finally(() => {
                submitBtn.prop('disabled', false);
                submitBtn.html('Submit <i class="fa fa-paper-plane"></i>');
            });
    });

    $(window).on('scroll load', function() {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 60) {
            $('header').addClass('header-active');
        } else {
            $('header').removeClass('header-active');
        }
        
        if ($(window).scrollTop() > 200) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        $('section').each(function() {
            let top = $(window).scrollTop();
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });
});