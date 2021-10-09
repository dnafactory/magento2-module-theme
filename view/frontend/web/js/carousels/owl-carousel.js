/**
 * Standalone owl-carousel implementation
 * It wraps the original owl-carousel script into an instantiable M2 component
 */
define([
    'jquery',
    'uiClass',
    'DNAFactory_Theme/js/vendor/owl-carousel/owl.carousel.min',
    'domReady!' // Owl Carousel needs to be loaded on dom ready
], function($, Class){
    'use strict';

    return Class.extend({
        defaults: {
            slider: null,
            options: {
                "loop":false,
                "navContainerClass":"owl-nav",
                "lazyLoad":true,
                "nav":false,
                "margin":10,
                "dots":true,
                "items":1
            }
        },

        initialize: function(options, element){
            this._super(options, element);
            this.slider = $(element);
            this._instantiate();
        },
        _instantiate(){
            return this.slider.owlCarousel(this.options);
        },

        /**
         * It gets the current carousel implementation
         * @returns {*}
         */
        getInstance(){
            return this.slider;
        },
        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return this.getInstance().trigger('play.owl.autoplay');
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this.getInstance().trigger('stop.owl.autoplay');
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this.getInstance().goToSlide(n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this.getInstance().trigger('refresh.owl.carousel');
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this.getInstance().trigger('destroy.owl.carousel');
        },
        /**
         * Rebuild the current carousel instance
         * @returns {*}
         */
        rebuildInstance(){
            this.destroyInstance();
            return this._instantiate();
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this.getInstance().data('owlCarousel');
        }
    });

});