$(document).ready(function () {
    // IMAGE BACKGROUND SLIDE SHOW
    $.vegas('slideshow', {
        backgrounds: [
            {
                src: 'img/1.jpg',
                fade: 1000,
                delay: 50000
        },
            {
                src: 'img/2.jpg',
                fade: 1000,
                delay: 50000
        },
            {
                src: 'img/3.jpg',
                fade: 1000,
                delay: 50000
        }
    ]
    })('overlay', {
        /** SLIDESHOW OVERLAY IMAGE **/
        src: 'assets/js/vegas/overlays/13.png'
    });
    // OUR WORK - IMAGE EFFECTS
    $('.fancybox-media').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });
    $(window).load(function () {
        var $container = $('#work-div');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.caegories a').click(function () {
            $('.caegories .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    });
});
new WOW().init();
