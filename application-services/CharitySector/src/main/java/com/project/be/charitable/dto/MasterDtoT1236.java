package com.project.be.charitable.dto;

/**
 * @author geeta
 *
 */
public class MasterDtoT1236 {

	private Long userId;
	private UserAcceptDto userAccept;
	private FormT1236Dto t1236;
	
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
	public FormT1236Dto getT1236() {
		return t1236;
	}
	public void setT1236(FormT1236Dto t1236) {
		this.t1236 = t1236;
	}	
}