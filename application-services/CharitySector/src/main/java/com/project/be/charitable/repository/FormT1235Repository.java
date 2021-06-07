package com.project.be.charitable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.be.charitable.entities.FormT1235Entity;

/**
 * @author geeta
 *
 */
@Repository
public interface FormT1235Repository extends JpaRepository<FormT1235Entity, Long>{
	
	@Query(value = "select e.id from FormT1235Entity e where e.user_id=:userId")
	Long findDataIdByUserId(@Param("userId") Long userId);
	
	@Query(value = "select e from FormT1235Entity e where e.user_id=:userId")
	FormT1235Entity findByUserId(@Param("userId") Long userId);

}
