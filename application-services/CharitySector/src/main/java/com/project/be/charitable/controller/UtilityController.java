package com.project.be.charitable.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.charitable.service.UtilityService;

/**
 * @author geeta
 *
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/utility/")
public class UtilityController {

	private static final Logger logger = LoggerFactory.getLogger(UtilityController.class);
	
	@Autowired
	UtilityService utilityService;
	
	
	@GetMapping(path = "createTestCsv", produces = MediaType.APPLICATION_JSON_VALUE )
	public void createTestCsv(){
		logger.info("Request recieved to create Test CSV File..");
		
		utilityService.createTestCsv();
	}
	
	
}

