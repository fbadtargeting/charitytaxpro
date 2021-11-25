package com.project.be.charitable.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT1236Dto;
import com.project.be.charitable.dto.GenericRespDTO;
import com.project.be.charitable.dto.MasterDtoT1236;
import com.project.be.charitable.entities.FormT1236Entity;
import com.project.be.charitable.repository.CharitableUserRepository;
import com.project.be.charitable.repository.FormT1236Repository;
import com.project.be.charitable.utility.CharitableUtilities;

import static com.project.be.charitable.utility.CharitableConstants.*;

/**
 * @author geeta
 *
 */
@Service
public class FormT1236Service {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT1236Service.class);
	
	@Autowired
	FormT1236Repository formT1236Repository;
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	@Autowired
	CharityUserService charityUserService;
	
	public GenericRespDTO saveT1236Data(FormT1236Dto formT1236Dto){

		logger.info("Starting to save all the form data for T1236..");
		GenericRespDTO respDto = new GenericRespDTO();
		try{
			Long rowId = formT1236Repository.findDataIdByUserId(formT1236Dto.getUser_id());
			//logger.info("For user id : {} row id from table is : {} ",formT3010SectionADto.getUser_id(),rowId);

			FormT1236Entity entity = new FormT1236Entity();
			BeanUtils.copyProperties(formT1236Dto, entity);
			logger.info("Data copied to entity for form t1236 ");

			if(null != rowId){
				entity.setId(rowId);
			}
			formT1236Repository.save(entity);
			respDto.setStatus(SUCCESS);
			respDto.setMessage(SUCCESS_SAVE_DOWNLOAD_MSG);
		}catch(Exception e){
			respDto.setStatus(FAIL);
			respDto.setMessage(SAVE_FAIL_MSG);
			logger.error("Error while saving data : {} ",e);
		}
		return respDto;
	}
	
	public Map<String, String> getT1236DataInKeyValPair(FormT1236Dto formT1236Dto){
		return CharitableUtilities.convertDtoIntoKeyValPair(formT1236Dto);
	}
	
	public Map<String, String> getT1236DataInKeyValPair(Long userId){

		FormT1236Entity entity = formT1236Repository.findByUserId(userId);
		if(null != entity){
			FormT1236Dto dto = new FormT1236Dto();
			BeanUtils.copyProperties(entity, dto);
			return CharitableUtilities.convertDtoIntoKeyValPair(dto);
		}
		return null;
	}
	
	public MasterDtoT1236 getFormT1236Data(Long userId){
		
		MasterDtoT1236 masterDto = new MasterDtoT1236();
		FormT1236Dto formT1236Dto = null;
		FormT1236Entity formT1236Entity = formT1236Repository.findByUserId(userId);
		 
		if(null != formT1236Entity){
			logger.debug("Form T1236 data is present!");
			formT1236Dto = new FormT1236Dto();
			BeanUtils.copyProperties(formT1236Entity, formT1236Dto);
			
			masterDto.setUserId(userId);
			masterDto.setT1236(formT1236Dto);
			masterDto.setUserAccept(charityUserService.getUserAcceptanceData(userId));
		}else
			logger.info("Form T1236 data is not present for user id : {} ",userId);
		return masterDto;
	}

}
