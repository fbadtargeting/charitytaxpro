package com.project.be.charitable.dal.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.project.be.charitable.dal.UserDAL;
import com.project.be.charitable.model.User;

/**
 * @author geeta
 *
 */
@Repository
public class UserDALImpl implements UserDAL{

	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Override
	public User insertTestUser(User user) {
		User savedUser = mongoTemplate.save(user);
		return savedUser;
	}
	
	@Override
	public User getUserBy(String userName, String password) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName).andOperator(Criteria.where("password").is(password)));
		return mongoTemplate.findOne(query, User.class);
	}

}
