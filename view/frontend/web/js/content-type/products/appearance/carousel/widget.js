/**
 * This Products Slider Widget use Tiny Slider instead of default magento slider
 */

define([
    'jquery',
    'underscore',
    'matchMedia',
    'Magento_PageBuilder/js/utils/breakpoints',
    'Magento_PageBuilder/js/events',
    'dnaCarousel'
], function ($, _, mediaCheck, breakpointsUtils, events, dnaCarousel) {
    'use strict';

    /**
     * Initialize slider.
     *
     * @param {jQuery} $carouselElement
     * @param {Object} config
     */
    function buildDnaCarousel($carouselElement, config) {
        dnaCarousel(config, $carouselElement[0]);
    }

    return function (config, element) {
        var $element = $(element),
            $carouselElement = $($element.children()),
            productCount = $(element).find('.product-item').length,
            carouselMode = $element.data('carousel-mode'),
            sliderConfig = {
                autoplay: $element.data('autoplay'),
                autoplayTimeout: $element.data('autoplay-speed') || 0,
                nav: $element.data('show-arrows'),
                dots: $element.data('show-dots')
            };

        _.each(config.breakpoints, function (breakpoint) {
            mediaCheck({
                media: breakpointsUtils.buildMedia(breakpoint.conditions),

                /** @inheritdoc */
                entry: function () {
                    var slidesToShow = breakpoint.options.products[carouselMode] ?
                        breakpoint.options.products[carouselMode].slidesToShow :
                        breakpoint.options.products.default.slidesToShow;

                    sliderConfig.items = parseFloat(slidesToShow);

                    if (carouselMode === 'continuous' && productCount > sliderConfig.items) {
                        sliderConfig.edgePadding = $element.data('center-padding');
                        sliderConfig.center = true;
                    } else {
                        sliderConfig.loop = $element.data('infinite-loop');
                    }

                    buildDnaCarousel($carouselElement, sliderConfig);
                }
            });
        });

        // Redraw slide after content type gets redrawn
        events.on('contentType:redrawAfter', function (args) {
            if ($carouselElement.closest(args.element).length) {
                $carouselElement.rebuildInstance();
            }
        });
    };
});
