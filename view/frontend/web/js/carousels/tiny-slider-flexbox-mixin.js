/**
 * Standalone tiny-slider implementation
 * It wraps the original tiny-slider script into an instantiable M2 component
 */
define(function(){
    'use strict';

    var mixin = {
        ruleIndex: -1,
        initialize: function(options, element){
            this._super(options, element);
            this._fixStyleSheet(this.getInstanceStatus());
            this.slider.events.on('newBreakpointEnd', this._fixStyleSheet.bind(this));
        },
        _fixStyleSheet: function(instance) {
            var slideId = instance.container.id,
                selector = '#' + slideId + ' > .tns-item',
                sheet = instance.sheet,
                rules = ('insertRule' in sheet) ? sheet.cssRules : sheet.rules;
            for (var i in rules){
                if(
                    rules[i].selectorText === selector
                    && rules[i].cssText.match(new RegExp(`${selector} \{ width\:.*`))
                ){
                    var oldRule = rules[i].cssText,
                        newRule = oldRule.replace(new RegExp(`${selector} \{ (.*?)}`),"max-$1");

                    if(this.ruleIndex >= 0){
                        'deleteRule' in sheet ?
                            sheet.deleteRule(this.ruleIndex) :
                            sheet.removeRule(this.ruleIndex);
                    }
                    var index = rules.length;
                    this.ruleIndex = index;
                    'insertRule' in sheet ?
                        sheet.insertRule(selector + '{' + newRule + '}', index) :
                        sheet.addRule(selector, newRule, index);

                    break;
                }
            }
        }
    };

    return function(baseWidget){
        return baseWidget.extend(mixin);
    }
});