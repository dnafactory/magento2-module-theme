/**
 * Standalone Slick carousel implementation
 * It wraps the original tiny-slider script into an instantiable M2 component
 */
define([
    'DNAFactory_Theme/js/dna-carousel',
    'jquery',
    'underscore',
    'slick'
], function(BaseCarousel, $, _){
    'use strict';

    return BaseCarousel.extend({
        updateDebounced: null,
        initialize: function(options, element){
            this.updateDebounced = _.debounce(this._mapClasses.bind(this), 500, false);
            return this._super(options, element);
        },
        _instantiate: function(){
            $(this.element).on('setPosition', this.updateDebounced);
            $(this.element).slick(this.options);
            return $(this.element);
        },
        _mapClasses(){
            $('.slick-slide', this.element).each((index, item) => {
                var slide = $('> div > *', item),
                    classes = slide.attr("class") || slide.attr('data-classes');
                slide.attr('class', null).attr('data-classes', classes);
                $(item).addClass(classes);
            });
        },
        _mapOptions(base = this.options){
            var mapping = {};
            if('items' in base){
                mapping.slidesToShow = base.items;
            }
            if('nav' in base){
                mapping.arrows = base.nav;
            }
            if('loop' in base){
                mapping.infiniteScroll = base.margin;
            }
            if('responsive' in base && base.responsive.length > 0){
                mapping.responsive = [];
                Object.keys(base.responsive).forEach(key => {
                    let keyParsed = parseInt(key);
                    //Check if is NaN
                    if (!(keyParsed !== keyParsed)) {
                        mapping.responsive.push({
                            breakpoint: key,
                            settings: this._mapOptions(base.responsive[key])
                        });
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
            return this._super().slick('slickPlay');
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this._super().slick('slickPause');
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this._super().slick('slickGoTo', n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this._super().slick('slickSetOption', '','', true);
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            $(this.element).off('setPosition', this.updateDebounced);
            return this._super().slick('unslick');
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this._super().slick('getSlick');
        }
    });
});
