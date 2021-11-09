/**
 * Standalone tiny-slider implementation
 * It wraps the original tiny-slider script into an instantiable M2 component
 * @deprecated
 */
define([
    'DNAFactory_Theme/js/dna-carousel',
    'DNAFactory_Theme/js/vendor/tiny-slider/dist/tiny-slider',
    'domReady!' // Tiny Slider needs to be loaded on dom ready
], function(BaseCarousel){
    'use strict';

    return BaseCarousel.extend({
        defaults: {
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
                loop: false,
                rewind: false,
                autoHeight: false,
                responsive: false,
                lazyload: false,
                lazyloadSelector: '.tns-lazy-img',
                touch: true,
                mouseDrag: true,
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
        _instantiate(){
            this.options['container'] = this.element;
            let instance = tns(this.options);
            requirejs(['jquery'],$ => {
                $(this.element).data(instance)
                    .closest('.tns-outer').addClass('dna-carousel');
            });
            return instance;
        },
        _mapOptions(base = this.options){
            var mapping = {};
            if('dots' in base){
                mapping.nav = base.dots;
            }
            if('nav' in base){
                mapping.controls = base.nav;
            }
            if('margin' in base){
                mapping.gutter = base.margin;
            }
            if('responsive' in base && base.responsive.length > 0){
                mapping.responsive = {};
                Object.keys(base.responsive).forEach(key => {
                    let keyParsed = parseInt(key);
                    //Check if is NaN
                    if (!(keyParsed !== keyParsed)) {
                        mapping.responsive[key] = this._mapOptions(base.responsive[key]);
                    }
                });
            } else {
                base.responsive = false;
            }
            return Object.assign(base, mapping);
        },
        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return this._super().play();
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this._super().pause();
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this._super().goToSlide(n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this._super().refresh();
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this._super().destroy();
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
            return this._super().getInfo();
        }
    });
});
