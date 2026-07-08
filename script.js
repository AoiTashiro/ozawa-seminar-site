// ==========================================
// 1. モーダルの開閉管理（個別ID対応）
// ==========================================

// モーダルを開く関数
function openModal(modalId) {
    // 念のため、すべてのモーダルを一度非表示にする
    const allModals = document.querySelectorAll('.modal-overlay');
    allModals.forEach(modal => {
        modal.style.display = 'none';
    });

    // 引数で渡されたID（modal1〜modal4）のモーダルだけをピンポイントで表示
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = 'flex';
    }
}

// モーダルを閉じる関数
function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = 'none';
    }
}


// ==========================================
// 2. モーダル2専用：自動・手動スライドショー
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("springSlideContainer");
    const dots = document.querySelectorAll("#springSliderNav .nav-dot");

    // スライドショーの要素が存在する場合のみ処理を実行（エラー防止）
    if (!container || dots.length === 0) return;

    let currentIndex = 0;
    const totalSlides = dots.length;
    let autoSlideInterval;

    function updateDots(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    function scrollToSlide(index) {
        const slideWidth = container.clientWidth;
        container.scrollTo({
            left: slideWidth * index,
            behavior: "smooth"
        });
        updateDots(index);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            scrollToSlide(currentIndex);
        }, 3500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // 手動スクロール（スワイプ）連動
    container.addEventListener("scroll", () => {
        const slideWidth = container.clientWidth;
        const newIndex = Math.round(container.scrollLeft / slideWidth);
        if (newIndex !== currentIndex && newIndex < totalSlides) {
            currentIndex = newIndex;
            updateDots(currentIndex);
        }
    });

    // 操作時の自動スライド一時停止・再開
    container.addEventListener("touchstart", stopAutoSlide);
    container.addEventListener("touchend", startAutoSlide);
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);

    // ドットクリック連動
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopAutoSlide();
            currentIndex = index;
            scrollToSlide(currentIndex);
            startAutoSlide();
        });
    });

    // 自動スライド開始
    startAutoSlide();
});