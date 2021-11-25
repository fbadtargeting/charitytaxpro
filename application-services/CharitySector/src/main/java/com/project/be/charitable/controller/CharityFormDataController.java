package com.project.be.charitable.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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

import com.project.be.charitable.dto.GenericRespDTO;
import com.project.be.charitable.dto.MasterDtoT1235;
import com.project.be.charitable.dto.MasterDtoT1236;
import com.project.be.charitable.dto.MasterDtoT3010;
import com.project.be.charitable.dto.UserAcceptDto;
import com.project.be.charitable.service.CharityFormService;
import com.project.be.charitable.service.FormT1235Service;
import com.project.be.charitable.service.FormT1236Service;
import com.project.be.charitable.service.FormT3010Service;

/**
 * @author geeta
 *
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/charity-form/")
public class CharityFormDataController {

	private static final Logger logger = LoggerFactory.getLogger(CharityFormDataController.class);

	@Autowired
	FormT3010Service formT3010Service;

	@Autowired
	FormT1235Service formT1235Service;

	@Autowired
	FormT1236Service formT1236Service;

	@Autowired
	CharityFormService charityFormService;

	/*
	@PostMapping(path = "saveTaxForm", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<GenericRespDTO> saveTaxForm(@RequestBody TaxFormDto taxFormDto){
		try{
			logger.info("Request recieved to save Complete Form ");
			return new ResponseEntity<>(formT3010Service.saveTaxForm(taxFormDto), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while saving Complete Form ");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}*/

	/**
	 * 
	 * @param formT3010
	 * @return GenericRespDTO
	 * This will save FormT3010 with given section
	 */
	@PostMapping(path = "saveFormT3010", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<GenericRespDTO> saveFormT3010(@RequestBody MasterDtoT3010 masterT3010){
		try{
			logger.info("Request recieved to save Form T3010 for user : {} ",masterT3010.getUserId());
			Boolean status = charityFormService.saveUserAcceptanceData(masterT3010.getUserId(), masterT3010.getUserAccept());
			logger.info("Status of saving user acceptance is : {}  and now going to save form data ..",status);
			return new ResponseEntity<>(formT3010Service.saveT3010Form(masterT3010.getT3010()), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while saving Form T3010");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(path = "getFormT3010/{userId}", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<MasterDtoT3010> getFormT3010(@PathVariable("userId") Long userId){
		try{
			logger.info("Request recieved to get Form T3010");
			return new ResponseEntity<>(formT3010Service.getT3010Form(userId), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while getting Form T3010");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * @param formT1235
	 * @return
	 * This will save FormT1235
	 */
	@PostMapping(path = "saveFormT1235", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<GenericRespDTO> saveFormT1235(@RequestBody MasterDtoT1235 masterT1235){
		try{
			logger.info("Request recieved to save Form T1235 for user : {} ",masterT1235.getUserId());
			Boolean status = charityFormService.saveUserAcceptanceData(masterT1235.getUserId(), masterT1235.getUserAccept());
			logger.info("Status of saving user acceptance is : {}  and now going to save form data ..",status);
			return new ResponseEntity<>(formT1235Service.saveT1235Data(masterT1235.getT1235()), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while saving Form T1235");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(path = "getFormT1235/{userId}", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<MasterDtoT1235> getFormT1235(@PathVariable("userId") Long userId){
		try{
			logger.info("Request recieved to get Form T1235");
			return new ResponseEntity<>(formT1235Service.getFormT1235Data(userId), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while getting Form T1235");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * @param formT1236
	 * @return
	 * This will save FormT1236
	 */
	@PostMapping(path = "saveFormT1236", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<GenericRespDTO> saveFormT1236(@RequestBody MasterDtoT1236 masterT1236){
		try{
			logger.info("Request recieved to save Form T1236 for user : {} ",masterT1236.getUserId());
			Boolean status = charityFormService.saveUserAcceptanceData(masterT1236.getUserId(), masterT1236.getUserAccept());
			logger.info("Status of saving user acceptance is : {}  and now going to save form data ..",status);
			return new ResponseEntity<>(formT1236Service.saveT1236Data(masterT1236.getT1236()), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while saving Form T1236");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(path = "getFormT1236/{userId}", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<MasterDtoT1236> getFormT1236(@PathVariable("userId") Long userId){
		try{
			logger.info("Request recieved to get Form T1236");
			return new ResponseEntity<>(formT1236Service.getFormT1236Data(userId), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while getting Form T1236");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}


	/**
	 * 
	 * @param userId
	 * @return
	 * This will be to submit complete form
	 */
	@PostMapping(path = "submitTaxForm", produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<GenericRespDTO> submitTaxForm(@RequestBody UserAcceptDto userAcceptDto){
		try{
			logger.info("Request recieved to Submit Complete Form ");
			Boolean status = charityFormService.saveUserAcceptanceData(userAcceptDto.getUserId(), userAcceptDto);
			logger.info("Status of saving user acceptance is : {}  and now going to save form data ..",status);
			return new ResponseEntity<>(charityFormService.submitTaxForm(userAcceptDto.getUserId()), HttpStatus.OK);
		}catch(Exception e){
			logger.error("Error while getting Form T3010");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * @param userId
	 * @param formType
	 * @param lang
	 * @return
	 */
	@GetMapping(path = "downloadCharityForm/{userId}/{formType}/{lang}")
	public ResponseEntity<Resource> downloadCharityForm(@PathVariable("userId") Long userId,
			@PathVariable("formType") String formType, @PathVariable("lang") String lang) {
		logger.debug("Preparing and Downloading Form Type : {} for user id : {} and language : {} ",formType,userId,lang);
		Resource resource = charityFormService.prepareAndDownloadForm(userId, formType, lang);
		if(null == resource)
			return ResponseEntity.noContent().build();
		else
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(MediaType.APPLICATION_OCTET_STREAM_VALUE))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
					.body(resource);
	}

	//Check below

	@GetMapping(path = "downloadForm/{userId}")
	public ResponseEntity<Resource> downloadNodeTemplate(@PathVariable("userId") Long userId) {
		logger.debug("Downloading form for user id : {} ", userId);
		Resource resource = formT3010Service.getFormWithAbsPath(userId);
		if(null == resource)
			return ResponseEntity.noContent().build();
		else
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(MediaType.APPLICATION_OCTET_STREAM_VALUE))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
					.body(resource);
	}



}