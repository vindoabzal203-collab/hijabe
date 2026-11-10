// GANTI FOTO UTAMA SAAT FOTO KECIL DIKLIK
document.querySelectorAll(".product-card").forEach(function(card) {
    const fotoUtama = card.querySelector(":scope > img");
    const fotoKecil = card.querySelectorAll(".product-gallery img");

    fotoKecil.forEach(function(foto) {
        foto.addEventListener("click", function() {
            fotoUtama.src = foto.src;
        });
    });
});

// SMOOTH SCROLL MOBILE DAN DESKTOP
let scrollFrame = null;

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        if (scrollFrame !== null) {
            cancelAnimationFrame(scrollFrame);
        }

        const startY = window.scrollY;
        const header = document.querySelector("header");
        const offset = header ? header.offsetHeight : 0;

        const endY = Math.max(
            0,
            target.getBoundingClientRect().top + startY - offset
        );

        const distance = endY - startY;
        const duration = 1800;
        const startTime = performance.now();

        /** @param {number} now */
        function animate(now) {
            const progress = Math.min(
                (now - startTime) / duration, 1
            );

            window.scrollTo(
                0,
                startY + distance * progress
            );

            if (progress < 1) {
                scrollFrame = requestAnimationFrame(animate);
            } else {
                scrollFrame = null;
            }
        }

        scrollFrame = requestAnimationFrame(animate);
    });
});