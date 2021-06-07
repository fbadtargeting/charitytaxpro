package com.project.be.charitable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


/**
 * @author geeta
 *
 */
@SpringBootApplication
@EnableSwagger2
public class CharitySectorApplication {
	
	private static final Logger logger = LoggerFactory.getLogger(CharitySectorApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(CharitySectorApplication.class, args);
		logger.info(" ** Charity Sectory Application is up and running **");
	}

}
