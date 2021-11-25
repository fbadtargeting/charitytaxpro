package com.project.be.charitable.dto;

/**
 * @author geeta
 *
 */
public class MasterDtoT1235 {

	private Long userId;
	private UserAcceptDto userAccept;
	private FormT1235Dto t1235;
	
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
	public FormT1235Dto getT1235() {
		return t1235;
	}
	public void setT1235(FormT1235Dto t1235) {
		this.t1235 = t1235;
	}	
}