/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'Magento_PageBuilder/js/events',
    'underscore',
    'dnaCarousel',
    'dna.responsive',
], function ($, events, _,dnaCarousel, dnaResponsive) {
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

    return function (config, sliderElement) {
        var $element = $(sliderElement),
            sliderConfig = {
                autoplay: $element.data('autoplay'),
                autoplayTimeout: $element.data('autoplay-speed') || 0,
                fade: $element.data('fade'),
                items: 1,
                infinite: $element.data('infinite-loop'),
                nav: $element.data('show-arrows'),
                dots: $element.data('show-dots'),
                responsive: false
            };

        if ($element.data('is-full-width')) {
            sliderConfig.outerWrapperClass = 'overflow-visible';
            sliderConfig.middleWrapperClass = 'full-width-container';
        }

        buildDnaCarousel($element, sliderConfig);

        // Redraw slide after content type gets redrawn
        events.on('contentType:redrawAfter', function (args) {
            if ($element.closest(args.element).length) {
                $element.rebuildInstance();
            }
        });
    };
});
