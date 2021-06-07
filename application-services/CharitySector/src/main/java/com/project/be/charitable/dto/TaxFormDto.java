package com.project.be.charitable.dto;

/**
 * @author geeta
 *
 */
public class TaxFormDto {

	private FormT3010Dto t3010Dto;
	private FormT1235Dto t1235Dto;
	private FormT1236Dto t1236Dto;
	
	private Long user_id;
	private Boolean saveAndGeneratePdf;

	public FormT3010Dto getT3010Dto() {
		return t3010Dto;
	}

	public void setT3010Dto(FormT3010Dto t3010Dto) {
		this.t3010Dto = t3010Dto;
	}
	
	public FormT1235Dto getT1235Dto() {
		return t1235Dto;
	}

	public void setT1235Dto(FormT1235Dto t1235Dto) {
		this.t1235Dto = t1235Dto;
	}

	public FormT1236Dto getT1236Dto() {
		return t1236Dto;
	}

	public void setT1236Dto(FormT1236Dto t1236Dto) {
		this.t1236Dto = t1236Dto;
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