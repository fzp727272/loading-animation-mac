var $ = require('jquery');
var animationControl = require('./animation-control.js');


//mac样式报错时间
var error = false;
setTimeout(() => {
    error = true
}, 6000);


(function() {
    'use strict';


    //macbook开合动画
    $(document).ready(function() {
        const $macbook = $('.js-macbook');

        function open() {
            $macbook.addClass('macbook--shown')

            setTimeout(() => {
                $macbook.addClass('macbook--display-open');
            }, 150);

            setTimeout(() => {
                $macbook.addClass('macbook--show-app');
            }, 400);
        };

        function close() {
            $macbook.removeClass('macbook--shown macbook--display-open macbook--show-app');
        }

        setTimeout(() => {
            open();
        }, 250);
    })

    //macbook进度条执行动画
    $(document).ready(function() {
        var timer = 0;
        var percentageWidth = $('#progressBar').outerWidth() / 100;

        function timerRun() {
            $('#progressBar .progress-bar').css("width", timer + "%").attr("aria-valuenow", timer);

            $('#progressBar .progress-number').css("-webkit-transform", "translateX(" + percentageWidth * timer + "px)").attr("aria-valuenow", timer);
            if (!error) {

                if (timer >= 100) {
                    // close()
                    $('#progressBar .progress-bar').css("width", "100%");
                    $('#loadBtn').html("Done");
                    return;
                }
                timer++;
                setTimeout(function() {
                    timerRun()
                }, 200);
            } else {
                //loading失败样式设定
                $(".maskbottom").css({
                    "animation": 'none'
                });
                // $(".progress-bar").css({
                //     background: redColor
                // })
                $(".progress").fadeOut(300);
                $(".loadingbar-container-1").fadeOut(200);
                $(".loadingbar-container-2").fadeOut(200);
                $(".progress-number").fadeOut(200);
                $(".text-center").eq(0).fadeOut(200).html("审核失败,请重新刷新").fadeIn(200).addClass("wordingChange");
                $(".ERROR").fadeIn(200).addClass("Error-animation")
            }
        }



        $(this).html("loading");
        timerRun();

    });


    //星系执行动画
    $(document).ready(function() {

        for (var i = 0; i < 20; i++) {
            var radius = (rnd(1600, 3400) / 15);
            var modifier = radius / 160;
            $(".loader").append("<div class=\"spinner\" style=\" height: " + radius + "px; animation-delay: -" + (rnd(40, 80) / 10) + "s\"></div>");
        }


        var loaded = 0;

        function loader() {
            if (rnd(0, 1) == 1) {
                loaded++;
                var $ele = $(".spinner:nth-child(" + Math.floor(loaded / 5) + ")");
                $ele.css({
                    height: "0px",


                })
                // $ele.animate({
                //     height: "0px"
                // }, 1000)
                setTimeout(function() {
                    $ele.css({
                        animation: "none"
                    })
                }, 1000)

                $(".loaded").css("width", (loaded + "%"));
            }
            if (loader >= 100) {
                clearInterval(runloader);


                $(".spinner:nth-child(" + Math.floor(loaded / 5) + ")").css({
                    "height": "0px",

                });
                $(".loaded").css("width", (loaded + "%"));

            }
        }
        var runloader = setInterval(loader, 50);

        function rnd(m, n) {
            m = parseInt(m);
            n = parseInt(n);
            return Math.floor(Math.random() * (n - m + 1)) + m;
        }
    })


    //添加swipe滑动
    $(document).ready(function() {
        // var bgMusic = $('audio').get(0);
        // var $btnMusic = $('.btn-music');
        var $upArrow = $('.up-arrow');

        // background music control
        // $btnMusic.click(function() {
        //     if (bgMusic.paused) {
        //         bgMusic.play();
        //         $(this).removeClass('paused');
        //     } else {
        //         bgMusic.pause();
        //         $(this).addClass('paused');
        //     }
        // });

        new Swiper('.swiper-container', {
            mousewheelControl: true,
            effect: 'coverflow', // slide, fade, coverflow or flip
            speed: 400,
            direction: 'vertical',
            fade: {
                crossFade: false
            },
            coverflow: {
                rotate: 100,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: false // do disable shadows for better performance
            },
            flip: {
                limitRotation: true,
                slideShadows: false // do disable shadows for better performance
            },
            onInit: function(swiper) {
                animationControl.initAnimationItems(); // get items ready for animations
                animationControl.playAnimation(swiper); // play animations of the first slide
            },
            onTransitionStart: function(swiper) { // on the last slide, hide .btn-swipe
                if (swiper.activeIndex === swiper.slides.length - 1) {
                    $upArrow.hide();
                } else {
                    $upArrow.show();
                }
            },
            onTransitionEnd: function(swiper) { // play animations of the current slide
                animationControl.playAnimation(swiper);
            },
            onTouchStart: function(swiper, event) { // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
                // if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                //     bgMusic.play();
                // }
            }
        });

        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp();
    });
})();