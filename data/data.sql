CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `types` int(11) NOT NULL,
  `names` varchar(4095) CHARACTER SET utf8 DEFAULT NULL,
  `choice` varchar(4095) CHARACTER SET utf8 DEFAULT NULL,
  `selectIndex` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `classcomment` (
  `id` int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `user` varchar(255) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `avatar` varchar(255) NOT NULL,
  `studentID` varchar(255) NOT NULL,
  `content` varchar(511) CHARACTER SET utf8 DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `user` varchar(255) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `studentID` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `detailNum` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


