package com.project.be.charitable.dal;

import com.project.be.charitable.model.User;

/**
 * @author geeta
 *
 */
public interface UserDAL {
	
	User insertTestUser(User user);
	
	User getUserBy(String userName, String password);
	
}