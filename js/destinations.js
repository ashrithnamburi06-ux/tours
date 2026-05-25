(function ($) {
    "use strict";

    async function fetchDestinations() {
        var result = await safeApiList('/destinations');
        if (!result.ok) return [];
        return result.data.filter(function (dest) {
            return !dest.status || dest.status === 'active';
        });
    }

    function renderDestinationCard(dest) {
        var imageUrl = resolveImageUrl(dest.image, 'images/destination-img1.jpg');
        var pkgCount = dest.packageCount || 0;

        return (
            '<div class="swiper-slide">' +
            '<div class="destination-card3">' +
            '<img src="' + imageUrl + '" alt="' + (dest.name || '') + '" style="object-fit: cover; height: 100%;" onerror="this.onerror=null;this.src=\'images/destination-img1.jpg\';">' +
            '<div class="destination-content">' +
            '<h2><a href="destination-details.html?slug=' + dest.slug + '">' + dest.name + '</a></h2>' +
            '<span>' + pkgCount + ' Packages</span>' +
            '</div></div></div>'
        );
    }

    async function initDestinations() {
        var wrap = document.getElementById('dest-list-wrap');
        if (!wrap) return;

        var destinations = await fetchDestinations();
        if (destinations && destinations.length > 0) {
            var swiperElement = document.querySelector('.destionation4-slider');
            if (swiperElement && swiperElement.swiper) {
                swiperElement.swiper.destroy(true, true);
            }

            wrap.innerHTML = destinations.map(renderDestinationCard).join('');

            setTimeout(function () {
                new Swiper(".destionation4-slider", {
                    slidesPerView: 1,
                    speed: 1500,
                    spaceBetween: 25,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: ".destination4-slider-next",
                        prevEl: ".destination4-slider-prev",
                    },
                    breakpoints: {
                        768: { slidesPerView: 2, spaceBetween: 15 },
                        992: { slidesPerView: 2, spaceBetween: 15 },
                        1200: { slidesPerView: 3, spaceBetween: 24 },
                    },
                });
            }, 100);
        }
    }

    $(document).ready(function () {
        initDestinations();
    });
})();
