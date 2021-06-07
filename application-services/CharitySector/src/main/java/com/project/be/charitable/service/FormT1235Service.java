package com.project.be.charitable.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT1235Dto;
import com.project.be.charitable.dto.GenericRespDTO;
import com.project.be.charitable.entities.FormT1235Entity;
import com.project.be.charitable.repository.CharitableUserRepository;
import com.project.be.charitable.repository.FormT1235Repository;
import com.project.be.charitable.utility.CharitableUtilities;

/**
 * @author geeta
 *
 */
@Service
public class FormT1235Service {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT1235Service.class);
	
	@Autowired
	FormT1235Repository formT1235Repository;
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	public GenericRespDTO saveT1235Data(FormT1235Dto formT1235Dto){

		logger.info("Starting to save all the form data for T1235..");
		GenericRespDTO respDto = new GenericRespDTO();
		try{
			Long rowId = formT1235Repository.findDataIdByUserId(formT1235Dto.getUser_id());
			//logger.info("For user id : {} row id from table is : {} ",formT3010SectionADto.getUser_id(),rowId);

			FormT1235Entity entity = new FormT1235Entity();
			BeanUtils.copyProperties(formT1235Dto, entity);
			logger.info("Data copied to entity for form t1235 ");

			if(null != rowId){
				entity.setId(rowId);
			}
			formT1235Repository.save(entity);
			respDto.setStatus("SUCCESS");
			respDto.setMessage("Form saved successfully.");
		}catch(Exception e){
			respDto.setStatus("FAIL");
			respDto.setMessage("Error while saving form.");
			logger.error("Error while saving data : {} ",e);
		}
		return respDto;
	}
	
	public Map<String, String> getT1235DataInKeyValPair(FormT1235Dto formT1235Dto){
		return CharitableUtilities.convertDtoIntoKeyValPair(formT1235Dto);
	}
	
	public Map<String, String> getT1235DataInKeyValPair(Long userId){

		FormT1235Entity entity = formT1235Repository.findByUserId(userId);
		if(null != entity){
			FormT1235Dto dto = new FormT1235Dto();
			BeanUtils.copyProperties(entity, dto);
			return CharitableUtilities.convertDtoIntoKeyValPair(dto);
		}
		return null;
	}
	
	public FormT1235Dto getFormT1235Data(Long userId){
		
		FormT1235Dto formT1235Dto = null;
		FormT1235Entity formT1235Entity = formT1235Repository.findByUserId(userId);
		 
		if(null != formT1235Entity){
			logger.debug("Form T1235 data is present!");
			formT1235Dto = new FormT1235Dto();
			BeanUtils.copyProperties(formT1235Entity, formT1235Dto);
		}else
			logger.info("Form T1235 data is not present for user id : {} ",userId);
		return formT1235Dto;
	}

}
