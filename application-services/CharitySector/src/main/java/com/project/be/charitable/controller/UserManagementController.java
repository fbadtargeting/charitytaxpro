package com.project.be.charitable.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.charitable.dto.CharityAuthRespDto;
import com.project.be.charitable.dto.CharityNewUserDto;
import com.project.be.charitable.dto.CharityUserAuthReq;
import com.project.be.charitable.dto.CharityUserAuthResp;
import com.project.be.charitable.dto.CharityUserRegistrationResp;
import com.project.be.charitable.service.UserManagementService;

/**
 * @author geeta
 *
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user-management/")
public class UserManagementController {

	private static final Logger logger = LoggerFactory.getLogger(UserManagementController.class);
	
	@Autowired
	UserManagementService userManagementService;
	
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
	
	@PostMapping(path = "registerUser", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<CharityUserRegistrationResp> registerUser(@RequestBody CharityNewUserDto charityNewUserDto){
		try{
			logger.info("Request received to register new user : {} ",charityNewUserDto.getUserName());
			return new ResponseEntity<>(userManagementService.createNewUser(charityNewUserDto),HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while creating new user : {} ",e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}	
	}
	
	@PostMapping(path = "authenticateUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CharityUserAuthResp> authenticateUser(@RequestBody CharityUserAuthReq charityUserAuthReq){
		try{
			logger.info("Request received to authenticate user : {} ",charityUserAuthReq.getUserName());
			return new ResponseEntity<>(userManagementService.authenticateUser(charityUserAuthReq),HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while authenticatiion : {} ",e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}	
	}
	
	
}

