package com.project.be.charitable.utility;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.opencsv.CSVWriter;

/**
 * @author geeta
 *
 */
public class CharitableUtilities {
	
	private static final Logger logger = LoggerFactory.getLogger(CharitableUtilities.class);
	
	public static <T> Map<String,String> convertDtoIntoKeyValPair(T dto){

		Map<String, String> dtoKeyValPair = new HashMap<>();
		try {
			String jsonString = convertToJsonString(dto);
			//jsonString = jsonString.replaceAll("\"", "");
			JSONObject output = new JSONObject(jsonString); 

			//logger.info("Keys : {} ",output.keys());

			Iterator<?> it = output.keys();
			while(it.hasNext()){
				String key = (String) it.next();
				String value = (output.get(key)).toString();
				logger.info("Value of key : {} is : {} ",key,value);
				
				if(key.equals("fiscalPeriodEnding")){
					String arr[] = value.split("-");
					value = arr[0]+arr[1]+arr[2];
					logger.info("NEW : Value of key : {} is : {} ",key,value);
				}
				dtoKeyValPair.put(key, value);
			}
		} catch (Exception e) {
			logger.error("Error while converting dto into key-value pair for CSV : {} ",e);
			return null;
		}
		return dtoKeyValPair;
	}
	
	public static <T> String convertToJsonString(T sourceObject){
		Gson gson = new Gson();
		return gson.toJson(sourceObject);
	}
	
	public static void convertKeyValPairToCsv(Map<String, String> keyValueData, String csvPath, String fileName){
		
		File directory = new File(csvPath);
	    if (! directory.exists()){
	        directory.mkdir();
	        // If you require it to make the entire directory path including parents,
	        // use directory.mkdirs(); here instead.
	    }
		//String filePath = csvPath+"charity_data_dict.csv";
	    String filePath = csvPath+fileName;
		File file = new File(filePath); 
		try { 
			FileWriter outputfile = new FileWriter(file);

			CSVWriter writer = new CSVWriter(outputfile); 

			keyValueData.forEach((key,val) -> {
				String[] data = new String[2];
				data[0] = key.replaceAll("\"", "");
				data[1] = val.replaceAll("\"", "");
				writer.writeNext(data);

			});
			writer.close(); 
		}catch(IOException e){
			logger.error("Error while writing CSV file : {} ",e);
		}

	}
	
	public static int executePythonToCreateDoc(String pythonScriptPath, Long userId, String lang, String fileType){
		
		logger.info("Executing python from path : {} for user id : {} lang : {} fileType : {} ",pythonScriptPath, userId, lang, fileType);
		int result = -1;
		try{
			String[] cmd = new String[5];
			cmd[0] = "python";
			cmd[1] = pythonScriptPath;
			cmd[2] = userId.toString();
			cmd[3] = fileType;
			cmd[4] = lang;

			Runtime rt = Runtime.getRuntime();
			Process pr = rt.exec(cmd);
			if(pr.waitFor() == 0){
				logger.info("Success while executing python");
				result = 1;
			}
		} catch (InterruptedException | IOException e) {
			logger.error("Problem while executing python : {} ",e);
		}
		return result;
	}

}
