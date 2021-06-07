package com.project.be.charitable.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT3010SectionADto;
import com.project.be.charitable.entities.FormT3010SectionAEntity;
import com.project.be.charitable.repository.CharitableUserRepository;
import com.project.be.charitable.repository.FormT3010SectionARepository;
import com.project.be.charitable.utility.CharitableUtilities;

/**
 * @author geeta
 *
 */
@Service
public class FormT3010SectionAService {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT3010SectionAService.class);
	
	@Autowired
	FormT3010SectionARepository formT3010SectionARepository;
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	public Long saveSectionAData(FormT3010SectionADto formT3010SectionADto){
		
		logger.info("From T3010 Section A : Checking data, if present for user id : {} ",formT3010SectionADto.getUser_id());
		
		Long rowId = formT3010SectionARepository.findDataIdByUserId(formT3010SectionADto.getUser_id());
		//logger.info("For user id : {} row id from table is : {} ",formT3010SectionADto.getUser_id(),rowId);
		
		FormT3010SectionAEntity sectionAEntity = new FormT3010SectionAEntity();
		
		BeanUtils.copyProperties(formT3010SectionADto, sectionAEntity);
		
		logger.info("Data copied and sectionAEntity is : {} ",sectionAEntity.getCharityName());
		
		if(null != rowId){
			sectionAEntity.setId(rowId);
		}
		formT3010SectionARepository.save(sectionAEntity);
		
		return null;
	}
	
	public Map<String, String> getSectionADataInKeyValPair(FormT3010SectionADto formT3010SectionADto){
		
		return CharitableUtilities.convertDtoIntoKeyValPair(formT3010SectionADto);
		
	}
	
	public Map<String, String> getSectionADataInKeyValPair(Long userId){

		FormT3010SectionAEntity sectionAEntity = formT3010SectionARepository.findByUserId(userId);

		if(null != sectionAEntity){
			FormT3010SectionADto dto = new FormT3010SectionADto();
			BeanUtils.copyProperties(sectionAEntity, dto);
			return CharitableUtilities.convertDtoIntoKeyValPair(dto);
		}
		return null;
	}
	
	public FormT3010SectionADto getSectionAData(Long userId){
		
		FormT3010SectionADto formT3010SectionADto = null;
		FormT3010SectionAEntity sectionAEntity = formT3010SectionARepository.findByUserId(userId);
		 
		if(null != sectionAEntity){
			logger.debug("Section A is present!");
			formT3010SectionADto = new FormT3010SectionADto();
			BeanUtils.copyProperties(sectionAEntity, formT3010SectionADto);
		}else
			logger.info("Section A not present for user id : {} ",userId);
		return formT3010SectionADto;
	}

}
