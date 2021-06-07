package com.project.be.charitable.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dal.UserDAL;
import com.project.be.charitable.model.User;

/**
 * @author geeta
 *
 */
@Service
public class MongoUserManagementService {
	
	@Autowired
	UserDAL userDataAccessLayer;
	
	public void insertTestUser(){
		
		User user = new User();
		user.setUserName("Test");
		user.setPassword("Test");
		user.setCharityName("TestCharity");
		user.setEmail("test.test@test.com");
		user.setCreationDate(new Date());
		
		userDataAccessLayer.insertTestUser(user);
		
	}

}
