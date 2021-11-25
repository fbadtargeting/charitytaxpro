package com.project.be.charitable.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.UserAcceptDto;
import com.project.be.charitable.entities.CharitableUserEntity;
import com.project.be.charitable.repository.CharitableUserRepository;

/**
 * @author geeta
 *
 */
@Service
public class CharityUserService {
	
	private static final Logger logger = LoggerFactory.getLogger(CharityUserService.class);
	
	@Autowired
	CharitableUserRepository charitableUserRepository;
	
	public UserAcceptDto getUserAcceptanceData(Long userId){
		
		UserAcceptDto userAccept = new UserAcceptDto();
		try{
			logger.info("Get User Acceptance Data for user : {} ",userId);
			Optional<CharitableUserEntity> optUserEntityt = charitableUserRepository.findById(userId);
			if(optUserEntityt.isPresent()){
				logger.debug("User Entity found and start creating dto..");
				CharitableUserEntity existingUser = optUserEntityt.get();
				userAccept.setPrivacyStatement(existingUser.getPrivacyStatement());
				userAccept.setCopyOfFinancialStatements(existingUser.getCopyOfFinancialStatements());
				userAccept.setFilledFormT3010(existingUser.getFilledFormT3010());
				userAccept.setFilledFormT1235(existingUser.getFilledFormT1235());
				userAccept.setFilledFormT1236(existingUser.getFilledFormT1236());
				userAccept.setFilledFormT2081(existingUser.getFilledFormT2081());
				userAccept.setFilledFormRC232(existingUser.getFilledFormRC232());
			}
		}catch(Exception e){
			logger.error("Error while saving user acceptance data : {} ",e);
		}
		return userAccept;
	}
}
