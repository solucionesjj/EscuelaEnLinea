#select * from vBoletinCompleteInfo
create or replace view vBoletinCompleteInfo as
select 	b.year,
		b.idCourse, 
		b.course, 
        b.idStudent, 
        b.surname, 
        b.name, 
        b.idAcademicLoad, 
        
		b.idArea,
        b.area, 
        b.hoursPerWeek, 
        b.idMatter,
        b.matter, 
        
        pd1.description as P1_Observation,
        areaInfo.P1_gradeByArea,
        b.P1_grade, 
        b.P1_recovery,
		b.P1_finalGrade,
        
        pd2.description as P2_Observation,
        areaInfo.P2_gradeByArea,
		b.P2_grade, 
        b.P2_recovery,
		b.P2_finalGrade,
        
        pd3.description as P3_Observation,
        areaInfo.P3_gradeByArea,
		b.P3_grade, 
        b.P3_recovery,
		b.P3_finalGrade,
        
        pd4.description as P4_Observation,
        areaInfo.P4_gradeByArea,
		b.P4_grade, 
        b.P4_recovery,
		b.P4_finalGrade,
        
		b.yearGrade
from 	vBoletin as b
inner join ( select	year, 
					idCourse, 
					idStudent, 
					idArea, 
					avg(P1_finalGrade) as P1_gradeByArea, 
					avg(P2_finalGrade) as P2_gradeByArea, 
					avg(P3_finalGrade) as P3_gradeByArea, 
					avg(P4_finalGrade) as P4_gradeByArea
			from 	vBoletin 
			group by year, idCourse, idStudent, idArea
			) areaInfo
	on areaInfo.year = b.year
	and areaInfo.idCourse = b.idCourse
	and areaInfo.idStudent = b.idStudent
	and areaInfo.idArea = b.idArea
left join (	select 	pd.idAcademicLoad,
					p.performance, 
					pd.description,
                    pd.period,
                    p.from,
                    p.to
			from performanceDefinitions as pd 
			inner join Performances as p
				on pd.idPerformance = p.id 
		) pd1
	on pd1.idAcademicLoad = b.idAcademicLoad
    and pd1.period = 1
    and b.P1_finalGrade between pd1.from and pd1.to
    
left join (	select 	pd.idAcademicLoad,
					p.performance, 
					pd.description,
                    pd.period,
                    p.from,
                    p.to
			from performanceDefinitions as pd 
			inner join Performances as p
				on pd.idPerformance = p.id 
		) pd2
	on pd2.idAcademicLoad = b.idAcademicLoad
    and pd2.period = 2
    and b.P2_finalGrade between pd2.from and pd2.to
    
left join (	select 	pd.idAcademicLoad,
					p.performance, 
					pd.description,
                    pd.period,
                    p.from,
                    p.to
			from performanceDefinitions as pd 
			inner join Performances as p
				on pd.idPerformance = p.id 
		) pd3
	on pd3.idAcademicLoad = b.idAcademicLoad
    and pd3.period = 3
    and b.P3_finalGrade between pd3.from and pd3.to
   
left join (	select 	pd.idAcademicLoad,
					p.performance, 
					pd.description,
                    pd.period,
                    p.from,
                    p.to
			from performanceDefinitions as pd 
			inner join Performances as p
				on pd.idPerformance = p.id 
		) pd4
	on pd4.idAcademicLoad = b.idAcademicLoad
    and pd4.period = 4
    and b.P4_finalGrade between pd4.from and pd4.to;