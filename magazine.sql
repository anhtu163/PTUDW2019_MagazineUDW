-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.37-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             10.1.0.5585
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for magazine
CREATE DATABASE IF NOT EXISTS `magazine` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `magazine`;

-- Dumping structure for table magazine.category
CREATE TABLE IF NOT EXISTS `category` (
  `CatID` int(11) NOT NULL AUTO_INCREMENT,
  `CatName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CatID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.category: ~9 rows (approximately)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`CatID`, `CatName`) VALUES
	(1, 'Xã hội'),
	(2, 'Khoa học - Công nghệ'),
	(3, 'Pháp luật'),
	(4, 'Giáo dục'),
	(5, 'FunFact'),
	(6, 'Du lịch'),
	(7, 'Đời sống'),
	(8, 'Chính trị'),
	(9, 'Phim Hot');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table magazine.editor_manage_category
CREATE TABLE IF NOT EXISTS `editor_manage_category` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `CatID` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`CatID`),
  KEY `FK_editor_manage_category_category` (`CatID`),
  CONSTRAINT `FK_editor_manage_category_category` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`),
  CONSTRAINT `FK_editor_manage_category_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.editor_manage_category: ~0 rows (approximately)
/*!40000 ALTER TABLE `editor_manage_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `editor_manage_category` ENABLE KEYS */;

-- Dumping structure for table magazine.post
CREATE TABLE IF NOT EXISTS `post` (
  `PostID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` longtext NOT NULL,
  `Date` date DEFAULT NULL,
  `Avatar` blob NOT NULL,
  `IsPublish` tinyint(4) NOT NULL,
  `CatID` int(11) NOT NULL,
  `ViewNum` int(11) NOT NULL,
  `Content` longtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `SumContent` longtext NOT NULL,
  `CreatorID` int(11) NOT NULL,
  PRIMARY KEY (`PostID`),
  KEY `FK_post_category` (`CatID`),
  KEY `FK_post_user` (`CreatorID`),
  CONSTRAINT `FK_post_category` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`),
  CONSTRAINT `FK_post_user` FOREIGN KEY (`CreatorID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.post: ~5 rows (approximately)
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` (`PostID`, `Title`, `Date`, `Avatar`, `IsPublish`, `CatID`, `ViewNum`, `Content`, `SumContent`, `CreatorID`) VALUES
	(1, '\'Ông lớn\' công nghệ Apple trở lại mảng xe tự lái?', '2019-06-11', _binary 0x6C312E6A7067, 0, 2, 0, '', 'Những tin đồn về dự án xe tự lái của hãng công nghệ hàng đầu thế giới Apple lại rộ lên sau khi tưởng chừng Táo khuyết đã từ bỏ mảng thị trường đầy tiềm năng này.', 1),
	(2, '"Quái vật vũ trụ" sa lưới nhân loại, giới khoa học ngủ quên trên chiến thắng?', '2019-06-07', _binary 0x6C322E6A7067, 0, 2, 0, '', 'Sự kiện chụp ảnh được hố đen gây chấn động thế giới vừa qua không phải là điểm kết thúc của quá trình nghiên cứu, mà thực ra là khởi đầu của một kỷ nguyên mới đầy hứa hẹn.', 2),
	(3, 'Chàng trai 9X Vĩnh Phúc phượt xuyên Việt chỉ với 4 triệu đồng', '2019-06-04', _binary 0x6C332E6A7067, 0, 6, 0, '', 'Hành trình từ Hà Nội - Cà Mau gần 1 tháng khắp mảnh đất chữ S của chàng trai 9X đến từ Vĩnh Phúc đã có không ít trải nghiệm, bỏ túi thêm nhiều kinh nghiệm cho một chuyến đi bụi đường trường dài ngày.', 1),
	(4, '\'Đua nhau\' tổ chức thi đánh giá năng lực', '2019-06-11', _binary 0x6C342E6A7067, 0, 4, 0, '', 'TTO - Sau kỳ thi đánh giá năng lực đợt 1 năm 2019 do ĐH Quốc gia TP.HCM tổ chức sẽ có hàng loạt trường ĐH cũng tổ chức thi riêng. Thời gian diễn ra kỳ thi này không còn lâu nữa nhưng đến nay các trường này đều mới đang trong quá trình chuẩn bị.', 1),
	(5, 'Việc nhiều tiền, bạn thức khuya không nổi; Việc ít tiền, bạn không muốn dậy đi làm: 20 tuổi sớm đòi hỏi, 30 tuổi trả giá đắt', '2019-06-11', _binary 0x66322E6A7067, 0, 7, 0, '<p><strong>\r\nVì chúng ta không theo kịp nhịp điệu của tuổi tác nên mới có cái gọi là khủng hoảng tuổi trung niên. Khủng hoảng này là kết quả của những năm tuổi trẻ đòi hỏi, lười biếng mà không chịu nỗ lực.\r\n</strong></p>\r\n<p>Nơi làm việc không phải là chỗ cho những chú heo lười. Năm 20 tuổi, bạn nỗ lực hết sức mình để mong có chỗ đứng trong công ty nhưng ở tuổi 30, bạn bắt đầu bê tha, chậm chạp thì đừng trách mãi sao không thăng tiến. 20 tuổi bạn phải nỗ lực kiểu 20 tuổi, 30 tuổi bạn phải chăm chỉ theo kiểu 30 tuổi. Bạn không thể nỗ lực theo kiểu 20 tuổi khi bạn 30 tuổi, bởi vì ở nơi làm việc, không ai sẽ trả tiền cho bằng cấp của bạn, họ sẽ trả công cho những gì bạn làm được.</p>\r\n<p>Có một nghịch lý như sau: Một người làm việc khoảng 5,6 năm, nhanh nhẹn tháo vát do đã quen việc, quan hệ với đồng nghiệp rất tốt, chuyên nghiệp hơn khi đi gặp đối tác... nhưng sếp không có ý định tăng lương hay thăng chức cho anh ta. Nếu anh ta nói chuyện thăng tiến với sếp thì sợ sếp la. Còn nếu như im lặng cho qua, thì lại cảm thấy không cam lòng vì không xứng với công sức mình bỏ ra. Do đó, thay vì phàn nàn với sếp thì anh ta sẽ lặng lẽ tìm kiếm một công việc khác.</p>\r\n<p>Vài ngày trước, cậu em của đồng nghiêp tôi đang có ý định nghỉ việc ở công ty cũ. Cậu ta chưa đến 30 tuổi, đang trong thời kỳ vàng son của sự nghiệp nhưng vì không được sếp trọng dụng, cậu quyết tâm nộp đơn xin nghỉ.</p>\r\n<p>Tôi đã giới thiệu cậu lên phòng nhân sự công ty tôi. Giám đốc nhân sự rất hài lòng với bản lý lịch và đặt lịch phỏng vấn. Dù đã đậu phỏng vấn nhưng cậu từ chối làm việc ở công ty tôi. Tôi nghĩ rằng cậu ta vừa nghỉ việc công ty cũ, có lẽ đang túng thiếu tiền nên muốn giúp cậu ta có thêm chút tiền tiêu để sống thoải mái hơn. Nào ngờ, cậu ấy nói với tôi: "Cảm ơn anh đã quan tâm đến em. Em không đồng ý không phải về lương bổng và phúc lợi của công ty. Em nghe nói rằng công ty của anh thường làm việc ngoài giờ. Anh biết đấy, năm nay em đã 27 tuổi và em còn chưa kết hôn. Làm trong công ty anh một thời gian chắc em chết vì kiệt sức mất".</p>\r\n<p>Trong khi nói, cậu còn chỉ vào khung cảnh nghĩa địa mà cậu search google, cậu cho rằng tăng ca thì cậu sẽ đến nơi này sớm thôi. Tôi bất lực thở dài và nói : "Ừ nhỉ, cơ sức khỏe là quan trọng, hãy kiếm việc phù hợp hơn mà làm nhé".</p>\r\n<p>Nếu tôi sợ mình không đủ tiền tiêu mỗi tháng, thì tôi sẽ cố gắng kiếm thêm tiền. Nhưng nếu làm việc quá nhiều và không nghỉ ngơi hợp lý thì không có sức khỏe và tất nhiên là tôi không thể kiếm được tiền. Khi nghe nhiều người nói rằng làm thêm giờ rất có hại cho cơ thể, ngủ không đủ giấc, thoạt đầu tôi sẽ phản biện lại rằng không có việc gì dễ dàng cả, phải bỏ sức ra thì mới có tiền nhưng tôi cảm thấy rằng làm việc quá sức thì không có đủ năng lượng để tiếp tục làm việc, đây chính là thực tế xã hội.</p>\r\n<p>Sau đó, một ứng viên khác đến cùng đợt với cậu kia và chấp nhận mức lương của công ty. Sau khi nói chuyện với sếp nhiều lần, việc tăng lương không có kết quả. Anh này phàn nàn về mức lương thấp nhưng vẫn tiếp tục tìm việc bên ngoài.</p>\r\n<p>"Làm bao nhiêu tiền một tháng?" là câu hỏi ám ảnh những sinh viên mới ra trường. Họ rất sợ khi bị hỏi, nên khi vừa tốt nghiệp đại học, họ vội vã kiếm việc làm, họ không sợ mệt mỏi hay khổ cực. Có thể nói, cổ phiếu đáng giá nhất mà họ sở hữu đó là tinh thần mạnh mẽ. Có những người sẽ kết hôn trong độ tuổi này. Vì vậy, họ lại càng ý thức được rằng bản thân phải kiếm nhiều tiền để phụng dưỡng cha mẹ và nuôi nấng con cái sau này.</p>\r\n<p>Sau 30 tuổi, công việc cũng có một chút kinh nghiệm. Nếu bạn phấn đấu cho sự nghiệp, tình yêu có thể không còn nữa vì bạn không có thời gian bên người yêu. Còn khi bạn yêu, công việc của bạn có thể không còn nữa. Điều mà làm bạn lúng túng hơn nữa là bạn muốn được thăng chức nhưng bạn lại không đủ giỏi. Không được thăng chức, thì bạn không hài lòng với những gì bạn bỏ ra. Do đó, nhảy việc đã trở thành lựa chọn của nhiều người.</p>\r\n<p>N. 30 tuổi, tốt nghiệp trường đại học và làm việc chăm chỉ hơn 5 năm. Năng suất làm việc của cô khá tốt. Nhưng sếp cô ấy không đoái hoài gì đến chuyện thăng chức và còn bảo: "Năm sau đi". Cô tức giận nhưng vẫn cố cam chịu. Sau chừng một năm, mọi thứ vẫn dậm chân tại chỗ, N. nhảy việc.</p>\r\n<p>Làm ở công ty mới, tình hình lương bổng tuy có tốt hơn nhưng sức khỏe của N. không tốt. Cô thường xuyên phải tăng ca, thức đêm làm việc.</p>\r\n<p>Có nhiều buổi sáng cô dậy sớm không nổi, lên công ty trễ hoặc là ngủ gục trong giờ làm việc. Trong vài năm qua, sức khỏe của cô xuống dốc.Dù biết như thế nhưng N. không cam tâm khi ngày ngày an phận với mức lương kém. Sau khi suy nghĩ cẩn thận, cô quyết định chiến đấu0. Hiện tại N. đã kết hôn và có một sự nghiệp tương đối vững vàng.</p>\r\n<p>Cuộc sống là của bạn. Bạn có thể chọn cố gắng hết sức để đạt được thứ bạn muốn thì bạn phải chấp nhận thức khuya, dậy sớm. Nếu bạn muốn an nhàn, mỗi tháng nhận lương bèo bọt thì bạn không cần cố gắng. Không có kiểu vừa nhàn vừa lương cao, bạn chỉ đang nằm mơ thôi.</p>\r\n<p>Đi con đường nào là do bạn lựa chọn. Hoặc là thức đêm làm việc hoặc bỏ cuộc. Và chọn việc phù hợp với bản thân và quan tâm đến sức khỏe của bạn. Đừng chọn việc quá sức, bạn sẽ kham không nổi. Muốn chọn việc nhẹ nhàng bạn lại cho rằng lương thấp và bạn không thèm dậy sớm để đi làm. Nghịch lý ở chỗ đó.</p>\r\n', 'Vì chúng ta không theo kịp nhịp điệu của tuổi tác nên mới có cái gọi là khủng hoảng tuổi trung niên. Khủng hoảng này là kết quả của những năm tuổi trẻ đòi hỏi, lười biếng mà không chịu nỗ lực.', 2),
	(6, 'Bom tấn "Avengers: End Game" sẽ thay đổi vũ trụ Marvel và cả Hollywood', '2019-06-11', _binary 0x746F702D706F7374312E6A7067, 0, 9, 0, '<p>\r\n										<strong>Bom tấn “Avengers: Endgame” được kỳ vọng sẽ thay đổi cả kinh đô điện ảnh Hollywood và mở ra hướng đi tiếp theo của Vũ trụ Điện ảnh Marvel (MCU).</strong>\r\n									</p>\r\n									<p>\r\n										Avengers: Endgame là bộ phim thứ 22 của MCU sau 11 năm và đồng thời cũng đưa “Phase 3” (giai đoạn 3) của vũ trụ điện ảnh này tới gần sự kết thúc. Giai đoạn 4 của MCU hứa hẹn sẽ mang đến nhiều thay đổi lớn, nhất là sự gia nhập của những nhân vật nổi tiếng mà Disney đã có bản quyền như Fantastic Four, X-Men.\r\n									</p>\r\n									<p>\r\n										Đạo diễn tài ba James Gunn đã chính thức quay trở lại với phần 3 Guardians of the Galaxy. Một số dự án tiếp theo của MCU có thể tồn tại hoàn toàn độc lập, nhưng hầu hết phim khác chắc chắn chịu nhiều tác động trực tiếp từ Avengers: Endgame.\r\n									</p>\r\n									<p>\r\n										Trận chung kết đỉnh cao của Giai đoạn 3 này có thể là dấu chấm hết đối với một số siêu anh hùng quan trọng nhất, nhưng đồng thời cũng bổ sung nhiều nhân vật mới vào MCU. Một số khái niệm quan trọng hứa hẹn mở rộng hơn nữa MCU, ví dụ như Lượng tử giới (Quantum Realm) hay Đa vũ trụ (Multiverse).\r\n									</p>\r\n									<p>\r\n										<img class="img-fluid" src="/img/top-post1-2.jpg" alt="">\r\n									</p>\r\n									<p>\r\n										<i>Avengers: Endgame</i>	Avengers: Endgame đồng thời cũng là cột mốc làm thay đổi Hollywood trong giai đoạn mà điện ảnh đang chịu tác động và cạnh tranh trực tiếp từ streaming, hình thức giải trí nở rộ vài năm gần đây.\r\n									</p>\r\n									<p>\r\n										Để tồn tại và phát triển, chắc chắn các bộ phim bom tấn sẽ ngày càng thay đổi về phạm vi sản xuất, kinh phí đầu tư hoặc hình thức quảng bá độc đáo mà <i>Avengers: Endgame</i> đã tiên phong.\r\n									</p>\r\n									<p>\r\n										Nhìn chung, không còn nghi ngờ gì nữa, <i>Endgame</i> sẽ ảnh hưởng rất lớn đến Marvel, từ hình thức đến nội dung, từ cách viết kịch bản đến các sáng tạo trong dàn dựng của đạo diễn của các bom tấn trong tương lai.\r\n									</p>', 'Bom tấn “Avengers: Endgame” được kỳ vọng sẽ thay đổi cả kinh đô điện ảnh Hollywood và mở ra hướng đi tiếp theo của Vũ trụ Điện ảnh Marvel (MCU).', 1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

-- Dumping structure for table magazine.post_tag
CREATE TABLE IF NOT EXISTS `post_tag` (
  `post_PostID` int(11) NOT NULL,
  `tag_tagID` int(11) NOT NULL,
  PRIMARY KEY (`post_PostID`,`tag_tagID`),
  KEY `FK_post_tag_tag` (`tag_tagID`),
  CONSTRAINT `FK_post_tag_post` FOREIGN KEY (`post_PostID`) REFERENCES `post` (`PostID`),
  CONSTRAINT `FK_post_tag_tag` FOREIGN KEY (`tag_tagID`) REFERENCES `tag` (`TagID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.post_tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `post_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_tag` ENABLE KEYS */;

-- Dumping structure for table magazine.subsciber_cmt_post
CREATE TABLE IF NOT EXISTS `subsciber_cmt_post` (
  `SubID` int(11) NOT NULL,
  `PostID` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `content` text,
  `subscrider_cmt_postcol` varchar(45) DEFAULT '',
  PRIMARY KEY (`SubID`,`PostID`),
  KEY `FK_subsciber_cmt_post_post` (`PostID`),
  CONSTRAINT `FK_subsciber_cmt_post_post` FOREIGN KEY (`PostID`) REFERENCES `post` (`PostID`),
  CONSTRAINT `FK_subsciber_cmt_post_subscriber` FOREIGN KEY (`SubID`) REFERENCES `subscriber` (`SubID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.subsciber_cmt_post: ~0 rows (approximately)
/*!40000 ALTER TABLE `subsciber_cmt_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `subsciber_cmt_post` ENABLE KEYS */;

-- Dumping structure for table magazine.subscriber
CREATE TABLE IF NOT EXISTS `subscriber` (
  `SubID` int(11) NOT NULL AUTO_INCREMENT,
  `Remain` int(11) NOT NULL DEFAULT '0',
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`SubID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.subscriber: ~0 rows (approximately)
/*!40000 ALTER TABLE `subscriber` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriber` ENABLE KEYS */;

-- Dumping structure for table magazine.tag
CREATE TABLE IF NOT EXISTS `tag` (
  `TagID` int(11) NOT NULL AUTO_INCREMENT,
  `TagName` varchar(45) NOT NULL DEFAULT '0',
  PRIMARY KEY (`TagID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

-- Dumping structure for table magazine.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `NickName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Birthday` date NOT NULL,
  `Role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table magazine.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `Name`, `NickName`, `Email`, `Birthday`, `Role`) VALUES
	(1, 'Huỳnh Anh', 'HA', 'huynhanhlongxuyen@gmail.com', '1998-03-16', 1),
	(2, 'Thanh Tâm', 'TT', 'lttam@gmail.com', '1998-06-11', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
