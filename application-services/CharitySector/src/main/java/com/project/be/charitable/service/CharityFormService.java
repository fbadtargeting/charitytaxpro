package com.project.be.charitable.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.GenericRespDTO;
import com.project.be.charitable.dto.UserAcceptDto;
import com.project.be.charitable.entities.CharitableUserEntity;
import com.project.be.charitable.repository.CharitableUserRepository;
import com.project.be.charitable.utility.CharitableUtilities;

import static com.project.be.charitable.utility.CharitableConstants.*;

/**
 * @author geeta
 *
 */
@Service
public class CharityFormService {
	
	private static final Logger logger = LoggerFactory.getLogger(CharityFormService.class);
	
	@Autowired
	ResourceLoader resourceLoader;
	
	@Autowired
	FormT3010Service formT3010Service;
	
	@Autowired
	FormT1235Service formT1235Service;
	
	@Autowired
	FormT1236Service formT1236Service;
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	@Value("${charitable.csv.path}")
	private String csvPath;
	
	@Value("${charitable.csv.filename}")
	private String csvFileName;
	
	@Value("${charitable.python.path-with-filename}")
	private String pythonPathWithFileName;
	
	@Value("${charitable.python.output-filename-suffix}")
	private String outputFilenameSuffix;
	
	public GenericRespDTO submitTaxForm(Long userId){

		logger.info("Submitting Charity Tax Form data for user id : {} ",userId);
		GenericRespDTO respDto = new GenericRespDTO();
		try{
			//update user table
			int updateStatus = charitableUserRepository.updateSubmittedStateForUser(Boolean.TRUE, userId);
			logger.info("Update status for Submit Form for user id : {} is : {} ",userId,updateStatus);
			
			Map<String, String> completeFormData = new HashMap<>();
			
			completeFormData.putAll(formT3010Service.createKeyValPairForT3010(userId));
			
			Map<String, String> t1235 = formT1235Service.getT1235DataInKeyValPair(userId);
			if(null != t1235 && !t1235.isEmpty())
				completeFormData.putAll(t1235);
			
			Map<String, String> t1236 = formT1236Service.getT1236DataInKeyValPair(userId);
			if(null != t1236 && !t1236.isEmpty())
				completeFormData.putAll(t1236);
			
			Optional<CharitableUserEntity> optUserEntityt = charitableUserRepository.findById(userId);
			if(optUserEntityt.isPresent()){
				logger.debug("User Entity found.");
				CharitableUserEntity existingUser = optUserEntityt.get();
				completeFormData.putAll(createUserAccMap(existingUser));
			}
		
			CharitableUtilities.convertKeyValPairToCsv(completeFormData, csvPath+userId+"/", csvFileName);
			
			//logger.debug("All sections of form t3010 save, now starting to create CSV file!");
			//createCompleteCsvForT3010(formT3010);
			
			//Calling python script - Not Required here. This will be required while download form
			//CharitableUtilities.executePythonToCreateDoc(pythonPathWithFileName, formT3010.getUser_id());
			respDto.setStatus(SUCCESS);
			respDto.setMessage(SUCCESS_SUBMIT_DOWNLOAD_MSG);
		}catch(Exception e){
			respDto.setStatus(FAIL);
			respDto.setMessage(SUBMIT_FAIL_MSG);
			logger.error("Error while submitting data : {} ",e);
		}
		return respDto;
	}
	

	public Resource prepareAndDownloadForm(Long userId, String formType, String lang){
		try{
			logger.info("In the prepareAndDownloadForm for user : {} form type : {} and lang : {} ",userId,formType,lang);
			//String completePathAndFile = csvPath+userId+"/"+csvFileName;
			//File file = new File(completePathAndFile);
			//logger.info("If CSV present or not for user id : {} path : {} exists is : {} ",userId,completePathAndFile,file.exists());
			//logger.info("Form Type is : {} ",formType);
			logger.debug("Calling method to create complete CSV......");
			Boolean csvCreated = createCsvFor(userId);
			logger.info("Status of CSV creation is : {} ",csvCreated);
			
			if(csvCreated){
				//String formTypePy = "t3010-20e";
				String langPy = "eng";
				/*if(formType.equals("T3010")){
				formTypePy = "t3010-20e";
			}else if(formType.equals("T1235")){
				formTypePy = "t1235-20e";
			}else if(formType.equals("T1236")){
				formTypePy = "t1236-19e";
			}*/

				if(lang.equals("en")){
					langPy = "eng";
				}else if(lang.equals("fr")){
					langPy = "french";
				} 

				CharitableUtilities.executePythonToCreateDoc(pythonPathWithFileName, userId, langPy, formType);

				//String fileName = csvPath+userId+"/t3010-20e_auto_out.docx";
				//String fileName = csvPath+userId+"/"+formType+"_"+langPy+"_out.docx";
				String fileName = csvPath+userId+"/"+formType+"_"+outputFilenameSuffix;
				logger.debug("File name to be downloaded is : {} ",fileName);
				Resource resource = resourceLoader.getResource("file:"+fileName);
				if(resource.exists())
					return resource;
				else
					return null;
			}else{
				logger.error("Error while creating CSV..");
				return null;
			}
		}catch(Exception e){
			logger.error("Error while fetching form : {} ",e);
			return null;
		}
	}
	
	/*
	public FormT3010Dto getT3010Form(Long userId){
		
		logger.info("Starting to Get all the form data for T3010..");
		FormT3010Dto dto = new FormT3010Dto();
		try{
			//
			FormT3010SectionADto formT3010SectionADto = formT3010SectionAService.getSectionAData(userId);
			if(null != formT3010SectionADto)
				dto.setT3010SecA(formT3010SectionADto);
			
			FormT3010SectionCDto formT3010SectionCDto = formT3010SectionCService.getSectionCData(userId);
			if(null != formT3010SectionCDto)
				dto.setT3010SecC(formT3010SectionCDto);
			
			FormT3010SectionDDto formT3010SectionDDto = formT3010SectionDService.getSectionDData(userId);
			if(null != formT3010SectionDDto)
				dto.setT3010SecD(formT3010SectionDDto);
			
			FormT3010SectionFDto formT3010SectionFDto = formT3010SectionFService.getSectionFData(userId);
			if(null != formT3010SectionFDto)
				dto.setT3010SecF(formT3010SectionFDto);
			////
		}catch(Exception e){
			logger.error("Error while fetching T3010 data : {} ",e);
		}
		return dto;
	}
	
	
	
	public void createCompleteCsvForT3010(FormT3010Dto formT3010){
		
		Map<String, String> completeFormData = new HashMap<>();
		logger.info("Received request to create complete CSV using DTO ");
		
		if(null != formT3010.getT3010SecA())
			completeFormData.putAll(formT3010SectionAService.getSectionADataInKeyValPair(formT3010.getT3010SecA()));
		
		if(null != formT3010.getT3010SecC())
			completeFormData.putAll(formT3010SectionCService.getSectionCDataInKeyValPair(formT3010.getT3010SecC()));
		
		if(null != formT3010.getT3010SecD())
			completeFormData.putAll(formT3010SectionDService.getSectionDDataInKeyValPair(formT3010.getT3010SecD()));
		
		if(null != formT3010.getT3010SecF())
			completeFormData.putAll(formT3010SectionFService.getSectionFDataInKeyValPair(formT3010.getT3010SecF()));
		
		CharitableUtilities.convertKeyValPairToCsv(completeFormData, csvPath+formT3010.getUser_id()+"/");
		
	}
	
	public void createCompleteCsvForUser(Long userId){
		
		Map<String, String> completeFormData = new HashMap<>();
		logger.info("Received request to create complete CSV for user id : {} ", userId);
		
		completeFormData.putAll(formT3010SectionAService.getSectionADataInKeyValPair(userId));
		completeFormData.putAll(formT3010SectionCService.getSectionCDataInKeyValPair(userId));
		completeFormData.putAll(formT3010SectionDService.getSectionDDataInKeyValPair(userId));
		completeFormData.putAll(formT3010SectionFService.getSectionFDataInKeyValPair(userId));
		
		CharitableUtilities.convertKeyValPairToCsv(completeFormData, csvPath+userId+"/");
		
	}*/
	
	public Resource getFormWithAbsPath(Long userId){
		try{
			String fileName = csvPath+userId+"/t3010-20e_auto_out.docx";
			Resource resource = resourceLoader.getResource("file:"+fileName);
			if(resource.exists())
				return resource;
			else
				return null;
		}catch(Exception e){
			logger.error("Error while fetching form : {} ",e);
			return null;
		}
	}
	
	
	/**
	 * As of now NR
	 * @param taxFormDto
	 * @return
	 */
	/*public GenericRespDTO saveTaxForm(TaxFormDto taxFormDto){

		logger.info("Starting to save all the form data ..");
		GenericRespDTO respDto = new GenericRespDTO();
		try{
			
			if(null != taxFormDto.getT3010Dto().getT3010SecA())
				formT3010SectionAService.saveSectionAData(taxFormDto.getT3010Dto().getT3010SecA());
			if(null != taxFormDto.getT3010Dto().getT3010SecC())
				formT3010SectionCService.saveSectionCData(taxFormDto.getT3010Dto().getT3010SecC());
			if(null != taxFormDto.getT3010Dto().getT3010SecD())
				formT3010SectionDService.saveSectionDData(taxFormDto.getT3010Dto().getT3010SecD());
			if(null != taxFormDto.getT3010Dto().getT3010SecF())
				formT3010SectionFService.saveSectionFData(taxFormDto.getT3010Dto().getT3010SecF());
			if(null != taxFormDto.getT1235Dto())
				formT1235Service.saveSectionAData(taxFormDto.getT1235Dto());
			if(null != taxFormDto.getT1236Dto())
				formT1236Service.saveSectionAData(taxFormDto.getT1236Dto());
			
			logger.debug("All sections of tax form  save, now starting to create CSV file!");
			createCompleteCsv(taxFormDto);
			
			//Calling python script
			CharitableUtilities.executePythonToCreateDoc(pythonPathWithFileName, taxFormDto.getUser_id());
			respDto.setStatus("SUCCESS");
			respDto.setMessage("Form saved successfully.");
		}catch(Exception e){
			respDto.setStatus("FAIL");
			respDto.setMessage("Error while saving form.");
			logger.error("Error while saving data : {} ",e);
		}
		return respDto;
	}
	
	public void createCompleteCsv(TaxFormDto taxFormDto){
		
		Map<String, String> completeFormData = new HashMap<>();
		logger.info("Received request to create complete CSV using DTO ");
		
		if(null != taxFormDto.getT3010Dto().getT3010SecA())
			completeFormData.putAll(formT3010SectionAService.getSectionADataInKeyValPair(taxFormDto.getT3010Dto().getT3010SecA()));
		
		if(null != taxFormDto.getT3010Dto().getT3010SecC())
			completeFormData.putAll(formT3010SectionCService.getSectionCDataInKeyValPair(taxFormDto.getT3010Dto().getT3010SecC()));
		
		if(null != taxFormDto.getT3010Dto().getT3010SecD())
			completeFormData.putAll(formT3010SectionDService.getSectionDDataInKeyValPair(taxFormDto.getT3010Dto().getT3010SecD()));
		
		if(null != taxFormDto.getT3010Dto().getT3010SecF())
			completeFormData.putAll(formT3010SectionFService.getSectionFDataInKeyValPair(taxFormDto.getT3010Dto().getT3010SecF()));
		
		if(null != taxFormDto.getT1235Dto())
			completeFormData.putAll(formT1235Service.getSectionADataInKeyValPair(taxFormDto.getT1235Dto()));
		
		if(null != taxFormDto.getT1236Dto())
			completeFormData.putAll(formT1236Service.getSectionADataInKeyValPair(taxFormDto.getT1236Dto()));
		
		CharitableUtilities.convertKeyValPairToCsv(completeFormData, csvPath+taxFormDto.getUser_id()+"/");
		
	}
	*/
	
	public Boolean createCsvFor(Long userId){
		logger.info("Creating CSV for user id : {} ",userId);
		try{
			Map<String, String> completeFormData = new HashMap<>();
			completeFormData.putAll(formT3010Service.createKeyValPairForT3010(userId));
			Map<String, String> t1235 = formT1235Service.getT1235DataInKeyValPair(userId);
			if(null != t1235 && !t1235.isEmpty())
				completeFormData.putAll(t1235);

			Map<String, String> t1236 = formT1236Service.getT1236DataInKeyValPair(userId);
			if(null != t1236 && !t1236.isEmpty())
				completeFormData.putAll(t1236);
			
			Optional<CharitableUserEntity> optUserEntityt = charitableUserRepository.findById(userId);
			if(optUserEntityt.isPresent()){
				logger.debug("User Entity found.");
				CharitableUserEntity existingUser = optUserEntityt.get();
				completeFormData.putAll(createUserAccMap(existingUser));
			}

			logger.debug("Size of Complete Form Data for creating CSV is : {} ",completeFormData.size());
			CharitableUtilities.convertKeyValPairToCsv(completeFormData, csvPath+userId+"/", csvFileName);
			logger.debug("CSV file created successfully for user : {} ",userId);
			
		}catch(Exception e){
			logger.error("Error while submitting data : {} ",e);
			return false;
		}
		return true;
	}
	
	public Boolean saveUserAcceptanceData(Long userId, UserAcceptDto userAccept){
		try{
			logger.info("User Acceptance Data Save start for user : {} ",userId);
			Optional<CharitableUserEntity> optUserEntityt = charitableUserRepository.findById(userId);
			if(optUserEntityt.isPresent()){
				logger.debug("User Entity found and start saving the parameters..");
				CharitableUserEntity existingUser = optUserEntityt.get();
				existingUser.setPrivacyStatement(userAccept.isPrivacyStatement());
				existingUser.setCopyOfFinancialStatements(userAccept.isCopyOfFinancialStatements());
				existingUser.setFilledFormT3010(userAccept.isFilledFormT3010());
				existingUser.setFilledFormT1235(userAccept.isFilledFormT1235());
				existingUser.setFilledFormT1236(userAccept.isFilledFormT1236());
				existingUser.setFilledFormT2081(userAccept.isFilledFormT2081());
				existingUser.setFilledFormRC232(userAccept.isFilledFormRC232());
				logger.info("Now saving user acceptance data ..");
				charitableUserRepository.save(existingUser);
			}
		}catch(Exception e){
			logger.error("Error while saving user acceptance data : {} ",e);
			return false;
		}
		return true;
	}
	
	public Map<String,String> createUserAccMap(CharitableUserEntity user){
		Map<String, String> userAccMap = new HashMap<>();
		try{
			userAccMap.put("privacyStatement",user.getPrivacyStatement().toString());
			userAccMap.put("copyOfFinancialStatements",user.getCopyOfFinancialStatements().toString());
			userAccMap.put("filledFormT3010",user.getFilledFormT3010().toString());
			userAccMap.put("filledFormT1235",user.getFilledFormT1235().toString());
			userAccMap.put("filledFormT1236",user.getFilledFormT1236().toString());
			userAccMap.put("filledFormT2081",user.getFilledFormT2081().toString());
			userAccMap.put("filledFormRC232",user.getFilledFormRC232().toString());	
		}catch(Exception e){
			logger.error("Error While creating map for user acceptance : {} ",e);
		}
		return userAccMap;
	}
}
