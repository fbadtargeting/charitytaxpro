package com.project.be.charitable.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT3010SectionEDto;
import com.project.be.charitable.entities.FormT3010SectionEEntity;
import com.project.be.charitable.repository.CharitableUserRepository;
import com.project.be.charitable.repository.FormT3010SectionERepository;
import com.project.be.charitable.utility.CharitableUtilities;

/**
 * @author geeta
 *
 */
@Service
public class FormT3010SectionEService {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT3010SectionEService.class);
	
	@Autowired
	FormT3010SectionERepository formT3010SectionERepository;
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	public Long saveSectionEData(FormT3010SectionEDto formT3010SectionEDto){
		
		logger.info("From T3010 Section E : Checking data, if present for user id : {} ",formT3010SectionEDto.getUser_id());
		
		Long rowId = formT3010SectionERepository.findDataIdByUserId(formT3010SectionEDto.getUser_id());
		//logger.info("For user id : {} row id from table is : {} ",formT3010SectionEDto.getUser_id(),rowId);
		
		FormT3010SectionEEntity sectionEEntity = new FormT3010SectionEEntity();
		
		BeanUtils.copyProperties(formT3010SectionEDto, sectionEEntity);
		
		logger.info("Data copied for Section E Entity ");
		
		if(null != rowId){
			sectionEEntity.setId(rowId);
		}
		formT3010SectionERepository.save(sectionEEntity);
		
		return null;
	}
	
	public Map<String, String> getSectionEDataInKeyValPair(FormT3010SectionEDto formT3010SectionEDto){
		
		return CharitableUtilities.convertDtoIntoKeyValPair(formT3010SectionEDto);
		
	}
	
	public Map<String, String> getSectionEDataInKeyValPair(Long userId){

		FormT3010SectionEEntity sectionEEntity = formT3010SectionERepository.findByUserId(userId);

		if(null != sectionEEntity){
			FormT3010SectionEDto dto = new FormT3010SectionEDto();
			BeanUtils.copyProperties(sectionEEntity, dto);
			return CharitableUtilities.convertDtoIntoKeyValPair(dto);
		}
		return null;
	}
	
	public FormT3010SectionEDto getSectionEData(Long userId){
		
		FormT3010SectionEDto formT3010SectionEDto = null;
		FormT3010SectionEEntity SectionEEntity = formT3010SectionERepository.findByUserId(userId);
		 
		if(null != SectionEEntity){
			logger.debug("Section E is present!");
			formT3010SectionEDto = new FormT3010SectionEDto();
			BeanUtils.copyProperties(SectionEEntity, formT3010SectionEDto);
		}else
			logger.info("Section E not present for user id : {} ",userId);
		return formT3010SectionEDto;
	}

}
