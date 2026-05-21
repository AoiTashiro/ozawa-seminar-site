// スライダーを動かすための設定
const swiper = new Swiper('.mySwiper', {
    loop: false,
    spaceBetween: 24,

    // 矢印ボタンの設定
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 画面サイズごとの枚数設定
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        650: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});