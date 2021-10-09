<?php
namespace DNAFactory\Theme\Api;

interface DeployManagementInterface
{
    /**
     * @param string $moduleName
     * @param string $deployFolder
     */
    public function deployFolder($moduleName, $deployFolder = "pub");
}
