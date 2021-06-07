package com.project.be.charitable.dto;


/**
 * @author geeta
 *
 */
public class CharityUserRegistrationResp {
	
	private Long userId;
	private String status;
	private String message;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
