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

    // Inline HTML content
    var headerHTML = `
        <header class="header">
    <div class="row">
        <div class="col-auto px-0">
            <button class="menu-btn btn btn-40 btn-link" type="button">
                <span class="material-icons">menu</span>
            </button>
        </div>
        <div class="text-left col align-self-center">
            <a class="navbar-brand" href="#">
                <h5 class="mb-0">KINASORU</h5>
            </a>
        </div>
        <div class="ml-auto col-auto pl-0">
        <button type="button" class="btn btn-link btn-40 colorsettings">
                        <span class="material-icons">color_lens</span>
                    </button>
            <a href="#" class="menu-btn btn btn-40 btn-link">
                <span class="material-icons">notifications_none</span>
                <span class="counter"></span>
            </a>
            <a href="#" class="avatar avatar-30 shadow-sm rounded-circle ml-2">
                <figure class="m-0 background">
                    <img src="img/user1.png" alt="">
                </figure>
            </a>
        </div>
    </div>
</header>
    `;

    var footerHTML = `
    <div class="footer">
    <div class="row no-gutters justify-content-center">
        <div class="col-auto">
            <a href="index.html" class="active">
                <i class="material-icons">home</i>
                <p>Home</p>
            </a>
        </div>
        <div class="col-auto">
            <a href="#" class="">
                <i class="material-icons">shopping_bag</i>
                <p>Shop</p>
            </a>
        </div>
        <div class="col-auto">
            <a href="#">
                <i class="material-icons">eco</i>
                <p>My Farms</p>
            </a>
        </div>
        <div class="col-auto">
            <a href="#">
                <i class="material-icons">article</i>
                <p>Blog</p>
            </a>
        </div>
        <div class="col-auto">
            <a href="#" class="">
                <i class="material-icons">account_circle</i>
                <p>Profile</p>
            </a>
        </div>
    </div>
</div>
    `;

    var menuHTML = `
    <div class="main-menu">
    <div class="row mb-4 no-gutters">
        <div class="col-auto"><button class="btn btn-link btn-40 btn-close text-white"><span class="material-icons">chevron_left</span></button></div>
        <div class="col-auto">
            <div class="avatar avatar-40 rounded-circle position-relative">
                <figure class="background">
                    <img src="img/user1.png" alt="">
                </figure>
            </div>
        </div>
        <div class="col pl-3 text-left align-self-center">
            <h6 class="mb-1">Aman Ng'oma</h6>
            <p class="small text-default-secondary">Dodoma, TZ</p>
        </div>
    </div>
    <div class="menu-container">
        <div class="row mb-4">
            <div class="col">
                <h4 class="mb-1 font-weight-normal">Tsh 780,000</h4>
                <p class="text-default-secondary">My Balance</p>
            </div>
            <div class="col-auto">
                <button class="btn btn-default btn-40 rounded-circle" data-toggle="modal" data-target="#addmoney"><i class="material-icons">add</i></button>
            </div>
        </div>

        <ul class="nav nav-pills flex-column ">
            <li class="nav-item">
                <a class="nav-link active" href="index.html">
                    <div>
                        <span class="material-icons icon">account_balance</span>
                        Home
                    </div>
                    <span class="arrow material-icons">chevron_right</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div>
                        <span class="material-icons icon">perm_contact_calendar</span>
                        Refer Friends
                    </div>
                    <span class="arrow material-icons">chevron_right</span>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div>
                        <span class="material-icons icon">shopping_bag</span>
                        My Orders
                    </div>
                    <span class="arrow material-icons">chevron_right</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div>
                        <span class="material-icons icon">account_tree</span>
                        My Farms
                    </div>
                    <span class="arrow material-icons">chevron_right</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div>
                        <span class="material-icons icon">article</span>
                        Blog
                    </div>
                    <span class="arrow material-icons">chevron_right</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div>
                        <span class="material-icons icon">settings</span>
                        Settings
                    </div>
                    <span class="arrow material-icons">chevron_right</span>
                </a>
            </li>

        </ul>
        <div class="text-center">
            <a href="#" class="btn btn-outline-danger text-white rounded my-3 mx-auto">Sign out</a>
        </div>
    </div>
</div>
<div class="backdrop"></div>
    `;

    // Load inline content
    $('#header-container').html(headerHTML);
    $('#footer-container').html(footerHTML);
    $('#menu-container').html(menuHTML);

    // Setup component functionality
    setupComponentFunctionality('menu-container');
    setupComponentFunctionality('header-container');


function setupComponentFunctionality(componentId) {
    if (componentId === 'menu-container') {
        setupMenuFunctionality();
    } else if (componentId === 'header-container') {
        setupHeaderFunctionality();
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
            $(this).toggleClass('active');
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