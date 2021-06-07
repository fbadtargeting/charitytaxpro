package com.project.be.charitable.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.charitable.dto.CharityAuthRespDto;
import com.project.be.charitable.service.MongoUserManagementService;

/**
 * @author geeta
 *o
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/mongo/user-management/")
public class MongoUserManagementController {

	private static final Logger logger = LoggerFactory.getLogger(MongoUserManagementController.class);
	
	@Autowired
	MongoUserManagementService userManagementService;
	
	@GetMapping(path = "insertTestUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public void insertTestUser(){
		userManagementService.insertTestUser();
	}
	
	@GetMapping(path = "authenticateCharity", produces = MediaType.APPLICATION_JSON_VALUE)
	public CharityAuthRespDto authenticateCharity(@PathVariable("charityName") String charityName){
		logger.info("Authenticating Charity : {} ",charityName);
		//TODO
		return null;
	}
}

