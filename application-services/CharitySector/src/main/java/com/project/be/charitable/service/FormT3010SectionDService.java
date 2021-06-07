package com.project.be.charitable.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT3010SectionDDto;
import com.project.be.charitable.entities.FormT3010SectionDEntity;
import com.project.be.charitable.repository.CharitableUserRepository;
import com.project.be.charitable.repository.FormT3010SectionDRepository;
import com.project.be.charitable.utility.CharitableUtilities;

/**
 * @author geeta
 *
 */
@Service
public class FormT3010SectionDService {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT3010SectionDService.class);
	
	@Autowired
	FormT3010SectionDRepository formT3010SectionDRepository;
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	public Long saveSectionDData(FormT3010SectionDDto formT3010SectionDDto){
		
		logger.info("From T3010 Section D : Checking data, if present for user id : {} ",formT3010SectionDDto.getUser_id());
		
		Long rowId = formT3010SectionDRepository.findDataIdByUserId(formT3010SectionDDto.getUser_id());
		//logger.info("For user id : {} row id from table is : {} ",formT3010SectionDDto.getUser_id(),rowId);
		
		FormT3010SectionDEntity SectionDEntity = new FormT3010SectionDEntity();
		
		BeanUtils.copyProperties(formT3010SectionDDto, SectionDEntity);
		
		logger.info("Data copied for Section D Entity  ");
		
		if(null != rowId){
			SectionDEntity.setId(rowId);
		}
		formT3010SectionDRepository.save(SectionDEntity);
		
		return null;
	}
	
	public Map<String, String> getSectionDDataInKeyValPair(FormT3010SectionDDto formT3010SectionDDto){
		
		return CharitableUtilities.convertDtoIntoKeyValPair(formT3010SectionDDto);
		
	}
	
	public Map<String, String> getSectionDDataInKeyValPair(Long userId){

		FormT3010SectionDEntity sectionDEntity = formT3010SectionDRepository.findByUserId(userId);
		if(null != sectionDEntity){
			FormT3010SectionDDto dto = new FormT3010SectionDDto();
			BeanUtils.copyProperties(sectionDEntity, dto);
			return CharitableUtilities.convertDtoIntoKeyValPair(dto);
		}
		return null;
	}
	
	public FormT3010SectionDDto getSectionDData(Long userId){
		
		FormT3010SectionDDto formT3010SectionDDto = null;
		FormT3010SectionDEntity sectionDEntity = formT3010SectionDRepository.findByUserId(userId);
		 
		if(null != sectionDEntity){
			logger.debug("Section D is present!");
			formT3010SectionDDto = new FormT3010SectionDDto();
			BeanUtils.copyProperties(sectionDEntity, formT3010SectionDDto);
		}else
			logger.info("Section D not present for user id : {} ",userId);
		
		return formT3010SectionDDto;
	}

}
