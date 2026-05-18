const swiper = new Swiper('.mySwiper', {
  // ループさせるか（最後のカードのあとに最初に戻るか）
  loop: false,

  // カード同士の隙間（px）
  spaceBetween: 20,

  // 左右のナビゲーションボタンを有効化
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // レスポンシブ表示の設定（画面幅に応じた表示枚数）
  breakpoints: {
    // 0px以上（スマホ）のときは1枚表示
    0: {
      slidesPerView: 1,
    },
    // 600px以上（タブレット）のときは2枚表示
    600: {
      slidesPerView: 2,
    },
    // 1024px以上（PC）のときは3枚表示
    1024: {
      slidesPerView: 3,
    }
  }
});