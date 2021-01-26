<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace DNAFactory\Theme\Block\Cart;

use Magento\CatalogInventory\Helper\Stock as StockHelper;

/**
 * Cart crosssell list with configurable maxItemCount
 *
 * @author Ciro Arcadio <ciro@dnafactory.it>
 */
class Crosssell extends \Magento\Checkout\Block\Cart\Crosssell
{
    /**
     * @var \DNAFactory\Theme\Api\ThemeConfigurationInterface
     */
    protected $_themeConfiguration;

    /**
     * @param \Magento\Catalog\Block\Product\Context $context
     * @param \Magento\Checkout\Model\Session $checkoutSession
     * @param \Magento\Catalog\Model\Product\Visibility $productVisibility
     * @param \Magento\Catalog\Model\Product\LinkFactory $productLinkFactory
     * @param \Magento\Quote\Model\Quote\Item\RelatedProducts $itemRelationsList
     * @param StockHelper $stockHelper
     * @param \DNAFactory\Theme\Api\ThemeConfigurationInterface $themeConfiguration
     * @param array $data
     *
     * @codeCoverageIgnore
     * @SuppressWarnings(PHPMD.ExcessiveParameterList)
     */
    public function __construct(
        \Magento\Catalog\Block\Product\Context $context,
        \Magento\Checkout\Model\Session $checkoutSession,
        \Magento\Catalog\Model\Product\Visibility $productVisibility,
        \Magento\Catalog\Model\Product\LinkFactory $productLinkFactory,
        \Magento\Quote\Model\Quote\Item\RelatedProducts $itemRelationsList,
        StockHelper $stockHelper,
        \DNAFactory\Theme\Api\ThemeConfigurationInterface $themeConfiguration,
        array $data = []
    ) {
        $self = parent::__construct(
            $context,
            $checkoutSession,
            $productVisibility,
            $productLinkFactory,
            $itemRelationsList,
            $stockHelper,
            $data
        );
        $this->_themeConfiguration = $themeConfiguration;
        $this->_maxItemCount = $themeConfiguration->getMaxCrosssellItemsInCart();

        return $self;
    }

}
