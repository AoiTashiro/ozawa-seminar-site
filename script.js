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
// ======= 🖼️ 2年次春季活動：自動スライドショーコントロール（6枚版） =======
(function () {
    const container = document.getElementById('springSlideContainer');
    const wrapper = document.getElementById('springSliderWrapper');
    const dots = document.querySelectorAll('#springSliderNav .nav-dot');
    const modal2 = document.getElementById('modal2');

    if (!container || !wrapper || dots.length === 0 || !modal2) return;

    let currentIndex = 0;
    const totalSlides = dots.length; // 自動的に6枚としてカウントされます
    let slideInterval = null;
    const intervalTime = 2500; // 2.5秒ごとに次のスライドへ

    function goToSlide(index) {
        currentIndex = index;
        const slideWidth = container.clientWidth;
        container.scrollTo({
            left: slideWidth * currentIndex,
            behavior: 'smooth'
        });

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0; // 6枚目の次は1枚目に戻る
        }
        goToSlide(nextIndex);
    }

    function startSlide() {
        if (window.getComputedStyle(modal2).display === 'none') return;
        if (!slideInterval) {
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }

    function stopSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // マウスやスマホ操作時のホバーイベント
    wrapper.addEventListener('mouseenter', stopSlide);
    wrapper.addEventListener('mouseleave', startSlide);
    wrapper.addEventListener('touchstart', stopSlide);
    wrapper.addEventListener('touchend', startSlide);

    // モーダル開閉の監視
    const observer = new MutationObserver(() => {
        if (window.getComputedStyle(modal2).display !== 'none') {
            setTimeout(() => {
                goToSlide(0);
                startSlide();
            }, 300);
        } else {
            stopSlide();
        }
    });

    observer.observe(modal2, { attributes: true, attributeFilter: ['style', 'class'] });

    window.addEventListener('resize', () => {
        goToSlide(currentIndex);
    });
})();