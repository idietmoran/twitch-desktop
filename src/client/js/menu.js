// menu.js
window.$ = window.jQuery = require('./lib/jquery/dist/jquery.min.js');
$(document).ready(() => {
    // TILE
    $('.tile').on('click', () => {
        if($('.default').hasClass("hidden")) {
            $('.default').removeClass("hidden");
        } else {
            $('.default').addClass('hidden');
        }
    });
    // MOUSEOVER
    let mouseOver = {
        featured: false,
        channels: false,
        games: false,
        following: false,
        dashboard: false,
        options: false
    };
    // MENU ACTIVE
    let menuButtons = [
        'featured',
        'channels',
        'games',
        'following',
        'dashboard',
        'options'
    ];
    // MENU FEATURED
    $('#menu-featured').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $(this).addClass('menu-active');
    });
    // MENU CHANNELS
    $('#menu-channels').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $(this).addClass('menu-active');
    });
    // MENU GAMES
    $('#menu-games').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $(this).addClass('menu-active');
    });
    // MENU DASHBOARD
    $('#menu-dashboard').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $(this).addClass('menu-active');
    });
    // OPTIONS
    $('#menu-options').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $(this).addClass('menu-active');
    });
    // SEARCH
    let searchOpen = false;
    $('#menu-search').on('click', event => {
        event.stopPropagation();
        if($('#search-box').hasClass('hidden')) {
            searchOpen = true;
            $('#search-box').removeClass('hidden');
        } else {
            searchOpen = false;
            $('#search-box').addClass('hidden');
        }
    });
    // SEARCH
    $("#search-box").on('click', event => {
        event.stopPropagation();
    });


    // CLOSE MENUS
    $(window).on('click', () => {
        if(searchOpen) {
            $('#search-box').addClass('hidden');
        }
    });



    // TILES
        // FEATURED
    $('#tile-featured').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $("#menu-featured").addClass('menu-active');
    });
    // CHANNELS
    $('#tile-channels').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $("#menu-channels").addClass('menu-active');
    });
    //GAMES
    $('#tile-games').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $("#menu-games").addClass('menu-active');
    });
    // DASHBOARD
    $('#tile-dashboard').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $("#menu-dashboard").addClass('menu-active');
    });
    // OPTIONS
    $('#tile-options').on('click', () => {
        for(let button of menuButtons) {
            $(`#menu-${button}`).removeClass('menu-active');
        }
        $("#menu-options").addClass('menu-active');
    });

    // COMING SOON
    function dispCS() {
        for(let i in mouseOver) {
            if(mouseOver[i]) {
                $(`#cs-${i}`).removeClass('hidden');
            }
        }
    }

    $('#menu-following').on('mouseover', () => {
        mouseOver.following = true;
        setTimeout(function() {
            dispCS();
        }, 700);
    });

    $('#menu-following').on('mouseleave', () => {
        mouseOver.following = false;
        $('#cs-following').addClass('hidden');
    });

});
