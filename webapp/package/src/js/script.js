
    /**********************************************************************/
    /* Navigation menu                                               */
    /**********************************************************************/
    const navMenu = document.querySelector('.nav__menu');
    const navItems = document.querySelector('.nav ul');

    function checkSize() {
        if (window.getComputedStyle(navMenu, null).getPropertyValue('display') == 'none') {
            navMenu.classList.remove('active');
            navItems.classList.remove('active');
        }
    }
    navMenu.addEventListener('click', function(e) {
        this.classList.toggle('active');
        navItems.classList.toggle('active');
    })
    window.addEventListener('resize', checkSize);

    /**********************************************************************/
    /* Contact Form                                                       */
    /**********************************************************************/
    function _(id) { return document.getElementById(id); }
    function submitForm() {
        _("form-submit").disabled = true;
        _("form-messages").innerHTML = '....';
        var formdata = new FormData();
        formdata.append("n", _("n").value );
        formdata.append("e", _("e").value );
        formdata.append("m", _("m").value );

        var ajax = new XMLHttpRequest();
        ajax.open( "POST", "email_parser.php" );
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                if(ajax.responseText == "success") {
                    _("form-messages").classList.add('active');
                    _("form-messages").innerHTML = "Thanks. I'll get back to you soon.";

                } else {
                    _("form-messages").innderHTML = ajax.responseText;
                    _("form-submit").disabled = false;
                }
            }
        }
        ajax.send( formdata );
    }

    /**********************************************************************/
    /* Smooth Scroll                                                      */
    /**********************************************************************/

    (function() {

     'use strict';

    // Feature Test
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

        // Function to animate the scroll
        var smoothScroll = function (anchor, duration) {

            // Calculate how far and how fast to scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance/(duration/50);
            var stopAnimation;

            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // If scrolling down
            if ( increments >= 0 ) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // If scrolling up
            else {
                // Stop animation when you reach the anchor OR the top of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( travelled <= (endLocation || 0) ) {
                        clearInterval(runAnimation);
                    }
                };
            }

            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 16);

        };

        // Define smooth scroll links
        var scrollToggle = document.querySelectorAll('.scroll');

        // For each smooth scroll link
        [].forEach.call(scrollToggle, function (toggle) {

            // When the smooth scroll link is clicked
            toggle.addEventListener('click', function(e) {

                // Prevent the default link behavior
                e.preventDefault();

                // Get anchor link and calculate distance from the top
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = toggle.getAttribute('data-speed');

                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 550);
                }

            }, false);

        });

    }

 })();
