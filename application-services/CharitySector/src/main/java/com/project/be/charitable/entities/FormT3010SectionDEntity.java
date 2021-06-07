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
@Table(name="charity_formt3010_sectionD")
@NamedQuery(name="FormT3010SectionDEntity", query="SELECT f FROM FormT3010SectionDEntity f")
public class FormT3010SectionDEntity implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String col_4020;
	private String col_4050;
	private String col_4200;
	private String col_4350;
	private String col_4400;
	private String col_4490;
	private String col_4500;
	private String col_4505;
	private String col_4510;
	private String col_4530;
	private String col_4565;
	private String col_4571;
	private String col_4575;
	private String col_4630;
	private String col_4640;
	private String col_4650;
	private String col_4860;
	private String col_4810;
	private String col_4920;
	private String col_4950;
	private String col_5000;
	private String col_5010;
	private String col_5050;
	private String col_5100;
	private String col_4570;
	private String col_4700;
	
	private Long user_id;
	
	@Column(columnDefinition = "integer default 20")
	private Integer percentCompleted;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCol_4020() {
		return col_4020;
	}

	public void setCol_4020(String col_4020) {
		this.col_4020 = col_4020;
	}

	public String getCol_4050() {
		return col_4050;
	}

	public void setCol_4050(String col_4050) {
		this.col_4050 = col_4050;
	}

	public String getCol_4200() {
		return col_4200;
	}

	public void setCol_4200(String col_4200) {
		this.col_4200 = col_4200;
	}

	public String getCol_4350() {
		return col_4350;
	}

	public void setCol_4350(String col_4350) {
		this.col_4350 = col_4350;
	}

	public String getCol_4400() {
		return col_4400;
	}

	public void setCol_4400(String col_4400) {
		this.col_4400 = col_4400;
	}

	public String getCol_4490() {
		return col_4490;
	}

	public void setCol_4490(String col_4490) {
		this.col_4490 = col_4490;
	}

	public String getCol_4500() {
		return col_4500;
	}

	public void setCol_4500(String col_4500) {
		this.col_4500 = col_4500;
	}

	public String getCol_4505() {
		return col_4505;
	}

	public void setCol_4505(String col_4505) {
		this.col_4505 = col_4505;
	}

	public String getCol_4510() {
		return col_4510;
	}

	public void setCol_4510(String col_4510) {
		this.col_4510 = col_4510;
	}

	public String getCol_4530() {
		return col_4530;
	}

	public void setCol_4530(String col_4530) {
		this.col_4530 = col_4530;
	}

	public String getCol_4565() {
		return col_4565;
	}

	public void setCol_4565(String col_4565) {
		this.col_4565 = col_4565;
	}

	public String getCol_4571() {
		return col_4571;
	}

	public void setCol_4571(String col_4571) {
		this.col_4571 = col_4571;
	}

	public String getCol_4575() {
		return col_4575;
	}

	public void setCol_4575(String col_4575) {
		this.col_4575 = col_4575;
	}

	public String getCol_4630() {
		return col_4630;
	}

	public void setCol_4630(String col_4630) {
		this.col_4630 = col_4630;
	}

	public String getCol_4640() {
		return col_4640;
	}

	public void setCol_4640(String col_4640) {
		this.col_4640 = col_4640;
	}

	public String getCol_4650() {
		return col_4650;
	}

	public void setCol_4650(String col_4650) {
		this.col_4650 = col_4650;
	}

	public String getCol_4860() {
		return col_4860;
	}

	public void setCol_4860(String col_4860) {
		this.col_4860 = col_4860;
	}

	public String getCol_4810() {
		return col_4810;
	}

	public void setCol_4810(String col_4810) {
		this.col_4810 = col_4810;
	}

	public String getCol_4920() {
		return col_4920;
	}

	public void setCol_4920(String col_4920) {
		this.col_4920 = col_4920;
	}

	public String getCol_4950() {
		return col_4950;
	}

	public void setCol_4950(String col_4950) {
		this.col_4950 = col_4950;
	}

	public String getCol_5000() {
		return col_5000;
	}

	public void setCol_5000(String col_5000) {
		this.col_5000 = col_5000;
	}

	public String getCol_5010() {
		return col_5010;
	}

	public void setCol_5010(String col_5010) {
		this.col_5010 = col_5010;
	}

	public String getCol_5050() {
		return col_5050;
	}

	public void setCol_5050(String col_5050) {
		this.col_5050 = col_5050;
	}

	public String getCol_5100() {
		return col_5100;
	}

	public void setCol_5100(String col_5100) {
		this.col_5100 = col_5100;
	}

	public String getCol_4570() {
		return col_4570;
	}

	public void setCol_4570(String col_4570) {
		this.col_4570 = col_4570;
	}

	public String getCol_4700() {
		return col_4700;
	}

	public void setCol_4700(String col_4700) {
		this.col_4700 = col_4700;
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