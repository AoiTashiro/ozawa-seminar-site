document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1 🔔 モーダルの基本開閉 ＆ 連動処理
    // ==========================================================================
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalWindow = document.querySelector('.modal-window');
    const cards = document.querySelectorAll('.card, .fancy-card');

    const modalTitle = modalOverlay ? modalOverlay.querySelector('.modal-window h2') : null;
    const modalImg = modalOverlay ? modalOverlay.querySelector('.modal-img') : null;

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // 3D反転カード自体や、その中身をクリックした場合はモーダルを開かないようにする
            if (e.target.closest('.flip-card')) return;

            if (!modalOverlay) return;

            const cardTitle = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
            const cardImg = card.querySelector('img');

            if (modalTitle && cardTitle) modalTitle.textContent = cardTitle;

            if (modalImg) {
                if (cardImg && cardImg.src) {
                    modalImg.src = cardImg.src;
                    modalImg.style.display = 'block';
                } else {
                    modalImg.style.display = 'none';
                }
            }

            if (modalWindow) {
                modalWindow.classList.remove('item-discussion', 'item-accounting', 'item-programming', 'item-research');
                if (card.classList.contains('item-discussion')) modalWindow.classList.add('item-discussion');
                if (card.classList.contains('item-accounting')) modalWindow.classList.add('item-accounting');
                if (card.classList.contains('item-programming')) modalWindow.classList.add('item-programming');
                if (card.classList.contains('item-research')) modalWindow.classList.add('item-research');
            }

            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // モーダルが開いた瞬間に、中の流れるアニメーションをリセットして開始
            startFlowingComments();
        });
    });

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
    }

    // ==========================================================================
    // 2 📦 モーダル内専用：意見が左へ自動で流れる仕組み
    // ==========================================================================
    function startFlowingComments() {
        const scrollContainer = document.querySelector('.modal-scroll-container');
        if (!scrollContainer) return;

        // すでにアニメーションが設定されている場合は重複防止のため一度クリア
        scrollContainer.style.animation = 'none';

        // 意見が途切れなくループするように、中身のカードを複製して後ろに結合する処理
        // (まだ複製していなければ実行)
        if (!scrollContainer.classList.contains('cloned')) {
            const children = Array.from(scrollContainer.children);
            children.forEach(child => {
                const clone = child.cloneNode(true);
                scrollContainer.appendChild(clone);
            });
            scrollContainer.classList.add('cloned');
        }

        // 0.05秒後にアニメーションを再始動（CSS側の設定と連動）
        setTimeout(() => {
            scrollContainer.style.display = 'flex';
            scrollContainer.style.width = 'max-content';
            scrollContainer.style.animation = 'flowComments 15s linear infinite';
        }, 50);
    }

    // ==========================================================================
    // 3 🔄 モーダル内専用：タップするとカードがひっくり返る（3D反転）仕組み
    // ==========================================================================
    // モーダル内の「.flip-card」をタップしたときに、ひっくり返るクラスをつけ外しする
    document.addEventListener('click', (e) => {
        const flipCard = e.target.closest('.flip-card');
        if (flipCard) {
            flipCard.classList.toggle('is-flipped');
        }
    });
});