package com.project.be.charitable.dto;


/**
 * @author geeta
 *
 */
public class FormT3010Dto {
	
	private FormT3010SectionADto T3010SecA;
	private FormT3010SectionCDto T3010SecC;
	private FormT3010SectionDDto T3010SecD;
	private FormT3010SectionEDto T3010SecE;
	private FormT3010SectionFDto T3010SecF;
	
	private Long user_id;
	private Boolean saveAndGeneratePdf;
	
	public FormT3010SectionADto getT3010SecA() {
		return T3010SecA;
	}
	public void setT3010SecA(FormT3010SectionADto t3010SecA) {
		T3010SecA = t3010SecA;
	}
	public FormT3010SectionCDto getT3010SecC() {
		return T3010SecC;
	}
	public void setT3010SecC(FormT3010SectionCDto t3010SecC) {
		T3010SecC = t3010SecC;
	}
	public FormT3010SectionDDto getT3010SecD() {
		return T3010SecD;
	}
	public void setT3010SecD(FormT3010SectionDDto t3010SecD) {
		T3010SecD = t3010SecD;
	}
	public FormT3010SectionEDto getT3010SecE() {
		return T3010SecE;
	}
	public void setT3010SecE(FormT3010SectionEDto t3010SecE) {
		T3010SecE = t3010SecE;
	}
	public FormT3010SectionFDto getT3010SecF() {
		return T3010SecF;
	}
	public void setT3010SecF(FormT3010SectionFDto t3010SecF) {
		T3010SecF = t3010SecF;
	}
	public Long getUser_id() {
		return user_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public Boolean getSaveAndGeneratePdf() {
		return saveAndGeneratePdf;
	}
	public void setSaveAndGeneratePdf(Boolean saveAndGeneratePdf) {
		this.saveAndGeneratePdf = saveAndGeneratePdf;
	}
}