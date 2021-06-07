package com.project.be.charitable.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT3010Dto;
import com.project.be.charitable.dto.FormT3010SectionADto;
import com.project.be.charitable.dto.FormT3010SectionCDto;
import com.project.be.charitable.dto.FormT3010SectionDDto;
import com.project.be.charitable.dto.FormT3010SectionEDto;
import com.project.be.charitable.dto.FormT3010SectionFDto;
import com.project.be.charitable.dto.GenericRespDTO;
import com.project.be.charitable.utility.CharitableUtilities;

/**
 * @author geeta
 *
 */
@Service
public class FormT3010Service {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT3010Service.class);
	
	@Autowired
	ResourceLoader resourceLoader;
	
	@Autowired
	FormT3010SectionAService formT3010SectionAService;
	
	@Autowired
	FormT3010SectionCService formT3010SectionCService;
	
	@Autowired
	FormT3010SectionDService formT3010SectionDService;
	
	@Autowired
	FormT3010SectionEService formT3010SectionEService;
	
	@Autowired
	FormT3010SectionFService formT3010SectionFService;
	
	@Value("${charitable.csv.path}")
	private String csvPath;
	
	@Value("${charitable.csv.filename}")
	private String csvFileName;
	
	@Value("${charitable.python.path-with-filename}")
	private String pythonPathWithFileName;
	
	public GenericRespDTO saveT3010Form(FormT3010Dto formT3010){

		logger.info("Starting to save all the form data for T3010..");
		GenericRespDTO respDto = new GenericRespDTO();
		try{
			
			if(null != formT3010.getT3010SecA())
				formT3010SectionAService.saveSectionAData(formT3010.getT3010SecA());
			if(null != formT3010.getT3010SecC())
				formT3010SectionCService.saveSectionCData(formT3010.getT3010SecC());
			if(null != formT3010.getT3010SecD())
				formT3010SectionDService.saveSectionDData( formT3010.getT3010SecD());
			if(null != formT3010.getT3010SecE())
				formT3010SectionEService.saveSectionEData( formT3010.getT3010SecE());
			if(null != formT3010.getT3010SecF())
				formT3010SectionFService.saveSectionFData(formT3010.getT3010SecF());
			
			//logger.debug("All sections of form t3010 save, now starting to create CSV file!");
			//createCompleteCsvForT3010(formT3010);
			
			//Calling python script - Not Required here. This will be required while download form
			//CharitableUtilities.executePythonToCreateDoc(pythonPathWithFileName, formT3010.getUser_id());
			respDto.setStatus("SUCCESS");
			respDto.setMessage("Form saved successfully.");
		}catch(Exception e){
			respDto.setStatus("FAIL");
			respDto.setMessage("Error while saving form.");
			logger.error("Error while saving data : {} ",e);
		}
		return respDto;
	}
	
	public FormT3010Dto getT3010Form(Long userId){
		
		logger.info("Starting to Get all the form data for T3010..");
		FormT3010Dto dto = new FormT3010Dto();
		try{
			FormT3010SectionADto formT3010SectionADto = formT3010SectionAService.getSectionAData(userId);
			if(null != formT3010SectionADto)
				dto.setT3010SecA(formT3010SectionADto);
			
			FormT3010SectionCDto formT3010SectionCDto = formT3010SectionCService.getSectionCData(userId);
			if(null != formT3010SectionCDto)
				dto.setT3010SecC(formT3010SectionCDto);
			
			FormT3010SectionDDto formT3010SectionDDto = formT3010SectionDService.getSectionDData(userId);
			if(null != formT3010SectionDDto)
				dto.setT3010SecD(formT3010SectionDDto);
			
			FormT3010SectionEDto formT3010SectionEDto = formT3010SectionEService.getSectionEData(userId);
			if(null != formT3010SectionEDto)
				dto.setT3010SecE(formT3010SectionEDto);
			
			FormT3010SectionFDto formT3010SectionFDto = formT3010SectionFService.getSectionFData(userId);
			if(null != formT3010SectionFDto)
				dto.setT3010SecF(formT3010SectionFDto);
			
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
		
		CharitableUtilities.convertKeyValPairToCsv(completeFormData, csvPath+formT3010.getUser_id()+"/", csvFileName);
		
	}
	
	public Map<String, String> createKeyValPairForT3010(Long userId){
		
		Map<String, String> t3010FormData = new HashMap<>();
		
		logger.debug("Get all section data od T3010 from database for user : {} ",userId);
		
		Map<String, String> t3010SectionA = formT3010SectionAService.getSectionADataInKeyValPair(userId);
		if(null != t3010SectionA && !t3010SectionA.isEmpty())
			t3010FormData.putAll(t3010SectionA);
		
		Map<String, String> t3010SectionC = formT3010SectionCService.getSectionCDataInKeyValPair(userId);
		if(null != t3010SectionC && !t3010SectionC.isEmpty())
			t3010FormData.putAll(t3010SectionC);
		
		Map<String, String> t3010SectionD = formT3010SectionDService.getSectionDDataInKeyValPair(userId);
		if(null != t3010SectionD && !t3010SectionD.isEmpty())
			t3010FormData.putAll(t3010SectionD);
		
		Map<String, String> t3010SectionE = formT3010SectionEService.getSectionEDataInKeyValPair(userId);
		if(null != t3010SectionE && !t3010SectionE.isEmpty())
			t3010FormData.putAll(t3010SectionE);
		
		Map<String, String> t3010SectionF = formT3010SectionFService.getSectionFDataInKeyValPair(userId);
		if(null != t3010SectionF && !t3010SectionF.isEmpty())
			t3010FormData.putAll(t3010SectionF);
		
		return t3010FormData;
	}
	
	public void createCompleteCsvForUser(Long userId){
		
		Map<String, String> completeFormData = new HashMap<>();
		logger.info("Received request to create complete CSV for user id : {} ", userId);
		
		completeFormData.putAll(formT3010SectionAService.getSectionADataInKeyValPair(userId));
		completeFormData.putAll(formT3010SectionCService.getSectionCDataInKeyValPair(userId));
		completeFormData.putAll(formT3010SectionDService.getSectionDDataInKeyValPair(userId));
		completeFormData.putAll(formT3010SectionFService.getSectionFDataInKeyValPair(userId));
		
		CharitableUtilities.convertKeyValPairToCsv(completeFormData, csvPath+userId+"/", csvFileName);
		
	}
	
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
}
