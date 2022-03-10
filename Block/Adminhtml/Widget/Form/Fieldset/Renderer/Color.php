<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace DNAFactory\Theme\Block\Adminhtml\Widget\Form\Fieldset\Renderer;


/**
 * Form element default renderer
 *
 * @api
 * @deprecated 100.2.0 in favour of UI component implementation
 * @since 100.0.2
 */
class Color extends \Magento\Backend\Block\Widget\Form\Renderer\Fieldset\Element
{
    /**
     * @var string
     */
    protected $_template = 'DNAFactory_Theme::widget/form/renderer/fieldset/color.phtml';
}
