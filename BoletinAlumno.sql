#select * from vBoletin
create or replace view vBoletin as
select	c.year,
		c.id as idCourse, 
		c.course, 
        c.order as courseOrder,
        m.idStudent, 
        u.surname, 
        u.name, 
        al.id as idAcademicLoad, 
		a.id as idArea,
        a.area, 
        al.hoursPerWeek, 
        mt.id as idMatter,
        mt.matter, 
        ifnull(fg1.grade,0) as P1_grade, 
        ifnull(rg1.grade,0) as P1_recovery,
		case when ifnull(fg1.grade,0) > ifnull(rg1.grade,0) then ifnull(fg1.grade,0) else ifnull(rg1.grade,0) end as P1_finalGrade,
        
		ifnull(fg2.grade,0) as P2_grade, 
        ifnull(rg2.grade,0) as P2_recovery,
		case when ifnull(fg2.grade,0) > ifnull(rg2.grade,0) then ifnull(fg2.grade,0) else ifnull(rg2.grade,0) end as P2_finalGrade,
        
		ifnull(fg3.grade,0) as P3_grade, 
        ifnull(rg3.grade,0) as P3_recovery,
		case when ifnull(fg3.grade,0) > ifnull(rg3.grade,0) then ifnull(fg3.grade,0) else ifnull(rg3.grade,0) end as P3_finalGrade,
        
		ifnull(fg4.grade,0) as P4_grade, 
        ifnull(rg4.grade,0) as P4_recovery,
		case when ifnull(fg4.grade,0) > ifnull(rg4.grade,0) then ifnull(fg4.grade,0) else ifnull(rg4.grade,0) end as P4_finalGrade,
        
		((case when ifnull(fg1.grade,0) > ifnull(rg1.grade,0) then ifnull(fg1.grade,0) else ifnull(rg1.grade,0) end +
		case when ifnull(fg2.grade,0) > ifnull(rg2.grade,0) then ifnull(fg2.grade,0) else ifnull(rg2.grade,0) end +
		case when ifnull(fg3.grade,0) > ifnull(rg3.grade,0) then ifnull(fg3.grade,0) else ifnull(rg3.grade,0) end +
		case when ifnull(fg4.grade,0) > ifnull(rg4.grade,0) then ifnull(fg4.grade,0) else ifnull(rg4.grade,0) end) / 4) as yearGrade
from Courses as c 
inner join Matriculations as m
	on m.idCourse = c.id
inner join Users as u
	on m.idStudent = u.id
left join AcademicLoads as al
	on al.idCourse = c.id
left join Matters as mt 
	on mt.id = al.idMatter
left join Areas as a
	on mt.idArea = a.id
    
left join (	select 	gd.idAcademicLoad, gd.period, gi.idStudent, sum((gi.grade * gd.weight)/100) as grade
			from	GradeDefinitions as gd
			inner join GradeInformations as gi
				on gi.idGradeDefinition = gd.id
				and gi.period = gd.period
                and gd.period = 1
			group by gd.idAcademicLoad, gd.period, gi.idStudent
			) fg1
	on fg1.idAcademicLoad = al.id
    and fg1.idStudent = m.idStudent
    
left join (	select idAcademicLoad, idStudent, period, max(grade) as grade 
			from RecoveryGrades 
            where period = 1
			group by idAcademicLoad, idStudent, period
            ) rg1
	on rg1.idAcademicLoad = al.id
    and rg1.idStudent = m.idStudent
    
left join (	select 	gd.idAcademicLoad, gd.period, gi.idStudent, sum((gi.grade * gd.weight)/100) as grade
			from	GradeDefinitions as gd
			inner join GradeInformations as gi
				on gi.idGradeDefinition = gd.id
				and gi.period = gd.period
                and gd.period = 2
			group by gd.idAcademicLoad, gd.period, gi.idStudent
			) fg2
	on fg2.idAcademicLoad = al.id
    and fg2.idStudent = m.idStudent
    
left join (	select idAcademicLoad, idStudent, period, max(grade) as grade 
			from RecoveryGrades 
            where period = 2
			group by idAcademicLoad, idStudent, period
            ) rg2
	on rg2.idAcademicLoad = al.id
    and rg2.idStudent = m.idStudent
    
left join (	select 	gd.idAcademicLoad, gd.period, gi.idStudent, sum((gi.grade * gd.weight)/100) as grade
			from	GradeDefinitions as gd
			inner join GradeInformations as gi
				on gi.idGradeDefinition = gd.id
				and gi.period = gd.period
                and gd.period = 3
			group by gd.idAcademicLoad, gd.period, gi.idStudent
			) fg3
	on fg3.idAcademicLoad = al.id
    and fg3.idStudent = m.idStudent
    
left join (	select idAcademicLoad, idStudent, period, max(grade) as grade 
			from RecoveryGrades 
            where period = 3
			group by idAcademicLoad, idStudent, period
            ) rg3
	on rg3.idAcademicLoad = al.id
    and rg3.idStudent = m.idStudent

left join (	select 	gd.idAcademicLoad, gd.period, gi.idStudent, sum((gi.grade * gd.weight)/100) as grade
			from	GradeDefinitions as gd
			inner join GradeInformations as gi
				on gi.idGradeDefinition = gd.id
				and gi.period = gd.period
                and gd.period = 4
			group by gd.idAcademicLoad, gd.period, gi.idStudent
			) fg4
	on fg4.idAcademicLoad = al.id
    and fg4.idStudent = m.idStudent
    
left join (	select idAcademicLoad, idStudent, period, max(grade) as grade 
			from RecoveryGrades 
            where period = 4
			group by idAcademicLoad, idStudent, period
            ) rg4
	on rg4.idAcademicLoad = al.id
    and rg4.idStudent = m.idStudent
order by c.order, u.surname, u.name, a.order, mt.matter;