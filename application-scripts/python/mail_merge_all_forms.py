#importing libs
from __future__ import print_function
from mailmerge import MailMerge
from datetime import date
import csv
import sys
import os
#import comtypes.client
import pandas as pd
from dateutil.parser import parse 
import datetime as dt#added this 22 march 2021

#choose one language and comment out the other
#lang="french"
#lang="eng"

#choose a form type and comment out the rest
#form_type="t3010-20e" #"t1235-20e" or "t1236-19e"
#form_type= "t1235-20e" #"t1236-19e" or #"t3010-20e"
#form_type= "t1236-19e" #"t3010-20e" #"t1235-20e"

#passing arguments for AWS deployment logic

print ("user id is : ", sys.argv[1])
userId=sys.argv[1]

print ("form type is : ", sys.argv[2])
form_type=sys.argv[2]

print ("language is : ", sys.argv[3])
lang=sys.argv[3]


#yesno type fields as list for each form type
if form_type=="t3010-20e":
    chk_boxes=['col_1510','col_1570','col_1600','col_1800','col_2000','col_2100','col_2700','col_3200','col_3400','col_3900','col_4000','col_5800','col_5810','col_5820','col_5830','col_4050','col_4400','col_4490','col_4565','col_100','col_110','col_120','col_130','col_210','col_220','col_240','col_250','col_260','f2_isInSecE']
if form_type=="t1235-20e":
    chk_boxes=['t1235AtArms_1','t1235AtArms_2','t1235AtArms_3','t1235AtArms_4','t1235AtArms_5','t1235AtArms_6','t1235AtArms_7','t1235AtArms_8','t1235AtArms_9']
if form_type=="t1236-19e":
    chk_boxes=['t1236AssoCharity_1','t1236AssoCharity_2','t1236AssoCharity_3','t1236AssoCharity_4','t1236AssoCharity_5','t1236AssoCharity_6']

yn_df=pd.DataFrame(chk_boxes)
yn_df.columns=["chk_box_yn"]
yn_df['is_yn']="y"

#file_path="E:\\Manu\\projects\\Arlene2020\\phase2\\development team\\mail_merge_approach\\for_deployment\\21Mar2021\\"
file_path="/home/ubuntu/CS/scripts/python/output/"+userId+"/"

filename =file_path+'charity_data_dict.csv'
df=pd.read_csv(filename,names=["labels","vals"])
df["vals"]=df["vals"].astype(str)

df["chk_box_yn"]=df["labels"].map(str) #+ "-" + df["vals"].map(str)

df2=pd.merge(df,yn_df,how='left',on=['chk_box_yn'])
df2["vals"]=df2["vals"].astype(str)
df2["is_yn"]=df2["is_yn"].astype(str)
df2["is_yn_12"]=df2["is_yn"] + "-" + df2["vals"]

if form_type=="t3010-20e":
    df2.vals[df2.is_yn_12=="y-1"]="X    Yes            No"
    df2.vals[df2.is_yn_12=="y-2"]=".    Yes         X  No"

if form_type=="t1235-20e":
    df2.vals[df2.is_yn_12=="y-1"]="X    Yes            No"
    df2.vals[df2.is_yn_12=="y-2"]=".    Yes       X  No"
    
if form_type=="t1236-19e":
    df2.vals[df2.is_yn_12=="y-1"]="X    Yes            No"
    df2.vals[df2.is_yn_12=="y-2"]=".    Yes     X  No"
    
df2.vals[df2.vals=="TRUE"]="X" #for t3010 fields 500 to 565 and 2500 ti 2660
df2.vals[df2.vals=="true"]="X" #for t3010 fields 500 to 565 and 2500 ti 2660
     
df2=df2.drop(["chk_box_yn","is_yn","is_yn_12"], axis = 1) #drop column
mydict=df2.set_index('labels').to_dict()['vals']

#formatting dates in dataframe
#form_type="t3010-20e" #"t1235-20e" or "t1236-19e"
if form_type=="t3010-20e":
    #fiscalPeriodEnding_ddmmyy= mydict['fiscalPeriodEnding'][-4:] + "  " +mydict['fiscalPeriodEnding'][4:7]+"  "+mydict['fiscalPeriodEnding'][8:10]   
    try:
        fiscalPeriodEnding_yyyymmdd = parse(mydict['fiscalPeriodEnding']).strftime('%Y %m %d')
        fiscalPeriodEnding_yyyymmdd="  ".join(fiscalPeriodEnding_yyyymmdd)
        mydict['fiscalPeriodEnding']= fiscalPeriodEnding_yyyymmdd #added 22mar for date formatting
        #print (mydict['fiscalPeriodEnding'])
        secEDate_yyyymmdd = parse(mydict['secEDate']).strftime('%Y %m %d')
        #secEDate_yyyymmdd="  ".join(fiscalPeriodEnding_yyyymmdd)
        mydict['secEDate']= secEDate_yyyymmdd #added 22mar for date formatting
    except:
        pass #this exception has been added in case secEdate field is missing in csv

#these lines added to accomodate col_4020 - Accrual or Cash
    if mydict['col_4020']== '1':
        mydict['col_4020']="X  Accrual            Cash"
    if mydict['col_4020']== '2':
        mydict['col_4020']=".    Accrual     X  Cash"

#these line added for col 305, 310...345
    try:
        if mydict['col_305']== '2':
            mydict['col_305']="X"
    except:
        pass        
        
    try:
        if mydict['col_310']== '2':
            mydict['col_310']="X"
    except:
        pass        

    try:
        if mydict['col_315']== '2':
            mydict['col_315']="X"
    except:
        pass        

    try:
        if mydict['col_320']== '2':
            mydict['col_320']="X"
    except:
        pass        

    try:
        if mydict['col_325']== '2':
            mydict['col_325']="X"
    except:
        pass        

    try:
        if mydict['col_330']== '2':
            mydict['col_330']="X"
    except:
        pass        


    try:
        if mydict['col_335']== '2':
            mydict['col_335']="X"
    except:
        pass        


    try:
        if mydict['col_340']== '2':
            mydict['col_340']="X"
    except:
        pass        
    
    try:
        if mydict['col_345']== '2':
            mydict['col_345']="X"
    except:
        pass  
# these lines added to get rid of nans in out files
    if "col_5050" in mydict.keys():
        pass
    else:
        mydict["col_5050"]=""

    if "col_4580" in mydict.keys():
        pass
    else:
        mydict["col_4580"]=""

    if "col_5610" in mydict.keys():
        pass
    else:
        mydict["col_5610"]=""
        
if form_type=="t1235-20e":
    date_labels=['t1235dob','t1235sd','t1235ed']
    for date_label in date_labels:
        for i in range(10):
            i=i+1
            try:
                date_label_yyyymmdd = parse(mydict[date_label+str(i)]).strftime('%Y %m %d')
                date_label_yyyymmdd="  ".join(date_label_yyyymmdd)
                mydict[date_label+str(i)]= date_label_yyyymmdd #added 22mar for date formatting
            except:
                pass
    mydict['t1235ReturnOfFiscalPeriod']= "    ".join(mydict.get('t1235ReturnOfFiscalPeriod',""))   
    
    
    #mydict['t1235sd1']= "  ".join(mydict.get('t1235sd1',""))   
    #mydict['t1235sd2']= "  ".join(mydict.get('t1235sd2',""))  
    #mydict['t1235sd3']= "  ".join(mydict.get('t1235sd3',""))      
    #mydict['t1235sd4']= "  ".join(mydict.get('t1235sd4',""))
    #mydict['t1235sd5']= "  ".join(mydict.get('t1235sd5',""))    
    #mydict['t1235sd6']= "  ".join(mydict.get('t1235sd6',""))
    #mydict['t1235sd7']= "  ".join(mydict.get('t1235sd7',""))
    #mydict['t1235sd8']= "  ".join(mydict.get('t1235sd8',""))
    #mydict['t1235sd9']= "  ".join(mydict.get('t1235sd9',""))    
    
      
    '''
    mydict['t1235ed1']= "     ".join(mydict.get('t1235ed1',""))   
    mydict['t1235ed2']= "     ".join(mydict.get('t1235ed2',""))   
    mydict['t1235ed3']= "     ".join(mydict.get('t1235ed3',""))   
    mydict['t1235ed4']= "     ".join(mydict.get('t1235ed4',""))   
    mydict['t1235ed5']= "     ".join(mydict.get('t1235ed5',""))   
    mydict['t1235ed6']= "     ".join(mydict.get('t1235ed6',""))   
    mydict['t1235ed7']= "     ".join(mydict.get('t1235ed7',""))   
    mydict['t1235ed8']= "     ".join(mydict.get('t1235ed8',""))   
    mydict['t1235ed9']= "     ".join(mydict.get('t1235ed9',""))       
    
    mydict['t1235dob1']= "     ".join(mydict.get('t1235dob1',""))     
    mydict['t1235dob2']= "     ".join(mydict.get('t1235dob2',""))
    mydict['t1235dob3']= "     ".join(mydict.get('t1235dob3',""))
    mydict['t1235dob4']= "     ".join(mydict.get('t1235dob4',""))
    mydict['t1235dob5']= "     ".join(mydict.get('t1235dob5',""))
    mydict['t1235dob6']= "     ".join(mydict.get('t1235dob6',""))
    mydict['t1235dob7']= "     ".join(mydict.get('t1235dob7',""))
    mydict['t1235dob8']= "     ".join(mydict.get('t1235dob8',""))
    mydict['t1235dob9']= "     ".join(mydict.get('t1235dob9',""))    
    '''
    
    mydict['t1235Phone_1']= "  ".join(mydict.get('t1235Phone_1',""))     
    mydict['t1235Phone_2']= "  ".join(mydict.get('t1235Phone_2',""))     
    mydict['t1235Phone_3']= "  ".join(mydict.get('t1235Phone_3',""))     
    mydict['t1235Phone_4']= "  ".join(mydict.get('t1235Phone_4',""))     
    mydict['t1235Phone_5']= "  ".join(mydict.get('t1235Phone_5',""))         
    mydict['t1235Phone_6']= "  ".join(mydict.get('t1235Phone_6',""))
    mydict['t1235Phone_7']= "  ".join(mydict.get('t1235Phone_7',""))
    mydict['t1235Phone_8']= "  ".join(mydict.get('t1235Phone_8',""))
    mydict['t1235Phone_9']= "  ".join(mydict.get('t1235Phone_9',""))    
    
    mydict['t1235Code_1']= "   ".join(mydict.get('t1235Code_1',"")) 
    mydict['t1235Code_2']= "   ".join(mydict.get('t1235Code_2',""))
    mydict['t1235Code_3']= "   ".join(mydict.get('t1235Code_3',""))
    mydict['t1235Code_4']= "   ".join(mydict.get('t1235Code_4',""))
    mydict['t1235Code_5']= "   ".join(mydict.get('t1235Code_5',""))
    mydict['t1235Code_6']= "   ".join(mydict.get('t1235Code_6',""))
    mydict['t1235Code_7']= "   ".join(mydict.get('t1235Code_7',""))
    mydict['t1235Code_8']= "   ".join(mydict.get('t1235Code_8',""))
    mydict['t1235Code_9']= "   ".join(mydict.get('t1235Code_9',""))    
    
if form_type=="t1236-19e":
    mydict['fiscalPeriodEnding_1236']= "   ".join(mydict.get('fiscalPeriodEnding_1236',"")) 
    
#print(mydict['fiscalPeriodEnding'])

#mydict=pd.Series(df.vals.values,index=df.labels).to_dict()
#mydict=df.to_dict()

#==============================================================================
# with open(filename, mode='r') as infile:
#     reader = csv.reader(infile)
#     mydict = {rows[0]:rows[1] for rows in reader}
# print(mydict)
#==============================================================================

# Define the templates - assumes they are in the same directory as the code
#template_1 = file_path+form_type+'_'+lang+".docx"
template_1 = file_path+'../../'+form_type+'_'+lang+".docx"

print(template_1)
document_1 = MailMerge(template_1)
#tags=document_1.get_merge_fields()
document_1.merge_pages(
#document_1.merge_templates(
        [mydict]
    )
document_1.write(file_path+form_type+'_'+lang+'_out.docx')

#### comment out below this for deployment
#wdFormatPDF = 17
#in_file = file_path + "t3010-20e_auto_out.docx"
#out_file=file_path + "t3010-20e_auto_out.pdf"
#word = comtypes.client.CreateObject('Word.Application')
#doc = word.Documents.Open(in_file)
#doc.SaveAs(out_file, FileFormat=wdFormatPDF)
#doc.Close()
#word.Quit()
