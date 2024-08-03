'use strict'
$(document).ready(function () {
    var body = $('body');
    var mainmenu = $('.main-menu');

    /* page load as iframe */
    if (self !== top) {
        body.addClass('iframe');
    } else {
        body.removeClass('iframe');
    }

    function loadComponent(componentId, filePath) {
        // Check if we're running locally
        if (window.location.protocol === 'file:') {
            // If running locally, use synchronous XMLHttpRequest
            var xhr = new XMLHttpRequest();
            xhr.open('GET', filePath, false);
            xhr.send();
            if (xhr.status === 200) {
                $('#' + componentId).html(xhr.responseText);
                if (componentId === 'menu-container') {
                    setupMenuFunctionality();
                } else if (componentId === 'header-container') {
                    setupHeaderFunctionality();
                }
            } else {
                console.error('Failed to load ' + filePath);
            }
        } else {
            // If running on a server, use the original AJAX method
            $.get(filePath, function(data) {
                $('#' + componentId).html(data);
                if (componentId === 'menu-container') {
                    setupMenuFunctionality();
                } else if (componentId === 'header-container') {
                    setupHeaderFunctionality();
                }
            });
        }
        
        // Force re-calculation
        setTimeout(function() { 
            $('.background').each(function () {
                var imgpath = $(this).find('img');
                $(this).css('background-image', 'url(' + imgpath.attr('src') + ')');
                imgpath.hide();
            });
        }, 10); // A small timeout is enough
    }
    
    // Load Header
    loadComponent('header-container', 'header.html');
    
    // Load Footer
    loadComponent('footer-container', 'footer.html');
    
    // Load menu
    loadComponent('menu-container', 'menu.html');

    function setupMenuFunctionality() {
        /* menu open close */
        $(document).on('click', '.main-menu .btn-close', function () {
            if (body.hasClass('menu-overlay') === true) {
                body.removeClass('menu-open');
            } else {
                body.removeClass('menu-active');
                body.removeClass('menu-open');
                $('html').removeClass('menu-open');
            }
            return false;
        });

        $(document).on('click', '.menu-btn', function () {
            if (body.hasClass('menu-overlay') === true) {
                body.addClass('menu-open');
            } else {
                body.addClass('menu-active');
                body.addClass('menu-open');
                $('html').addClass('menu-open');
            }
            return false;
        });

        $(document).on('click', '.main-menu + .backdrop', function (e) {
            if (body.hasClass('menu-open') === true) {
                body.removeClass('menu-open');
            }
            return false;
        });

        /* menu style switch */
        $(document).on('change', '#menu-pushcontent', function () {
            if ($(this).is(':checked') === true) {
                body.addClass('menu-push-content');
                mainmenu.css('display', 'block');
                body.removeClass('menu-overlay');
            }
            return false;
        });

        $(document).on('change', '#menu-overlay', function () {
            if ($(this).is(':checked') === true) {
                body.removeClass('menu-push-content');
                mainmenu.css('display', 'block');
                body.addClass('menu-overlay');
            }
            return false;
        });
    }

    function setupHeaderFunctionality() {
        /* color settings */
        $(document).on('click', '.color-picker .btn', function () {
            $('.color-picker').toggleClass('active');
            return false;
        });

        $(document).on('click', '.theme-color', function () {
            var style = $(this).attr('data-color');
            $(':root').attr('data-theme', style);
            return false;
        });

        $(document).on('click', '.dark-mode-switch', function () {
            $('body').toggleClass('dark-mode');
            return false;
        });
    }

    /* floating input text fields */
    $('.floating-input').each(function () {
        if (!$(this).val() || $(this).val().length === 0) {
            //$(this).parent().removeClass('active')
        } else {
            $(this).parent().addClass('active')
        }
    })
    $('.floating-input').on('blur', function () {
        if (!$(this).val() || $(this).val().length === 0) {
            $(this).parent().removeClass('active')
        } else {
            $(this).parent().addClass('active')
        }
        return false;
    });

    /* back page navigation */
    $('.back-btn').on('click', function () {
        window.history.back();
        return false;
    });

    /* float label checking input is not empty */
    $('.float-label .form-control').on('blur', function () {
        if ($(this).val() || $(this).val().length != 0) {
            $(this).closest('.float-label').addClass('active');
        } else {
            $(this).closest('.float-label').removeClass('active');
        }
        return false;
    })
});

$(window).on('load', function () {
    setTimeout(function () {
        $('.loader-display').fadeOut('slow');
    }, 500);

    /* Background */
    $('.background').each(function () {
        var imgpath = $(this).find('img');
        $(this).css('background-image', 'url(' + imgpath.attr('src') + ')');
        imgpath.hide();
    })

    /* url path on menu */
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $('.main-menu ul a').each(function () {
        if (this.href === path) {
            $('.main-menu ul a').removeClass('active');
            $(this).addClass('active');
        }
    });
});

$(window).on('scroll', function () {
    /* scroll from top and add class */
    if ($(document).scrollTop() > '10') {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }
});

$(window).on('resize', function () {
    // Add any resize-specific functionality here
});