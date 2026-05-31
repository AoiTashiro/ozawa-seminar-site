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
// モーダルを開く関数
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex'; // 画面に表示する
        document.body.style.overflow = 'hidden'; // 背景をスクロールさせない
    }
}

// モーダルを閉じる関数
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none'; // 非表示にする
        document.body.style.overflow = 'auto'; // 背景のスクロールを戻す
    }
}