/**
 * Standalone tiny-slider implementation
 * It wraps the original tiny-slider script into an instantiable M2 component
 */
define([
    'uiClass',
    'DNAFactory_Theme/js/vendor/tiny-slider/dist/tiny-slider',
    'domReady!' // Tiny Slider needs to be loaded on dom ready
], function(Class){
    'use strict';

    return Class.extend({
        defaults: {
            slider: null,
            options:{
                container: '.slider',
                mode: 'carousel',
                axis: 'horizontal',
                items: 1,
                gutter: 0,
                edgePadding: 0,
                fixedWidth: false,
                autoWidth: false,
                viewportMax: false,
                slideBy: 1,
                center: false,
                controls: true,
                controlsPosition: 'top',
                controlsText: ['',''],
                controlsContainer: false,
                prevButton: false,
                nextButton: false,
                nav: true,
                navPosition: 'bottom',
                navContainer: false,
                navAsThumbnails: false,
                arrowKeys: false,
                speed: 300,
                autoplay: false,
                autoplayPosition: 'top',
                autoplayTimeout: 5000,
                autoplayDirection: 'forward',
                autoplayText: ['start', 'stop'],
                autoplayHoverPause: false,
                autoplayButton: false,
                autoplayButtonOutput: true,
                autoplayResetOnVisibility: true,
                animateIn: 'tns-fadeIn',
                animateOut: 'tns-fadeOut',
                animateNormal: 'tns-normal',
                animateDelay: false,
                loop: true,
                rewind: false,
                autoHeight: false,
                responsive: false,
                lazyload: false,
                lazyloadSelector: '.tns-lazy-img',
                touch: true,
                mouseDrag: false,
                swipeAngle: 15,
                nested: false,
                preventActionWhenRunning: false,
                preventScrollOnTouch: false,
                freezable: true,
                onInit: false,
                useLocalStorage: true,
                nonce: false
            }
        },
        initialize: function(options, element){
            this._super(options, element);
            this.options['container'] = element;
            this.slider = tns(this._mapOptions(this.options));
            requirejs(['jquery'],$ => $(element).data(this.slider));
        },
        _mapOptions(base = this.options){
            var mapping = {};
            if('dots' in base){
                mapping.nav = base.dots;
                if('nav' in base){
                    mapping.controls = base.nav;
                }
            }
            if('margin' in base){
                mapping.gutter = base.margin;
            }
            if('responsive' in base && base.responsive.length > 0){
                mapping.responsive = {};
                Object.keys(base.responsive).forEach(key => {
                    mapping.responsive[key] = this._mapOptions(base.responsive[key]);
                });
            } else {
                base.responsive = false;
            }
            return Object.assign(base, mapping);
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
            return this.getInstance().play();
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this.getInstance.pause();
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
            return this.getInstance().refresh();
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this.getInstance().destroy();
        },
        /**
         * Rebuild the current carousel instance
         * @returns {*}
         */
        rebuildInstance(){
            return this.getInstance().rebuild();
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this.getInstance().getInfo();
        }
    });
});