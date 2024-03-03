drop procedure if exists createCoursesForYear;
delimiter //
create procedure createCoursesForYear () 
begin
	insert into Courses (course,`active`,createdAt,updatedAt,`order`,`year`,idDirector,idReportCardModel)
	select 	newCourse.course, 
			newCourse.active, 
			curdate(),
			curdate(),
			newCourse.order,
			year(curdate()),
			newCourse.idDirector, 
			newCourse.idReportCardModel 
	from 	Courses as newCourse
	where 	newCourse.year = year(curdate()) -1 
		and	not exists (select 	1 
						from 	Courses as existingCourse 
						where 	existingCourse.course = newCourse.course
							and	existingCourse.year = year(curdate()) 
						);
	SELECT concat('Cursos creados:', @rowcount);
end //