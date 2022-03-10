<?php

namespace DNAFactory\Theme\Block\Adminhtml\System\Config\Field;

/**
 * Class
 */
class Color extends \Magento\Config\Block\System\Config\Form\Field
{
    /**
     * @param \Magento\Framework\Data\Form\Element\AbstractElement $element
     * @return string
     */
    protected function _getElementHtml(\Magento\Framework\Data\Form\Element\AbstractElement $element)
    {
        $html = $element->getElementHtml();
        $value = $element->getData('value');

        $html .= '<script type="text/javascript">
            require(["jquery","jquery/colorpicker/js/colorpicker"], function ($) {
                $(document).ready(function () {
                    var $el = $("#' . $element->getHtmlId() . '"),
                    $spBox = $("<span class=\'sp-replacer sp-light\'><span class=\'sp-preview\'></span></span>"),
                    $spPreview = $("<span class=\'sp-preview-inner\'></span>");

                    $spBox.on("click", () => $el.click());
                    $(".sp-preview",$spBox).append($spPreview);
                    $el.before($spBox);

                    $spPreview.css("backgroundColor", "' . $value . '");

                    // Attach the color picker
                    $el.ColorPicker({
                        color: "' . $value . '",
                        onChange: function (hsb, hex, rgb) {
                            $spPreview.css("backgroundColor", "#" + hex);
                            $el.val("#" + hex);
                        }
                    });
                });
            });
            </script>';

        return $html;
    }
}
