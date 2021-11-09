/**
 * Standalone owl-carousel implementation
 * It wraps the original owl-carousel script into an instantiable M2 component
 * @deprecated
 */
define([
    'jquery',
    'DNAFactory_Theme/js/dna-carousel',
    'DNAFactory_Theme/js/vendor/owl-carousel/owl.carousel.min',
    'domReady!' // Owl Carousel needs to be loaded on dom ready
], function($, BaseCarousel){
    'use strict';

    return BaseCarousel.extend({
        defaults: {
            options: {
                loop:false,
                navContainerClass:"owl-nav",
                lazyLoad:true,
                nav:false,
                margin:10,
                dots:true,
                items:1
            }
        },
        _instantiate(){
            return $(this.element).owlCarousel(this.options);
        },
        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return this._super().trigger('play.owl.autoplay');
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this._super().trigger('stop.owl.autoplay');
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this._super().trigger('to.owl.carousel', n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this._super().trigger('refresh.owl.carousel');
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this._super().trigger('destroy.owl.carousel');
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this._super().data('owlCarousel');
        }
    });

});