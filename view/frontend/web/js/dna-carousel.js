/**
 * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
 *
 * Wrapper per lo slider/carosello utilizzato.
 * Dato che il carosello è ampiamente utilizzato da altri moduli dnafactory, questo wrapper aggiunge un livello di
 * astrazione che facilita, all'occorrenza, l'implementazione di diversi slider/caroselli tramite specifici Adapters.
 */

define([
    'uiClass'
], function (carousel) {
    'use strict';

    return carousel.extend({
        slider: null,
        element: null,

        initialize: function(options, element) {
            if(element.length)
                element = element[0];

            this._super(options, element);
            this.element = element;
            this.options = this._mapOptions(this.options);
            this.slider = this._instantiate(this.options, this.element);
            return this;
        },
        _onInit: function(){
            this.element.dispatchEvent(new CustomEvent('dna-init', { detail: this }));
        },
        _mapOptions: function(options){
            return options;
        },
        _instantiate(){
            return this;
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
            return this.getInstance();
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this.getInstance();
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this.getInstance();
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this.getInstance();
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this.getInstance();
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
            return this.getInstance();
        }
    });
});