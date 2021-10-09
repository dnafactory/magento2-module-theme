<?php
namespace DNAFactory\Theme\Management;

use DNAFactory\Theme\Api\DeployManagementInterface;
use Magento\Framework\App\Filesystem\DirectoryList;
use Magento\Framework\Module\Dir\Reader;

class DeployManagement implements DeployManagementInterface
{
    const DEFAULT_FILE_PERMISSIONS = 0666;
    const DEFAULT_DIR_PERMISSIONS = 0777;

    /**
     * @var \Magento\Framework\Filesystem\Directory\Write
     */
    protected $rootWrite;

    /**
     * @var \Magento\Framework\Filesystem\Directory\Read
     */
    protected $rootRead;

    /**
     * @var \Magento\Framework\Filesystem
     */
    protected $filesystem;
    /**
     * @var Reader
     */
    protected $directoryList;

    public function __construct (
        \Magento\Framework\Filesystem $filesystem,
        Reader $directoryList
    ) {
        $this->filesystem = $filesystem;
        $this->rootWrite = $filesystem->getDirectoryWrite(DirectoryList::ROOT);
        $this->rootRead = $filesystem->getDirectoryRead(DirectoryList::ROOT);
        $this->directoryList = $directoryList;
    }

    /**
     * @param string $moduleName
     * @param string $deployFolder
     */
    public function deployFolder($moduleName, $deployFolder = "pub")
    {
        $folder = $this->directoryList
                ->getModuleDir("", $moduleName) . '/' . $deployFolder;

        $from = $this->rootRead->getRelativePath($folder);
        $this->moveFilesFromTo($from, '');
    }

    public function moveFilesFromTo($fromPath, $toPath)
    {
        //phpcs:ignore
        $baseName = basename($fromPath);
        $files = $this->rootRead->readRecursively($fromPath);
        array_unshift($files, $fromPath);

        foreach ($files as $file) {
            $newFileName = $this->getNewFilePath(
                $file,
                $fromPath,
                ltrim($toPath . '/' . $baseName, '/')
            );

            if ($this->rootRead->isExist($newFileName)) {
                continue;
            }

            if ($this->rootRead->isFile($file)) {
                $this->rootWrite->copyFile($file, $newFileName);

                $this->rootWrite->changePermissions(
                    $newFileName,
                    self::DEFAULT_FILE_PERMISSIONS
                );
            } elseif ($this->rootRead->isDirectory($file)) {
                $this->rootWrite->create($newFileName);

                $this->rootWrite->changePermissions(
                    $newFileName,
                    self::DEFAULT_DIR_PERMISSIONS
                );
            }
        }
    }

    protected function getNewFilePath($filePath, $fromPath, $toPath)
    {
        return str_replace($fromPath, $toPath, $filePath);
    }
}
