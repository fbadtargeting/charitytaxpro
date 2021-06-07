package com.project.be.charitable.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opencsv.CSVWriter;
import com.project.be.charitable.repository.FormT3010SectionARepository;
import com.project.be.charitable.repository.FormT3010SectionFRepository;

/**
 * @author geeta
 *
 */
@Service
public class UtilityService {
	
	@Autowired
	FormT3010SectionARepository formT3010SectionARepository;
	
	@Autowired
	FormT3010SectionFRepository formT3010SectionFRepository;
	
	public void creatCsvFromDbData(){

		//Write CSV
		String filePath = "FormT3010.csv"; 
		File file = new File(filePath); 
		try { 
			// create FileWriter object with file as parameter 
			FileWriter outputfile = new FileWriter(file); 

			// create CSVWriter object filewriter object as parameter 
			CSVWriter writer = new CSVWriter(outputfile); 

			

			// closing writer connection 
			writer.close(); 
		} 
		catch (IOException e) { 
			// TODO Auto-generated catch block 
			e.printStackTrace(); 
		} 


		//Done

	
		
	}
	
	public void createTestCsv(){

		//Write CSV
		String filePath = "FormT3010SectionA.csv"; 
		File file = new File(filePath); 
		try { 
			// create FileWriter object with file as parameter 
			FileWriter outputfile = new FileWriter(file); 

			// create CSVWriter object filewriter object as parameter 
			CSVWriter writer = new CSVWriter(outputfile); 

			// adding header to csv 
			// String[] header = { "Name", "Class", "Marks" }; 
			//writer.writeNext(header); 



			// add data to csv 
			String[] data1 = { "charityName", "Test-Charity-Name" }; 
			writer.writeNext(data1); 

			String[]  data2 = { "fiscalPeriodEnding", (new Date()).toString() };
			writer.writeNext(data2);

			String[]  data3 = { "bnRegistration", "123456789RR1234" }; 
			writer.writeNext(data3);

			String[]  data4 = { "a1_bnRegistration", "34546765RR7465" }; 
			writer.writeNext(data4);

			String[] data5 = { "webAddress", "TestCharity@charity.com" }; 
			writer.writeNext(data5);

			String[] data6 = { "col_1510", "1" }; 
			writer.writeNext(data6);

			String[] data7 = { "a1_name", "Test-Org2" }; 
			writer.writeNext(data7);

			String[] data8 = { "col_1570", "1" }; 
			writer.writeNext(data8);

			String[]  data9 = { "col_1600", "1" }; 
			writer.writeNext(data9);
			
			//Section F
			String[] data10 = new String[2];
			
			//data10[0] = "";
			//data10[1] = "";
			//writer.writeNext(data9);
			
			
			////////////////////////////////
					data10[0] = "f1_phyAddCharity";
					data10[1] = "street 1";
					writer.writeNext(data10);
			
					data10[0] = "f1_addCharityBooks";
					data10[1] = "street book 1";
					writer.writeNext(data10);
					
					
					data10[0] = "f1_charityCity";
					data10[1] = "city 1";
					writer.writeNext(data10);
					
					data10[0] = "f1_charityBooksCity";
					data10[1] = "book city 1";
					writer.writeNext(data10);
					
					data10[0] = "f1_phyProv";
					data10[1] = "charity prov 1";
					writer.writeNext(data10);
					
					data10[0] = "f1_booksProv";
					data10[1] = "book prov 1";
					writer.writeNext(data10);
					
					data10[0] = "f2_name";
					data10[1] = "Mike";
					writer.writeNext(data10);
					
					data10[0] = "f2_compName";
					data10[1] = "Mike Comp 1";
					writer.writeNext(data10);
					
					data10[0] = "f2_streetAddr";
					data10[1] = "Street 122";
					writer.writeNext(data10);
					
					data10[0] = "f2_city";
					data10[1] = "Ontario, 220330";
					writer.writeNext(data10);
					
					data10[0] = "f2_phone";
					data10[1] = "1234567890";
					writer.writeNext(data10);
					
					data10[0] = "f2_isInSecE";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "privacyStatement";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_100";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_110";
					data10[1] = "2";
					writer.writeNext(data10);
					
					data10[0] = "col_120";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_130";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_200";
					data10[1] = "150";
					writer.writeNext(data10);
					
					data10[0] = "col_210";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_name_1";
					data10[1] = "org 1";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_cc_1";
					data10[1] = "ont";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_amount_1";
					data10[1] = "150";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_name_2";
					data10[1] = "org 2";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_cc_2";
					data10[1] = "Ontario";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_amount_2";
					data10[1] = "200";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_name_3";
					data10[1] = "org 3";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_cc_3";
					data10[1] = "ont55";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_amount_3";
					data10[1] = "350";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_1";
					data10[1] = "af";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_2";
					data10[1] = "al";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_3";
					data10[1] = "dz";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_4";
					data10[1] = "ao";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_5";
					data10[1] = "ar";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_6";
					data10[1] = "am";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_7";
					data10[1] = "az";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_8";
					data10[1] = "in";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_9";
					data10[1] = "id";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_3_10";
					data10[1] = "ir";
					writer.writeNext(data10);
					
					data10[0] = "col_220";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_230";
					data10[1] = "34";
					writer.writeNext(data10);
					
					data10[0] = "col_240";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_250";
					data10[1] = "0";
					writer.writeNext(data10);
					
					data10[0] = "col_260";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_item_1";
					data10[1] = "item 1";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_dest_1";
					data10[1] = "dest 1";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_countryCode_1";
					data10[1] = "CN";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_value_1";
					data10[1] = "2";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_item_2";
					data10[1] = "item 2";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_dest_2";
					data10[1] = "dest2";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_countryCode_2";
					data10[1] = "fr";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_value_2";
					data10[1] = "3";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_item_3";
					data10[1] = "item 3";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_dest_3";
					data10[1] = "dest 3";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_countryCode_3";
					data10[1] = "ml";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_value_3";
					data10[1] = "5";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_item_4";
					data10[1] = "item 4";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_dest_4";
					data10[1] = "dest 4";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_countryCode_4";
					data10[1] = "so";
					writer.writeNext(data10);
					
					data10[0] = "schedule2_7_value_4";
					data10[1] = "6";
					writer.writeNext(data10);
					
					data10[0] = "col_300";
					data10[1] = "5";
					writer.writeNext(data10);
					
					data10[0] = "col_305";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_310";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_315";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_320";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_325";
					data10[1] = "2";
					writer.writeNext(data10);
					
					data10[0] = "col_330";
					data10[1] = "3";
					writer.writeNext(data10);
					
					data10[0] = "col_335";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_340";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_345";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_370";
					data10[1] = "5";
					writer.writeNext(data10);
					
					data10[0] = "col_380";
					data10[1] = "1000";
					writer.writeNext(data10);
					
					data10[0] = "col_390";
					data10[1] = "6";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_name_1";
					data10[1] = "Test Name";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_atArms_1";
					data10[1] = "YES";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_name_2";
					data10[1] = "Test Name 2";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_atArms_2";
					data10[1] = "NO";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_name_1";
					data10[1] = "Donor 1";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_type_1";
					data10[1] = "Individual";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_value_1";
					data10[1] = "10";
					writer.writeNext(data10);
					
					
					data10[0] = "schedule4_donor_name_2";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_type_2";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_value_2";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_name_3";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_type_3";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "schedule4_donor_value_3";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_500";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_525";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_550";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_505";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_530";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_555";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_510";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_535";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_560";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_515";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_540";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_565";
					data10[1] = "others";
					writer.writeNext(data10);
					
					data10[0] = "col_520";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_545";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_580";
					data10[1] = "1500";
					writer.writeNext(data10);
					
					data10[0] = "col_4020";
					data10[1] = "2";
					writer.writeNext(data10);
					
					data10[0] = "col_4100";
					data10[1] = "10";
					writer.writeNext(data10);
					
					data10[0] = "col_4110";
					data10[1] = "20";
					writer.writeNext(data10);
					
					data10[0] = "col_4120";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4130";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4140";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4150";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4155";
					data10[1] = "15";
					writer.writeNext(data10);
					
					data10[0] = "col_4160";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4165";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4166";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4170";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4180";
					data10[1] = "100";
					writer.writeNext(data10);
					
					data10[0] = "col_4300";
					data10[1] = "15";
					writer.writeNext(data10);
					
					data10[0] = "col_4310";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4320";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4330";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4350";
					data10[1] = "15";
					writer.writeNext(data10);
					
					data10[0] = "col_4500";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_5610";
					data10[1] = "2";
					writer.writeNext(data10);
					
					data10[0] = "col_4505";
					data10[1] = "3";
					writer.writeNext(data10);
					
					data10[0] = "col_4510";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4530";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4540";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4550";
					data10[1] = "10";
					writer.writeNext(data10);
					
					data10[0] = "col_4560";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4571";
					data10[1] = "10";
					writer.writeNext(data10);
					
					data10[0] = "col_4575";
					data10[1] = "10.20";
					writer.writeNext(data10);
					
					data10[0] = "col_4580";
					data10[1] = "100.29";
					writer.writeNext(data10);
					
					data10[0] = "col_4590";
					data10[1] = "200.30";
					writer.writeNext(data10);
					
					data10[0] = "col_4600";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4610";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4620";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4630";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4640";
					data10[1] = "100";
					writer.writeNext(data10);
					
					data10[0] = "col_4650";
					data10[1] = "100";
					writer.writeNext(data10);
					
					data10[0] = "col_4655";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4800";
					data10[1] = "45";
					writer.writeNext(data10);
					
					data10[0] = "col_4810";
					data10[1] = "2";
					writer.writeNext(data10);
					
					data10[0] = "col_4820";
					data10[1] = "5";
					writer.writeNext(data10);
					
					data10[0] = "col_4830";
					data10[1] = "4";
					writer.writeNext(data10);
					
					data10[0] = "col_4840";
					data10[1] = "5";
					writer.writeNext(data10);
					
					data10[0] = "col_4850";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4860";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4870";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4890";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_4891";
					data10[1] = "3";
					writer.writeNext(data10);
					
					data10[0] = "col_4900";
					data10[1] = "4";
					writer.writeNext(data10);
					
					data10[0] = "col_4910";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4920";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4930";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_4950";
					data10[1] = "100";
					writer.writeNext(data10);
					
					data10[0] = "col_5000";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_5010";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_5020";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_5040";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_5050";
					data10[1] = "";
					writer.writeNext(data10);
					
					data10[0] = "col_5500";
					data10[1] = "1";
					writer.writeNext(data10);
					
					data10[0] = "col_5510";
					data10[1] = "2";
					writer.writeNext(data10);
					
					data10[0] = "col_5750";
					data10[1] = "200";
					writer.writeNext(data10);
					
					data10[0] = "col_5900";
					data10[1] = "300";
					writer.writeNext(data10);
					
					data10[0] = "col_5910";
					data10[1] = "566";
					writer.writeNext(data10);

			
			///////////////////////////////
			
			//Section F Done

			// closing writer connection 
			writer.close(); 
		} 
		catch (IOException e) { 
			// TODO Auto-generated catch block 
			e.printStackTrace(); 
		} 


		//Done

	}

}
