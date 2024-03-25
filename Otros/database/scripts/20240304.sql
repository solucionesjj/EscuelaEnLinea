#drop table LegalGuardianQualify;
#drop table Aspects;
#drop table LegalGuardianQualifyCatalog;
#select * from LegalGuardianQualifyCatalog;
#select * from LegalGuardianQualify;
#select * from Aspects;

CREATE TABLE `notaenlinea`.`Aspects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aspect` VARCHAR(200) NOT NULL UNIQUE,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  );
  
CREATE TABLE `notaenlinea`.`LegalGuardianQualifyCatalog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qualify` VARCHAR(2000) NOT NULL,
  `idAspect` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (idAspect) REFERENCES Aspects(id)
  );
  
create table `notaenlinea`.`LegalGuardianQualify` (
`id` INT NOT NULL AUTO_INCREMENT,
`idMatriculations` INT NOT NULL, 
`bimestre` INT NOT NULL, 
`idLegalGuardianQualifyCatalog` INT NOT NULL, 
`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
`updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
FOREIGN KEY (idMatriculations) REFERENCES Matriculations(id),
FOREIGN KEY (idLegalGuardianQualifyCatalog) REFERENCES LegalGuardianQualifyCatalog(id)
);