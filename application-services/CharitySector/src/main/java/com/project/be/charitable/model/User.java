package com.project.be.charitable.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author geeta
 *
 */
@Document(collection = "charity_users_info")
public class User {
	
	@Id
	private String userId;
	private String userName;
	private String password;
	private String charityName;
	private String email;
	private Date creationDate = new Date();
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
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
}