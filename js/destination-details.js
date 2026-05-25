(function ($) {
    "use strict";

    function getSlugFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('slug');
    }

    async function fetchDestinationDetails(slug) {
        var result = await safeApiItem('/destinations/' + encodeURIComponent(slug));
        return result.ok ? result.data : null;
    }

    async function fetchRelatedPackages(destId, destName) {
        var result = await safeApiList('/packages');
        if (!result.ok) return [];
        return result.data.filter(function (pkg) {
            if (!pkg.status || pkg.status === 'active') {
                var d = pkg.destination;
                if (!d) return false;
                if (typeof d === 'object') {
                    return (
                        (destId && String(d._id) === String(destId)) ||
                        (destName && refName(d).toLowerCase() === destName.toLowerCase())
                    );
                }
                return destName && String(d).toLowerCase() === destName.toLowerCase();
            }
            return false;
        });
    }

    function renderRelatedPackages(packages) {
        const wrap = document.getElementById('dest-related-packages-slider');
        if (!wrap) return;

        if (!packages || packages.length === 0) {
            wrap.parentElement.parentElement.parentElement.style.display = 'none';
            return;
        }

        const swiperElement = wrap.closest('.swiper');
        if (swiperElement && swiperElement.swiper) {
            swiperElement.swiper.destroy(true, true);
        }

        wrap.innerHTML = packages.map(pkg => {
            const imageUrl = resolveImageUrl(pkg.images, 'images/package-card-img1.jpg');
            const price = pkg.price || (pkg.pricing && pkg.pricing.adult) || 0;
            const destSlug = typeof pkg.destination === 'object' && pkg.destination.slug
                ? pkg.destination.slug
                : '';
            const destLabel = refName(pkg.destination) || 'Destination';
            return `
                <div class="swiper-slide">
                    <div class="package-card2">
                        <div class="package-img-wrap">
                            <img src="${imageUrl}" alt="${pkg.title}" onerror="this.onerror=null;this.src='images/package-card-img1.jpg';">
                            <div class="batch">
                                <span>${pkg.duration || 'N/A'}</span>
                            </div>
                        </div>
                        <div class="package-content">
                            <div class="location">
                                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 0C3.13423 0 0 3.13423 0 7C0 10.8662 3.13423 14 7 14C10.8662 14 14 10.8666 14 7C14 3.13423 10.8662 0 7 0ZM7 12.6875C3.85877 12.6875 1.31252 10.1412 1.31252 7C1.31252 3.85877 3.85877 1.31252 7 1.31252C10.1412 1.31252 12.6875 3.85877 12.6875 7C12.6875 10.1412 10.1412 12.6875 7 12.6875ZM7.00044 3.06992C6.49908 3.06992 6.11973 3.33157 6.11973 3.75418V7.63042C6.11973 8.05347 6.49903 8.31423 7.00044 8.31423C7.48956 8.31423 7.88115 8.04256 7.88115 7.63042V3.75418C7.8811 3.3416 7.48956 3.06992 7.00044 3.06992ZM7.00044 9.1875C6.51875 9.1875 6.12673 9.57952 6.12673 10.0616C6.12673 10.5428 6.51875 10.9349 7.00044 10.9349C7.48212 10.9349 7.87371 10.5428 7.87371 10.0616C7.87366 9.57948 7.48212 9.1875 7.00044 9.1875Z"></path>
                                </svg>
                                <a href="destination-details.html?slug=${destSlug || ''}">${destLabel}</a>
                            </div>
                            <h3><a href="travel-package-details.html?slug=${pkg.slug}">${pkg.title}</a></h3>
                            <div class="price-and-btn" style="flex-wrap: wrap; gap: 8px;">
                                <div class="price" style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                    <div style="text-align: left;">
                                        <span style="font-size: 11px; display: block; line-height: 1;">Starting From</span>
                                        <h6 style="margin: 0; font-size: 18px;">$${price}</h6>
                                    </div>
                                </div>
                                <div class="cta-button-group" style="display: flex; gap: 8px; width: 100%;">
                                    <a href="travel-package-details.html?slug=${pkg.slug}" class="primary-btn1 two" style="flex: 1; height: 38px; line-height: 38px; justify-content: center; padding: 0 8px; font-size: 13px; display: inline-flex; align-items: center;">
                                        <span>View Details</span>
                                        <span>View Details</span>
                                    </a>
                                    <a href="checkout.html?package=${pkg.slug}" class="primary-btn1" style="flex: 1; height: 38px; line-height: 38px; justify-content: center; padding: 0 8px; font-size: 13px; display: inline-flex; align-items: center;">
                                        <span>Book Now</span>
                                        <span>Book Now</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Re-init Swiper
        setTimeout(() => {
            new Swiper(".package-slider2", {
                slidesPerView: 1,
                speed: 1500,
                spaceBetween: 25,
                loop: true,
                autoplay: { delay: 2500, disableOnInteraction: false },
                navigation: {
                    nextEl: ".package-slider2-next",
                    prevEl: ".package-slider2-prev",
                },
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    992: { slidesPerView: 2, spaceBetween: 15 },
                    1200: { slidesPerView: 3, spaceBetween: 24 },
                }
            });
        }, 100);
    }

    async function initDestinationDetails() {
        const slug = getSlugFromUrl();
        if (!slug) return;

        const dest = await fetchDestinationDetails(slug);
        if (!dest) {
            // Leave static template as fallback
            return;
        }

        // Render Hero
        $('#dest-main-title').text(dest.name);
        $('#dest-meta-badge').text(dest.state || 'India');

        // Render About
        $('#dest-overview').html(dest.description || 'Welcome to ' + dest.name);

        // Update Top Attractions text loosely based on desc if no specific field exists
        const attWrap = $('#dest-attractions-wrap');
        if (dest.attractions && dest.attractions.length > 0) {
            // Not in schema yet, but prepared for future
            let html = '<h4>Top Attractions</h4><div class="highlights-wrap"><ul class="items-list">';
            dest.attractions.forEach(att => {
                html += `<li><i class="bi bi-geo-alt"></i> ${att}</li>`;
            });
            html += '</ul></div>';
            attWrap.html(html);
        } else {
            // Keep template static content or hide
            // For now, let's keep the static placeholder
        }

        // Fetch related packages
        const packages = await fetchRelatedPackages(dest._id, dest.name);
        renderRelatedPackages(packages);
    }

    $(document).ready(function() {
        initDestinationDetails();
    });

})(jQuery);
