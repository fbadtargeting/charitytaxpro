package com.project.be.charitable.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 * @author geeta
 *
 */

@Entity
@Table(name="charity_users_info")
@NamedQuery(name="CharitableUserEntity", query="SELECT c FROM CharitableUserEntity c")
public class CharitableUserEntity implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	
	@Column(name="user_name")
	private String userName;
	
	private String password;
	
	@Column(name="charity_name")
	private String charityName;
	
	private String email;
	
	@Column(name="created_date")
	private Date creationDate = new Date();
	
	@Column(name="is_submitted", columnDefinition = "boolean default false")
	private Boolean isSubmitted = false;
	
	/**@OneToOne(mappedBy = "charitableUserEntity")
	private FormT3010SectionAEntity formT3010SectionAEntity;
	
	@OneToOne(mappedBy = "charitableUserEntity")
	private FormT3010SectionFEntity formT3010SectionFEntity;**/
	
	@Column(name="is_ps_marked", columnDefinition = "boolean default false")
	private Boolean privacyStatement = false;
	
	@Column(name="is_fs_copy_marked", columnDefinition = "boolean default false")
	private Boolean copyOfFinancialStatements = false;
	
	@Column(name="is_t3010_filled", columnDefinition = "boolean default false")
	private Boolean filledFormT3010 = false;
	
	@Column(name="is_t1235_filled", columnDefinition = "boolean default false")
	private Boolean filledFormT1235 = false;
	
	@Column(name="is_t1236_filled", columnDefinition = "boolean default false")
	private Boolean filledFormT1236 = false;
	
	@Column(name="is_t2081_filled", columnDefinition = "boolean default false")
	private Boolean filledFormT2081 = false;
	
	@Column(name="is_rc232_filled", columnDefinition = "boolean default false")
	private Boolean filledFormRC232 = false;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCharityName() {
		return charityName;
	}

	public void setCharityName(String charityName) {
		this.charityName = charityName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Boolean getIsSubmitted() {
		return isSubmitted;
	}

	public void setIsSubmitted(Boolean isSubmitted) {
		this.isSubmitted = isSubmitted;
	}

	public Boolean getPrivacyStatement() {
		return privacyStatement;
	}

	public void setPrivacyStatement(Boolean privacyStatement) {
		this.privacyStatement = privacyStatement;
	}

	public Boolean getCopyOfFinancialStatements() {
		return copyOfFinancialStatements;
	}

	public void setCopyOfFinancialStatements(Boolean copyOfFinancialStatements) {
		this.copyOfFinancialStatements = copyOfFinancialStatements;
	}

	public Boolean getFilledFormT3010() {
		return filledFormT3010;
	}

	public void setFilledFormT3010(Boolean filledFormT3010) {
		this.filledFormT3010 = filledFormT3010;
	}

	public Boolean getFilledFormT1235() {
		return filledFormT1235;
	}

	public void setFilledFormT1235(Boolean filledFormT1235) {
		this.filledFormT1235 = filledFormT1235;
	}

	public Boolean getFilledFormT1236() {
		return filledFormT1236;
	}

	public void setFilledFormT1236(Boolean filledFormT1236) {
		this.filledFormT1236 = filledFormT1236;
	}

	public Boolean getFilledFormT2081() {
		return filledFormT2081;
	}

	public void setFilledFormT2081(Boolean filledFormT2081) {
		this.filledFormT2081 = filledFormT2081;
	}

	public Boolean getFilledFormRC232() {
		return filledFormRC232;
	}

	public void setFilledFormRC232(Boolean filledFormRC232) {
		this.filledFormRC232 = filledFormRC232;
	}
}