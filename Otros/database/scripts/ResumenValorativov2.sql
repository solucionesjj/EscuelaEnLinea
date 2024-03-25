drop procedure if exists getValorativeResume;

delimiter $$
create procedure `getValorativeResume` (idCourse int)
BEGIN
declare sqlQuery1 text default 'create table temporalValorativeResumen ( idStudent integer, period int, generalAverage decimal(10,2) ';
declare sqlQuery text default '';
declare idMatter int default 0;
declare done int default 0;
declare matterCursor cursor for 
select distinct al.idMatter 
from AcademicLoads as al 
inner join Matters as m
on m.id = al.idMatter
inner join Areas as a
on a.id = m.idArea
where al.idCourse = idCourse
order by a.order, m.matter;
declare continue handler for not found set done = 1;

open matterCursor;

matterCursorLoop: loop

fetch matterCursor into idMatter;

if (done) then 
	leave matterCursorLoop;
end if;

set sqlQuery1 = concat(sqlQuery1,', `',idMatter,'` decimal(10,2) null');

end loop matterCursorLoop;
close matterCursor;

set sqlQuery1 = concat(sqlQuery1,');');

prepare executeSqlQuery from 'drop table if exists temporalValorativeResumen';
execute executeSqlQuery;
deallocate prepare executeSqlQuery;

set @sqlQuery1 = sqlQuery1;

prepare executeSqlQuery from @sqlQuery1;
execute executeSqlQuery;
deallocate prepare executeSqlQuery;


insert into temporalValorativeResumen (idStudent, period)
select u.id as idStudent, period.period
from Courses as c
inner join Matriculations as m
 on c.id = m.idCourse 
inner join Users as u
 on u.id = m.idStudent 
, (select 1 as period union select 2 union select 3 union select 4) period
where c.id = idCourse
order by u.id, period.period;

prepare executeSqlQuery from 'drop table if exists temporalGrades';
execute executeSqlQuery;
deallocate prepare executeSqlQuery;

create temporary table temporalGrades 
select al.idMatter, gd.period, gi.idStudent , avg(gi.grade) average
from AcademicLoads as al 
inner join GradeDefinitions as gd
 on al.id  = gd.idAcademicLoad 
left join GradeInformations as gi
 on gi.idGradeDefinition = gd.id 
where al.idCourse = idCourse
group by gd.period , al.idMatter , gi.idStudent ; 

set done = 0;

open matterCursor;
matterCursorLoop: loop
fetch matterCursor into idMatter;

if (done) then 
	leave matterCursorLoop;
end if;

set @sqlQuery = concat('update temporalValorativeResumen as a inner join temporalGrades as b on  (b.idStudent = a.idStudent and b.period = a.period and b.idMatter = ',idMatter,') set `',idMatter,'` = b.average');

prepare executeSqlQuery from @sqlQuery;
execute executeSqlQuery;
deallocate prepare executeSqlQuery;

end loop matterCursorLoop;

close matterCursor;

prepare executeSqlQuery from 'drop table if exists temporalGeneralAverage';
execute executeSqlQuery;
deallocate prepare executeSqlQuery;

create temporary table temporalGeneralAverage
select idStudent, period, avg(average) generalAverage
from (
select al.idMatter, gd.period, gi.idStudent , avg(gi.grade) average
from AcademicLoads as al 
inner join GradeDefinitions as gd
 on al.id  = gd.idAcademicLoad 
left join GradeInformations as gi
 on gi.idGradeDefinition = gd.id 
where al.idCourse = idCourse
group by gd.period , al.idMatter , gi.idStudent 
order by gd.period, al.idMatter, gi.idStudent
) grades
group by idStudent, period;

update temporalValorativeResumen as a
inner join temporalGeneralAverage as b 
on (a.idStudent = b.idStudent and a.period = b.period )
set a.generalAverage = b.generalAverage;

insert into temporalValorativeResumen (idStudent,period,generalAverage)
select idStudent,5 as period,avg(generalAverage) generalAverage from  temporalValorativeResumen group by idStudent;


set done = 0;

open matterCursor;
matterCursorLoop: loop
fetch matterCursor into idMatter;

if (done) then 
	leave matterCursorLoop;
end if;

set @sqlQuery = concat('update temporalValorativeResumen as a inner join (select idStudent, 5 as period, avg(`',idMatter,'`) as generalAverage from temporalValorativeResumen group by idStudent) generalAverageByMatter on (a.idStudent = generalAverageByMatter.idStudent and a.period = generalAverageByMatter.period ) set a.`',idMatter,'` = generalAverageByMatter.generalAverage');

prepare executeSqlQuery from @sqlQuery;
execute executeSqlQuery;
deallocate prepare executeSqlQuery;

end loop matterCursorLoop;

close matterCursor;

select * from temporalValorativeResumen order by idStudent,period;

end; $$

delimiter ;

call getValorativeResume(9);