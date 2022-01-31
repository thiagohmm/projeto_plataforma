
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `equipamentos` (
  `id_equip` int(11) NOT NULL AUTO_INCREMENT,
  `nome_equip` varchar(100) DEFAULT NULL,
  `tipo_equip` varchar(100) DEFAULT NULL,
  `local_equip` varchar(100) DEFAULT NULL,
  `inf_equip` varchar(100) DEFAULT NULL,
  `equip_plat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_equip`),
  KEY `equipamentos_FK` (`equip_plat_id`),
  CONSTRAINT `equipamentos_FK` FOREIGN KEY (`equip_plat_id`) REFERENCES `plataforma` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `node` (
  `id_node` int(11) NOT NULL AUTO_INCREMENT,
  `nome_node` varchar(100) NOT NULL,
  `ssh_node` varchar(100) DEFAULT NULL,
  `vnc_node` varchar(100) DEFAULT NULL,
  `router_node` varchar(100) NOT NULL,
  `host_plat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_node`),
  KEY `node_FK` (`host_plat_id`),
  CONSTRAINT `node_FK` FOREIGN KEY (`host_plat_id`) REFERENCES `plataforma` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `node` WRITE;
/*!40000 ALTER TABLE `node` DISABLE KEYS */;
/*!40000 ALTER TABLE `node` ENABLE KEYS */;
UNLOCK TABLES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `plataforma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_plataforma` varchar(100) NOT NULL,
  `alias_plataforma` varchar(100) DEFAULT NULL,
  `active_plataforma` smallint(6) DEFAULT NULL,
  `host_projt_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plataforma_FK` (`host_projt_id`),
  CONSTRAINT `plataforma_FK` FOREIGN KEY (`host_projt_id`) REFERENCES `projetos` (`id_projeto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `plataforma` WRITE;
/*!40000 ALTER TABLE `plataforma` DISABLE KEYS */;
REPLACE INTO `plataforma` VALUES (1,'undefined','plat_dev',1,1),(2,'undefined','plat_sag',1,1),(3,'undefined','alias_teste',1,1),(4,'teste1','aliastet',1,1),(5,'SAG_2.7_DEV1','dasasd',1,2),(6,'dsadasd','gfdgfd',1,1),(7,'Teste4','teste4',1,2),(8,'teste5','fhgg',1,5),(9,'dsadsa','dsadsadsa',1,1),(10,'OPMET TESTE','opt_teste',0,3),(11,'plataotetetete','tetetet',1,1),(12,'bfbfg','bgbgfbg',0,1),(13,'fsdfsfsd','fdsfdsfdf',1,3),(14,'fdsfdsfsdfsd','fdsfdsffds',0,3),(15,'fdsfdsfdsfdsfd','fdsfdsfsdfds',0,3),(16,'fsdfdsfsdf','gfdgfdgfd',1,1),(17,'ljkkjlkljk','6574646546',1,5),(18,'gdgfdf','gfdgdg',0,3),(19,'gfdgfd','gfdgfd',0,1);
/*!40000 ALTER TABLE `plataforma` ENABLE KEYS */;
UNLOCK TABLES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `projetos` (
  `id_projeto` int(11) NOT NULL AUTO_INCREMENT,
  `nome_projeto` varchar(100) NOT NULL,
  PRIMARY KEY (`id_projeto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
REPLACE INTO `projetos` VALUES (1,'Platão'),(2,'Sagitário'),(3,'Opmet'),(4,'Cosmos'),(5,'Sigma');
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `passwd_user` varchar(100) DEFAULT NULL,
  `user_user` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

