/**
 * Standalone Swiper carousel implementation
 * It wraps the original tiny-slider script into an instantiable M2 component
 */

define([
    'DNAFactory_Theme/js/dna-carousel',
    'swiper'
], function(BaseCarousel, Swiper){
    'use strict';

    Swiper.extendDefaults({ pagination: { clickable: true } });

    return BaseCarousel.extend({
        defaults: {
            defaults:{
                navigation: true,
                pagination: true
            },
            options:{
                preloadImages: false,
                slidesPerView: 'auto',
                createElements: true
            }
        },
        _instantiate(){
            this._mapClasses();
            return new Swiper(this.element, this.options);
        },
        _mapClasses(){
            this.element.classList.add('dna-carousel');
            let slides = this.element.children;
            [...slides].forEach(slide => {
                slide.classList.add('swiper-slide');
            });
        },
        _mapOptions(base = this.options){
            var mapping = {};
            if('items' in base){
                mapping.slidesPerView = base.items;
            }
            if('autoplayTimeout' in base){
                mapping.autoplay = { delay : base.autoplayTimeout };
                delete base.autoplayTimeout;
            }
            if('nav' in base){
                if(base.nav === true && !base._bp)
                    mapping.navigation = this.defaults.navigation;
                else if(base.nav !== true)
                    mapping.navigation = (base.nav)? this._mapOptions(base.nav) : false;
                delete base.nav;
            }
            if('dots' in base){
                if (base.dots === true)
                    mapping.pagination = this.defaults.pagination;
                else
                    mapping.pagination = (base.dots)? this._mapOptions(base.dots) : false;
                delete base.dots;
            }
            if('responsive' in base){
                if(base.responsive.length > 0) {
                    mapping.breakpoints = {};
                    Object.keys(base.responsive).forEach(bp => {
                        mapping.breakpoints[bp] = this._mapOptions(Object.assign(base.responsive[bp], {_bp: true}));
                    });
                }else {
                    mapping.breakpoints = base.responsive;
                }
                delete base.responsive;
            }

            return Object.assign(base, mapping);
        },

        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return this.getInstance().autoplay && this._super().autoplay.play();
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this.getInstance().autoplay && this._super().autoplay.stop();
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this._super().slideTo(n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this._super().update();
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
            this.destroyInstance();
            return this.getInstance().init(this.options);
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this._super().params;
        }
    });
});
