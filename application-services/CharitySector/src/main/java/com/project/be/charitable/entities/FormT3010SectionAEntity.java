package com.project.be.charitable.entities;

import java.io.Serializable;

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
@Table(name="charity_formt3010_sectionA")
@NamedQuery(name="FormT3010SectionAEntity", query="SELECT f FROM FormT3010SectionAEntity f")
public class FormT3010SectionAEntity implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String charityName;
	private String fiscalPeriodEnding;
	private String bnRegistration;
	private String a1_bnRegistration;
	private String webAddress;
	private String col_1510;
	private String a1_name;
	private String col_1570;
	private String col_1600;
	
	private Long user_id;
	
	@Column(columnDefinition = "integer default 20")
	private Integer percentCompleted;
	
	/**@OneToOne
	@JoinColumn(name = "user_id")
	private CharitableUserEntity charitableUserEntity;**/
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCharityName() {
		return charityName;
	}
	public void setCharityName(String charityName) {
		this.charityName = charityName;
	}
	public String getFiscalPeriodEnding() {
		return fiscalPeriodEnding;
	}
	public void setFiscalPeriodEnding(String fiscalPeriodEnding) {
		this.fiscalPeriodEnding = fiscalPeriodEnding;
	}
	public String getBnRegistration() {
		return bnRegistration;
	}
	public void setBnRegistration(String bnRegistration) {
		this.bnRegistration = bnRegistration;
	}
	public String getA1_bnRegistration() {
		return a1_bnRegistration;
	}
	public void setA1_bnRegistration(String a1_bnRegistration) {
		this.a1_bnRegistration = a1_bnRegistration;
	}
	public String getWebAddress() {
		return webAddress;
	}
	public void setWebAddress(String webAddress) {
		this.webAddress = webAddress;
	}
	public String getCol_1510() {
		return col_1510;
	}
	public void setCol_1510(String col_1510) {
		this.col_1510 = col_1510;
	}
	public String getA1_name() {
		return a1_name;
	}
	public void setA1_name(String a1_name) {
		this.a1_name = a1_name;
	}
	public String getCol_1570() {
		return col_1570;
	}
	public void setCol_1570(String col_1570) {
		this.col_1570 = col_1570;
	}
	public String getCol_1600() {
		return col_1600;
	}
	public void setCol_1600(String col_1600) {
		this.col_1600 = col_1600;
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