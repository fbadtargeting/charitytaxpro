package com.project.be.charitable.dto;


/**
 * @author geeta
 *
 */
public class CharityAuthRespDto {
	
	private Boolean validCharity;
	private Boolean activeCharity;
	
	public Boolean getValidCharity() {
		return validCharity;
	}
	public void setValidCharity(Boolean validCharity) {
		this.validCharity = validCharity;
	}
	public Boolean getActiveCharity() {
		return activeCharity;
	}
	public void setActiveCharity(Boolean activeCharity) {
		this.activeCharity = activeCharity;
	}
}
