package com.project.be.charitable.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.FormT3010SectionCDto;
import com.project.be.charitable.entities.FormT3010SectionCEntity;
import com.project.be.charitable.repository.CharitableUserRepository;
import com.project.be.charitable.repository.FormT3010SectionCRepository;
import com.project.be.charitable.utility.CharitableUtilities;

/**
 * @author geeta
 *
 */
@Service
public class FormT3010SectionCService {
	
	private static final Logger logger = LoggerFactory.getLogger(FormT3010SectionCService.class);
	
	@Autowired
	FormT3010SectionCRepository formT3010SectionCRepository;
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	public Long saveSectionCData(FormT3010SectionCDto formT3010SectionCDto){
		
		logger.info("From T3010 Section C : Checking data, if present for user id : {} ",formT3010SectionCDto.getUser_id());
		
		Long rowId = formT3010SectionCRepository.findDataIdByUserId(formT3010SectionCDto.getUser_id());
		logger.info("For user id : {} row id from table is : {} ",formT3010SectionCDto.getUser_id(),rowId);
		
		FormT3010SectionCEntity sectionCEntity = new FormT3010SectionCEntity();
		
		BeanUtils.copyProperties(formT3010SectionCDto, sectionCEntity);
		
		logger.info("Data copied for T3010 section C ");
		
		if(null != rowId){
			sectionCEntity.setId(rowId);
		}
		formT3010SectionCRepository.save(sectionCEntity);
		
		return null;
	}
	
	public Map<String, String> getSectionCDataInKeyValPair(FormT3010SectionCDto formT3010SectionCDto){
		
		return CharitableUtilities.convertDtoIntoKeyValPair(formT3010SectionCDto);
		
	}

	public Map<String, String> getSectionCDataInKeyValPair(Long userId){

		FormT3010SectionCEntity sectionCEntity = formT3010SectionCRepository.findByUserId(userId);

		if(null != sectionCEntity){
			FormT3010SectionCDto dto = new FormT3010SectionCDto();
			BeanUtils.copyProperties(sectionCEntity, dto);
			return CharitableUtilities.convertDtoIntoKeyValPair(dto);
		}
		return null;
	}
	
	public FormT3010SectionCDto getSectionCData(Long userId){
		
		FormT3010SectionCDto formT3010SectionCDto = null;
		FormT3010SectionCEntity sectionCEntity = formT3010SectionCRepository.findByUserId(userId);
		 
		if(null != sectionCEntity){
			logger.debug("Section C is present!");
			formT3010SectionCDto = new FormT3010SectionCDto();
			BeanUtils.copyProperties(sectionCEntity, formT3010SectionCDto);
		}else
			logger.info("Section C not present for user id : {} ",userId);
		
		return formT3010SectionCDto;
	}

}
