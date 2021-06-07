package com.project.be.charitable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.charitable.entities.CharitableUserEntity;;

/**
 * @author geeta
 *
 */
@Repository
public interface CharitableUserRepository extends JpaRepository<CharitableUserEntity, Long> {
	
	CharitableUserEntity findByUserNameOrCharityName(String userName, String charityName);
	
	CharitableUserEntity findByUserNameAndPassword(String userName, String password);
	
	@Modifying
	@Transactional
	@Query(value = "update CharitableUserEntity e set e.isSubmitted=:state where e.userId=:userId")
	int updateSubmittedStateForUser(@Param("state") Boolean state, @Param("userId") Long userId);

}
