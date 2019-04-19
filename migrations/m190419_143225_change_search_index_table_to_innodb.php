<?php

namespace craft\contentmigrations;

use Craft;
use craft\db\Migration;
use yii\db\Exception;

/**
 * m190419_143225_change_search_index_table_to_innodb migration.
 */
class m190419_143225_change_search_index_table_to_innodb extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        try {
            $this->db->createCommand()
                ->setSql('ALTER TABLE searchindex ENGINE = InnoDB;')
                ->execute();
        } catch (Exception $exception) {
            echo $exception;
            return false;
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        try {
            $this->db->createCommand()
                ->setSql('ALTER TABLE searchindex ENGINE = MyISAM;')
                ->execute();
        } catch (Exception $exception) {
            echo $exception;
            return false;
        }

        return true;
    }
}
