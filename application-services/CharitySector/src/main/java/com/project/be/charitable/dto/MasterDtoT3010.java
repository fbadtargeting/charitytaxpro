package com.project.be.charitable.dto;

/**
 * @author geeta
 *
 */
public class MasterDtoT3010 {

	private Long userId;
	private UserAcceptDto userAccept;
	private FormT3010Dto t3010;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public UserAcceptDto getUserAccept() {
		return userAccept;
	}
	public void setUserAccept(UserAcceptDto userAccept) {
		this.userAccept = userAccept;
	}
	public FormT3010Dto getT3010() {
		return t3010;
	}
	public void setT3010(FormT3010Dto t3010) {
		this.t3010 = t3010;
	}	
}