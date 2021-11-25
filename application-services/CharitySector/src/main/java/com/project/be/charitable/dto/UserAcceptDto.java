package com.project.be.charitable.dto;

/**
 * @author geeta
 *
 */
public class UserAcceptDto {
	
	private Long userId;
	private boolean privacyStatement;
	private boolean copyOfFinancialStatements;
	private boolean filledFormT3010;
	private boolean filledFormT1235;
	private boolean filledFormT1236;
	private boolean filledFormT2081;
	private boolean filledFormRC232;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public boolean isPrivacyStatement() {
		return privacyStatement;
	}
	public void setPrivacyStatement(boolean privacyStatement) {
		this.privacyStatement = privacyStatement;
	}
	public boolean isCopyOfFinancialStatements() {
		return copyOfFinancialStatements;
	}
	public void setCopyOfFinancialStatements(boolean copyOfFinancialStatements) {
		this.copyOfFinancialStatements = copyOfFinancialStatements;
	}
	public boolean isFilledFormT3010() {
		return filledFormT3010;
	}
	public void setFilledFormT3010(boolean filledFormT3010) {
		this.filledFormT3010 = filledFormT3010;
	}
	public boolean isFilledFormT1235() {
		return filledFormT1235;
	}
	public void setFilledFormT1235(boolean filledFormT1235) {
		this.filledFormT1235 = filledFormT1235;
	}
	public boolean isFilledFormT1236() {
		return filledFormT1236;
	}
	public void setFilledFormT1236(boolean filledFormT1236) {
		this.filledFormT1236 = filledFormT1236;
	}
	public boolean isFilledFormT2081() {
		return filledFormT2081;
	}
	public void setFilledFormT2081(boolean filledFormT2081) {
		this.filledFormT2081 = filledFormT2081;
	}
	public boolean isFilledFormRC232() {
		return filledFormRC232;
	}
	public void setFilledFormRC232(boolean filledFormRC232) {
		this.filledFormRC232 = filledFormRC232;
	}	
}