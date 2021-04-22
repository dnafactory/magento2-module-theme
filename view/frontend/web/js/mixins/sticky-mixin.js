/**
 * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
 *     Stick-To-Stack mixin
 *     Allows to stack multiple sticked-to-top elements, avoiding overlaps.
 *
 *     ex:
 *
 *      A)
 *      ______________________________________TOP
 *          *--------------------------*
 *          |      sticky header       |
 *          *--------------------------*
 *                       :
 *      ~~~~~~~~~~~~~~~~~:~~~~~~~~~~~~~~~~~~
 *                       :
 *                       V
 *          *--------------------------*
 *          |       other content      |
 *          *--------------------------*
 *######################################################################################################################
 *      B)
 *      _______________________________________TOP
 *          *--------------------------*
 *          |      sticky header       |
 *          *--------------------------*
 *          |   other sticky content   |
 *          *--------------------------*
 */

define([
    'jquery'
], function ($) {
    'use strict';

    const mixin = {
        options: {
            /**
            * @property stickAfterElement: can be a selector, a DOM element or boolean FALSE value (disabled)
            */
            stickAfterElement: false
        },

        /**
         * _getOptionValue extension point: it wraps the base function with the customized one (_spacingTopWrapperFunction)
         * @param option
         * @returns {*}
         * @private
         */
        _getOptionValue(option){
            var value = this._super(option);
            return (option === 'spacingTop')? this._spacingTopWrapperFunction(value) : value;
        },
        /**
         * The mixin core function: on each spacingTop value request, it adds the required top offset
         *                          accordingly to the defined stickAfterElement(s)'s size
         * @param value
         * @returns {*}
         * @private
         */
        _spacingTopWrapperFunction( value ){
            if(this.options.stickAfterElement){
                var offset;
                $(this.options.stickAfterElement).each((i, element) => {
                    offset = $(element).offset();
                    value+= $(element).outerHeight() + (offset.top - $(document).scrollTop());
                });
            }
            return value;
        }
    };

    return function(target) {
        $.widget('mage.sticky', target, mixin);
        return $.mage.sticky;
    }

});
