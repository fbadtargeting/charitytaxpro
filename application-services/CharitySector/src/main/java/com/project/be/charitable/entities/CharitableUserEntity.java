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
}