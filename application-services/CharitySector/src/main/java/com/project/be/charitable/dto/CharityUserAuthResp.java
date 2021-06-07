package com.project.be.charitable.dto;

/**
 * @author geeta
 *
 */
public class CharityUserAuthResp {
	
	private Boolean isValid;
	private String message;
	private Long userId;
	private String charityName;
	private Boolean isSubmitted;
	private String userName;
	
	public Boolean getIsValid() {
		return isValid;
	}
	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getCharityName() {
		return charityName;
	}
	public void setCharityName(String charityName) {
		this.charityName = charityName;
	}
	public Boolean getIsSubmitted() {
		return isSubmitted;
	}
	public void setIsSubmitted(Boolean isSubmitted) {
		this.isSubmitted = isSubmitted;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
}
