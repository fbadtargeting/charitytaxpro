package com.project.be.charitable.service;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.be.charitable.dto.CharityNewUserDto;
import com.project.be.charitable.dto.CharityUserAuthReq;
import com.project.be.charitable.dto.CharityUserAuthResp;
import com.project.be.charitable.dto.CharityUserRegistrationResp;
import com.project.be.charitable.entities.CharitableUserEntity;
import com.project.be.charitable.repository.CharitableUserRepository;

/**
 * @author geeta
 *
 */
@Service
public class UserManagementService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserManagementService.class);
	
	@Autowired
	CharitableUserRepository charitableUserRepo;
	
	public void insertTestUser(){
		
		CharitableUserEntity user = new CharitableUserEntity();
		user.setUserName("test");
		user.setPassword("test");
		user.setCharityName("TestCharity");
		user.setEmail("test.test@test.com");
		user.setCreationDate(new Date());
		
		charitableUserRepo.save(user);
		
	}
	
	public CharityUserAuthResp authenticateUser(CharityUserAuthReq charityUserAuthReq){
		
		logger.info("Authenticating user : {} ",charityUserAuthReq.getUserName());
		CharityUserAuthResp resp = new CharityUserAuthResp();
		try{
			CharitableUserEntity entity = charitableUserRepo.findByUserNameAndPassword(charityUserAuthReq.getUserName(), charityUserAuthReq.getPassword());
			if(null != entity){
				resp.setCharityName(entity.getCharityName());
				resp.setIsSubmitted(entity.getIsSubmitted());
				resp.setIsValid(true);
				resp.setMessage("Valid User Name.");
				resp.setUserId(entity.getUserId());
				resp.setUserName(entity.getUserName());
			}else{
				resp.setIsSubmitted(false);
				resp.setIsValid(false);
				resp.setMessage("Invalid User Name or Password!");
			}
		}catch(Exception e){
			logger.error("Error while fetching data : {} ",e);
			resp.setIsValid(false);
			resp.setMessage("Internal server error");
		}
		return resp;
	}
	
	
	public CharityUserRegistrationResp createNewUser(CharityNewUserDto charityNewUserDto){

		logger.info("First check User Name : {} or Charity : {} exist or not!",
				charityNewUserDto.getUserName(),charityNewUserDto.getCharityName());
		CharityUserRegistrationResp resp = new CharityUserRegistrationResp();

		try{
			CharitableUserEntity existing = charitableUserRepo.findByUserNameOrCharityName(charityNewUserDto.getUserName(),charityNewUserDto.getCharityName());
			if(null != existing){
				logger.info("User Name : {} or Charity : {} exist already exist!",charityNewUserDto.getUserName(),charityNewUserDto.getCharityName());
				resp.setStatus("Fail");
				resp.setMessage(alreadyExisting(existing, charityNewUserDto));
			}else{
				CharitableUserEntity savedEntity = saveNewUser(charityNewUserDto);
				logger.info("New user for charity : {} saved and id is : {} ",charityNewUserDto.getCharityName(),savedEntity.getUserId());

				resp.setUserId(savedEntity.getUserId());
				resp.setStatus("Success");
				resp.setMessage("User '"+ charityNewUserDto.getUserName() +"' created successfully for Charity '"+charityNewUserDto.getCharityName()+"'.");
			}
		}catch(Exception e){
			logger.error("Error while New User Registration");
			resp.setStatus("Fail");
			resp.setMessage("Error while New User Registration");
		}
		return resp;
	}
	
	private CharitableUserEntity saveNewUser(CharityNewUserDto charityNewUserDto){
		CharitableUserEntity entity = new CharitableUserEntity();
		entity.setCharityName(charityNewUserDto.getCharityName());
		entity.setCreationDate(new Date());
		entity.setEmail(charityNewUserDto.getEmailId());
		entity.setPassword(charityNewUserDto.getPassword());
		entity.setUserName(charityNewUserDto.getUserName());
		entity.setIsSubmitted(false);
		return charitableUserRepo.save(entity);
	}
	
	private String alreadyExisting(CharitableUserEntity existing, CharityNewUserDto charityNewUserDto){

		StringBuilder respMesg = new StringBuilder();
		
		logger.info("User Name : {} or Charity : {} already exist!",
				charityNewUserDto.getUserName(),charityNewUserDto.getCharityName());

		if(existing.getCharityName().equals(charityNewUserDto.getCharityName()) && 
				!(existing.getUserName().equals(charityNewUserDto.getUserName()))){
			respMesg.append("Charity '").append(charityNewUserDto.getCharityName())
			.append("' already exist for user '")
			.append(existing.getUserName())
			.append("'.");
		}

		if(!(existing.getCharityName().equals(charityNewUserDto.getCharityName())) && 
				existing.getUserName().equals(charityNewUserDto.getUserName())){
			respMesg.append("User '").append(charityNewUserDto.getUserName())
			.append("' already exist for charity '")
			.append(existing.getCharityName())
			.append("'.");
		}

		if(existing.getCharityName().equals(charityNewUserDto.getCharityName()) && 
				existing.getUserName().equals(charityNewUserDto.getUserName())){
			respMesg.append("User '").append(charityNewUserDto.getUserName())
			.append("' for Charity '")
			.append(existing.getCharityName())
			.append("' already exist.");
		}
		
		return respMesg.toString();
	}

}
