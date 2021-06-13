/**
 * This Products Slider Widget use Tiny Slider instead of default magento slider
 */

define([
    'jquery',
    'underscore',
    'matchMedia',
    'Magento_PageBuilder/js/utils/breakpoints',
    'Magento_PageBuilder/js/events',
    'dnaCarousel',
    'dna.responsive'
], function ($, _, mediaCheck, breakpointsUtils, events, dnaCarousel, dnaResponsive) {
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
            },
            responsive = {};

        if ($element.data('is-full-width')) {
            sliderConfig.innerWrapperClass = 'mx-auto container-fixed-lg';
            sliderConfig.middleWrapperClass = 'full-width-container overflow-hidden';
        }

        _.each(config.breakpoints, function (breakpoint) {
            if (breakpoint.options.products[carouselMode]) {
                var options = breakpoint.options.products[carouselMode];
                var breakpointMap = breakpoint.map ? breakpoint.map : 'xxxs';
                //Use parseInt to remove any letter and get only a numeric value
                var bp = parseInt(dnaResponsive.getBreakpoint(breakpointMap));

                _.each(options, function (value, key) {
                    //Force standard magento field to items
                    if (key === "slidesToShow") {
                        key = "items";
                    }

                    if (!responsive[bp]) {
                        //Initialize breakpoint array
                        responsive[bp] = {};
                    }

                    responsive[bp][key] = value;
                });
            }
        });

        sliderConfig.responsive = responsive;
        var minorBreakpoint = Object.keys(sliderConfig.responsive)[0];
        //Get first responsive (bp = 0 min) items if default value is undefined
        if (!sliderConfig.items) {
            let defaultItems = sliderConfig.responsive[minorBreakpoint].items;
            sliderConfig.items = (defaultItems) ? defaultItems : 1;
        }

        if (carouselMode === 'continuous' && productCount > sliderConfig.items) {
            sliderConfig.edgePadding = $element.data('center-padding');
            sliderConfig.center = true;
        } else {
            sliderConfig.loop = $element.data('infinite-loop');
        }

        //Initialize bp xxs if not exists
        if (!sliderConfig.responsive["0"]) {
            sliderConfig.responsive["0"] = {}
        }

        buildDnaCarousel($carouselElement, sliderConfig);

        // Redraw slide after content type gets redrawn
        events.on('contentType:redrawAfter', function (args) {
            if ($carouselElement.closest(args.element).length) {
                $carouselElement.rebuildInstance();
            }
        });
    };
});
