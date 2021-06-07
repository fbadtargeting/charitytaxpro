package com.project.be.charitable.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT3010SectionFDto;
import com.project.be.charitable.entities.FormT3010SectionFEntity;
import com.project.be.charitable.repository.FormT3010SectionFRepository;
import com.project.be.charitable.utility.CharitableUtilities;

/**
 * @author geeta
 *
 */
@Service
public class FormT3010SectionFService {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT3010SectionFService.class);
	
	@Autowired
	FormT3010SectionFRepository formT3010SectionFRepository;
	
	public Long saveSectionFData(FormT3010SectionFDto formT3010SectionFDto){
		
		logger.info("From T3010 Section F : Checking data, if present for user id : {} ",formT3010SectionFDto.getUser_id());
		
		Long rowId = formT3010SectionFRepository.findDataIdByUserId(formT3010SectionFDto.getUser_id());
		logger.info("For user id : {} row id from table is : {} ",formT3010SectionFDto.getUser_id(),rowId);
		
		FormT3010SectionFEntity sectionFEntity = new FormT3010SectionFEntity();
		
		BeanUtils.copyProperties(formT3010SectionFDto, sectionFEntity);
		
		logger.info("Data copied for T3010 Section F ");
		
		if(null != rowId){
			sectionFEntity.setId(rowId);
		}
		formT3010SectionFRepository.save(sectionFEntity);
		
		return null;
	}
	
	public Map<String, String> getSectionFDataInKeyValPair(FormT3010SectionFDto formT3010SectionFDto){
		
		return CharitableUtilities.convertDtoIntoKeyValPair(formT3010SectionFDto);
		
	}

	public Map<String, String> getSectionFDataInKeyValPair(Long userId){

		FormT3010SectionFEntity sectionFEntity = formT3010SectionFRepository.findByUserId(userId);
		if(null != sectionFEntity){
			FormT3010SectionFDto dto = new FormT3010SectionFDto();
			BeanUtils.copyProperties(sectionFEntity, dto);
			return CharitableUtilities.convertDtoIntoKeyValPair(dto);
		}
		return null;
	}
	
	public FormT3010SectionFDto getSectionFData(Long userId){
		
		FormT3010SectionFDto formT3010SectionFDto = null;
		FormT3010SectionFEntity sectionFEntity = formT3010SectionFRepository.findByUserId(userId);
		 
		if(null != sectionFEntity){
			logger.debug("Section F is present!");
			formT3010SectionFDto = new FormT3010SectionFDto();
			BeanUtils.copyProperties(sectionFEntity, formT3010SectionFDto);
		}else
			logger.info("Section F not present for user id : {} ",userId);
		
		return formT3010SectionFDto;
	}

}
