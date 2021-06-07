package com.project.be.charitable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.be.charitable.entities.FormT3010SectionCEntity;

/**
 * @author geeta
 *
 */
@Repository
public interface FormT3010SectionCRepository extends JpaRepository<FormT3010SectionCEntity, Long>{
	
	@Query(value = "select e.id from FormT3010SectionCEntity e where e.user_id=:userId")
	Long findDataIdByUserId(@Param("userId") Long userId);
	
	@Query(value = "select e from FormT3010SectionCEntity e where e.user_id=:userId")
	FormT3010SectionCEntity findByUserId(@Param("userId") Long userId);

}
