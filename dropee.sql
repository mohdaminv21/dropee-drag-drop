-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.26 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5723
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for dropee
CREATE DATABASE IF NOT EXISTS `dropee` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dropee`;

-- Dumping structure for table dropee.dropee
CREATE TABLE IF NOT EXISTS `dropee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `row` int(11) NOT NULL,
  `column` int(11) NOT NULL,
  `text` varchar(360) NOT NULL DEFAULT '',
  `color` varchar(50) DEFAULT '',
  `style` varchar(360) DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table dropee.dropee: 5 rows
/*!40000 ALTER TABLE `dropee` DISABLE KEYS */;
INSERT INTO `dropee` (`id`, `row`, `column`, `text`, `color`, `style`, `created_at`, `updated_at`) VALUES
	(1, 1, 2, 'Dropee.com ', '#38c172', 'background-color: red; text-transform: uppercase;', '2020-10-25 12:28:42', '2020-10-25 12:28:45'),
	(2, 1, 4, 'Build Trust', '', '', NULL, NULL),
	(3, 2, 3, 'SaaS enabled marketplace', '', '', NULL, NULL),
	(4, 3, 1, 'B2B Marketplace', '', '', NULL, NULL),
	(5, 4, 4, 'Provide Transparency', '', '', NULL, NULL);
/*!40000 ALTER TABLE `dropee` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
