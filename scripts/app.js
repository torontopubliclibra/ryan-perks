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
        scrollTopButton: $("footer .button"),
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
            // if the direction is anything else, set the location to the top of that section
            } else {
                location = app.elements[direction].offset().top;
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
    },

    // app event listeners
    events: () => {

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

    },
    
    // app initializion
    init: () => {

        // add the event listeners
        app.events();
    },
};

// initialize the app
$(document).ready(() => {
    app.init();
});