// app object
let app = {

    // page elements
    elements: {
        about: $("#about"),
        services: $("#services"),
        testimonials: $("#testimonials"),
        contact: $("#contact"),
        aboutLink: $("nav .about"),
        servicesLink: $("nav .services"),
        testimonialsLink: $("nav .testimonials"),
        contactLink: $("nav .contact"),
        contactTextLinks: document.querySelectorAll(".contact-text-link"),
        scrollTopButton: $("footer .button"),
    },

    slider: {
        sliderContainer: document.querySelector("#testimonial-slider"),
        slides: document.querySelectorAll(".slide"),
        nextButton: $(".next-slide"),
        prevButton: $(".prev-slide"),
        slideCounter: $(".slide-counter small"),
        counterText: '',
        currentSlide: 1,
        maxSlide: 1
    },

    // app functions
    functions: {

        // smoothly scroll to location
        scroll: (direction) => {

            // establish an empty variable
            let location = "";

            // if the direction is "top", set the location to the top of the page
            if (direction === "top") {
                location = 0;
                history.pushState(null, null, ' ');
            // if the direction is anything else, set the location to the top of that section
            } else {
                location = app.elements[direction].offset().top;
                setTimeout(() => {
                    history.pushState(null, null, `#${direction}`);
                }, 300);
            };

            // smoothly scroll to the location
            window.scrollTo({top: location, behavior: "smooth"});

            // blur the button after scroll
            document.activeElement.blur();
        },

        // keyboard support for scroll
        scrollTopOnEnter: (keyCode) => {

            // store the codes for both the key pressed and the enter key
            let key = keyCode;
            let enter = 13;

            // if a key is pressed but it is not the enter key, behave normally
            if (key && (key !== enter)) {
                return;
            // if a key is pressed and it is the enter key, scroll to the top of the page
            } else {
                app.scrollTop();
            };
        },

        // testimonial slider next button function
        nextSlideFunction: () => {

            // if the current slide is the last
            if (app.slider.currentSlide === app.slider.maxSlide) {

                // change it to the first slide
                app.slider.currentSlide = 1;

            } else {

                // otherwise move forward one slide
                app.slider.currentSlide++;
            }

            // loop through slides
            app.slider.slides.forEach((slide, index) => {

                // move them all forward by one slide
                slide.style.transform = `translateX(${105 * (index - (app.slider.currentSlide - 1))}%)`;

                // correct the height of the slider to match the currentSlide
                if ((index) === (app.slider.currentSlide - 1)) {
                    const slideHeight = slide.offsetHeight;
                    app.slider.sliderContainer.style.height = `${slideHeight}px`;
                }

            });

            if (window.screenTop !== app.elements.testimonials.offset().top) {
                window.scrollTo({top: app.elements.testimonials.offset().top, behavior: "smooth"});
            }

            app.slider.counterText = `${app.slider.currentSlide} / ${app.slider.maxSlide}`;
            app.slider.slideCounter.text(app.slider.counterText);

        },

        // testimonial slider prev button function
        prevSlideFunction: () => {

            // if the current slide is the first
            if (app.slider.currentSlide === 1) {

                // change it to the last slide
                app.slider.currentSlide = app.slider.maxSlide;

            } else {

                // otherwise move back one slide
                app.slider.currentSlide--;
            }

            // loop through slides
            app.slider.slides.forEach((slide, index) => {

                // move them all back by one slide
                slide.style.transform = `translateX(${105 * (index - (app.slider.currentSlide - 1))}%)`;

                // correct the height of the slider to match the currentSlide
                if ((index) === (app.slider.currentSlide - 1)) {
                    const slideHeight = slide.offsetHeight;
                    app.slider.sliderContainer.style.height = `${slideHeight}px`;
                }

            });

            if (window.screenTop !== app.elements.testimonials.offset().top) {
                window.scrollTo({top: app.elements.testimonials.offset().top, behavior: "smooth"});
            }

            app.slider.counterText = `${app.slider.currentSlide} / ${app.slider.maxSlide}`;
            app.slider.slideCounter.text(app.slider.counterText);

        },
    },

    // app event listeners
    events: () => {

        // watch the screen width and console log when it changes
        window.addEventListener('resize', () => {
            const slideHeight = app.slider.slides[app.slider.currentSlide - 1].offsetHeight;
            app.slider.sliderContainer.style.height = `${slideHeight}px`;
        });

        // scroll up to top of browser window on button click
        app.elements.scrollTopButton.click((e) => {
            e.preventDefault();
            app.functions.scroll("top");
        });

        // scroll to top of sections on nav link click
        app.elements.aboutLink.click((e) => {
            e.preventDefault();
            app.functions.scroll("about");
        });
        app.elements.servicesLink.click((e) => {
            e.preventDefault();
            app.functions.scroll("services");
        });
        app.elements.testimonialsLink.click((e) => {
            e.preventDefault();
            app.functions.scroll("testimonials");
        });
        app.elements.contactLink.click((e) => {
            e.preventDefault();
            app.functions.scroll("contact");
        });
        app.elements.contactTextLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                app.functions.scroll("contact");
            });
        });

        // navigate slider on click
        app.slider.nextButton.click(() => {
            app.functions.nextSlideFunction();
        });
        app.slider.prevButton.click(() => {
            app.functions.prevSlideFunction();
        });

    },
    
    // app initializion
    init: () => {

        // add the event listeners
        app.events();

        // reset the slider
        app.slider.currentSlide = 1;
        app.slider.maxSlide = app.slider.slides.length;
        app.slider.counterText = `${app.slider.currentSlide} / ${app.slider.maxSlide}`;
        app.slider.slideCounter.text(app.slider.counterText);

        // loop through the slides
        app.slider.slides.forEach((slide, index) => {

            // place the slides end to end
            slide.style.transform = `translateX(${index * 105}%)`;
        
            // once images have loaded, display them on the page
            slide.style.display = `block`;

            // correct the height of the slider to match the currentSlide
            if ((index) === app.slider.currentSlide - 1) {
                const slideHeight = slide.offsetHeight;
                app.slider.sliderContainer.style.height = `${slideHeight}px`;
            }
        });
    },
};

// initialize the app
$(document).ready(() => {
    app.init();
});