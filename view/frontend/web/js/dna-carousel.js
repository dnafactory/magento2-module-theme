/**
 * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
 *
 * Wrapper per lo slider/carosello utilizzato.
 * Dato che il carosello è ampiamente utilizzato da altri moduli dnafactory, questo wrapper aggiunge un livello di
 * astrazione che facilita, all'occorrenza, l'implementazione di diversi slider/caroselli tramite specifici Adapters.
 */

define([
    'dnaCarouselInstance'
], function (carousel) {
    'use strict';

    return carousel.extend({
        defaults:{
            options: {
                dots:true,
                loop: false,
                mouseDrag: true
            }
        },
        _instantiate: function(options, element){
            this._super({options: options}, element);
        },
        /**
         * It gets the current carousel implementation
         * @returns {*}
         */
        getInstance(){
            return this._super();
        },
        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return this._super();
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this._super();
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this._super();
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this._super();
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this._super();
        },
        /**
         * Rebuild the current carousel instance
         * @returns {*}
         */
        rebuildInstance(){
            return this._super();
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this._super();
        }
    });
});