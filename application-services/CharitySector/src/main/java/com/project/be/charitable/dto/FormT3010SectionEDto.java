package com.project.be.charitable.dto;

/**
 * @author geeta
 *
 */
public class FormT3010SectionEDto {

	private String e_name;
	private String e_signature;
	private String e_position;
	private String secEDate;
	private String secEphone;
	
	private Long user_id;
	private Integer percentCompleted;

	public String getE_name() {
		return e_name;
	}

	public void setE_name(String e_name) {
		this.e_name = e_name;
	}

	public String getE_signature() {
		return e_signature;
	}

	public void setE_signature(String e_signature) {
		this.e_signature = e_signature;
	}

	public String getE_position() {
		return e_position;
	}

	public void setE_position(String e_position) {
		this.e_position = e_position;
	}

	public String getSecEDate() {
		return secEDate;
	}

	public void setSecEDate(String secEDate) {
		this.secEDate = secEDate;
	}

	public String getSecEphone() {
		return secEphone;
	}

	public void setSecEphone(String secEphone) {
		this.secEphone = secEphone;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Integer getPercentCompleted() {
		return percentCompleted;
	}

	public void setPercentCompleted(Integer percentCompleted) {
		this.percentCompleted = percentCompleted;
	}
}