import pdfrw
import pandas as pd
import sys
from dateutil.parser import parse
import datetime as dt
from math import isnan

import webbrowser#added 9Aug

#choose one language and comment out the other
#lang="french"
#lang="eng"

#choose a form type and comment out the rest
#form_type="T3010"
#form_type= "T1236"
#form_type="T1235"

#passing arguments for AWS deployment logic
#userId="14"

print ("user id is : ", sys.argv[1])
userId=sys.argv[1]

print ("form type is : ", sys.argv[2])
form_type=sys.argv[2]

print ("language is : ", sys.argv[3])
lang=sys.argv[3]

if form_type=="T3010":
    chk_boxes=['col_1510','col_1570','col_1600','col_1800','col_2000','col_2100','col_2700','col_2800','col_3200','col_3400','col_3900','col_4000','col_5800','col_5810','col_5820','col_5830','col_4050','col_4400','col_4490','col_4565','col_100','col_110','col_120','col_130','col_210','col_220','col_240','col_250','col_260','f2_isInSecE','col_4020','col_4020_secD','privacyStatement']
if form_type=="T1236":
    chk_boxes=['t1236AssoCharity_1','t1236AssoCharity_2','t1236AssoCharity_3','t1236AssoCharity_4','t1236AssoCharity_5','t1236AssoCharity_6']
if form_type=="T1235":
    chk_boxes=['t1235AtArms_1','t1235AtArms_2','t1235AtArms_3','t1235AtArms_4','t1235AtArms_5','t1235AtArms_6','t1235AtArms_7','t1235AtArms_8','t1235AtArms_9']

#fpath="E:\\Manu\\projects\\Arlene2020\\master-tax form\\Ver_7.4\\"
fpath="/home/ubuntu/CS/scripts/python/output/"+userId+"/"

#'pdf_template = fpath + "Fillable T1236 Form for Manu.pdf"
pdf_template = "/home/ubuntu/CS/scripts/python/"+form_type+".pdf"
pdf_output = fpath + form_type+"_output.pdf"
#filename =fpath+'charity_data_dict-all-2.csv'#+charity_data_dict.csv'
filename =fpath+'charity_data_dict.csv'

yn_df=pd.DataFrame(chk_boxes)
yn_df.columns=["chk_box_yn"]
yn_df['is_yn']="y"

df=pd.read_csv(filename,names=["xlabels","vals"])
df.dropna(subset = ["vals"], inplace=True)#added on 27Aug to remove any blank vals to avoid nan
df["vals"]=df["vals"].astype(str)

df["chk_box_yn"]=df["xlabels"].map(str) #+ "-" + df["vals"].map(str)

df2=pd.merge(df,yn_df,how='left',on=['chk_box_yn'])
df2["vals"]=df2["vals"].astype(str)
df2["is_yn"]=df2["is_yn"].astype(str)
df2["is_yn_12"]=df2["is_yn"] + "-" + df2["vals"]
print(df2.columns)
#if form_type=="t3010-20e":
df2["xlabels"]=df2["xlabels"].astype(str)


df2.vals[df2.is_yn_12=="y-1"]="On"
df2.vals[df2.is_yn_12=="y-2"]="On"

df2.vals[df2.vals=="true"]="On"
df2.vals[df2.vals=="TRUE"]="On"

df2.xlabels[df2.is_yn_12=="y-1"]=df2["xlabels"]+"_y"
df2.xlabels[df2.is_yn_12=="y-2"]=df2["xlabels"]+"_n"

df2=df2.drop(["chk_box_yn","is_yn","is_yn_12"], axis = 1) #drop column
mydict=df2.set_index('xlabels').to_dict()['vals']

#mydict['bnRegistration']=mydict['bnRegistration'][:9]+"          "+mydict['bnRegistration'][11:]
if form_type=="T3010":

    try:
        mydict['fiscalPeriodEnding'] = parse(mydict['fiscalPeriodEnding']).strftime('%Y%m%d')
        #mydict['fiscalPeriodEnding']=" ".join(mydict['fiscalPeriodEnding'])
    except:
        pass

    try:
        mydict['secEDate'] = parse(mydict['secEDate']).strftime('%Y%m%d')
    except:
        pass

#schedule 6-28jul2021

    try:
        mydict["schedule4_donor_type_1" + "_" + mydict.get("schedule4_donor_type_1")]= "X"
    except:
        pass

    try:
        mydict["schedule4_donor_type_2" + "_" + mydict.get("schedule4_donor_type_2")]= "X"
    except:
        pass

    try:
        mydict["schedule4_donor_type_3" + "_" + mydict.get("schedule4_donor_type_3")]= "X"
    except:
        pass

if form_type=="T1235":
    try:
        mydict['t1235dob1'] = parse(mydict['t1235dob1']).strftime('%Y%m%d')
        mydict['t1235dob2'] = parse(mydict['t1235dob2']).strftime('%Y%m%d')
        mydict['t1235dob3'] = parse(mydict['t1235dob3']).strftime('%Y%m%d')
        mydict['t1235dob4'] = parse(mydict['t1235dob4']).strftime('%Y%m%d')
        mydict['t1235dob5'] = parse(mydict['t1235dob5']).strftime('%Y%m%d')
        mydict['t1235dob6'] = parse(mydict['t1235dob6']).strftime('%Y%m%d')
        mydict['t1235dob7'] = parse(mydict['t1235dob7']).strftime('%Y%m%d')
        mydict['t1235dob8'] = parse(mydict['t1235dob8']).strftime('%Y%m%d')
        mydict['t1235dob9'] = parse(mydict['t1235dob9']).strftime('%Y%m%d')
    except:
        pass

#29Jul2021 - for start date
    try:
        mydict['t1235sd1'] = parse(mydict['t1235sd1']).strftime('%Y%m%d')
        mydict['t1235sd2'] = parse(mydict['t1235sd2']).strftime('%Y%m%d')
        mydict['t1235sd3'] = parse(mydict['t1235sd3']).strftime('%Y%m%d')
        mydict['t1235sd4'] = parse(mydict['t1235sd4']).strftime('%Y%m%d')
        mydict['t1235sd5'] = parse(mydict['t1235sd5']).strftime('%Y%m%d')
        mydict['t1235sd6'] = parse(mydict['t1235sd6']).strftime('%Y%m%d')
        mydict['t1235sd7'] = parse(mydict['t1235sd7']).strftime('%Y%m%d')
        mydict['t1235sd8'] = parse(mydict['t1235sd8']).strftime('%Y%m%d')
        mydict['t1235sd9'] = parse(mydict['t1235sd9']).strftime('%Y%m%d')
    except:
        pass

#27Aug2021 - for end date
    try:
        mydict['t1235ed1'] = parse(mydict['t1235ed1']).strftime('%Y%m%d')
        mydict['t1235ed2'] = parse(mydict['t1235ed2']).strftime('%Y%m%d')
        mydict['t1235ed3'] = parse(mydict['t1235ed3']).strftime('%Y%m%d')
        mydict['t1235ed4'] = parse(mydict['t1235ed4']).strftime('%Y%m%d')
        mydict['t1235ed5'] = parse(mydict['t1235ed5']).strftime('%Y%m%d')
        mydict['t1235ed6'] = parse(mydict['t1235ed6']).strftime('%Y%m%d')
        mydict['t1235ed7'] = parse(mydict['t1235ed7']).strftime('%Y%m%d')
        mydict['t1235ed8'] = parse(mydict['t1235ed8']).strftime('%Y%m%d')
        mydict['t1235ed9'] = parse(mydict['t1235ed9']).strftime('%Y%m%d')
    except:
        pass

#27Aug2021 - for end date
    try:
        mydict['t1235Street_1'] = mydict['t1235Street_1'].replace('\n','')
        mydict['t1235Street_2'] = mydict['t1235Street_2'].replace('\n','')
        mydict['t1235Street_3'] = mydict['t1235Street_3'].replace('\n','')
        mydict['t1235Street_4'] = mydict['t1235Street_4'].replace('\n','')
        mydict['t1235Street_5'] = mydict['t1235Street_5'].replace('\n','')
        mydict['t1235Street_6'] = mydict['t1235Street_6'].replace('\n','')
        mydict['t1235Street_7'] = mydict['t1235Street_7'].replace('\n','')
        mydict['t1235Street_8'] = mydict['t1235Street_8'].replace('\n','')
        mydict['t1235Street_9'] = mydict['t1235Street_9'].replace('\n','')
    except:
        pass



    try:
        mydict['t1235ReturnOfFiscalPeriod'] = parse(mydict['t1235ReturnOfFiscalPeriod']).strftime('%Y%m%d')
    except:
        pass
######

    try:
        mydict['t1235Phone_1'] = mydict['t1235Phone_1'][:3]+" "+mydict['t1235Phone_1'][3:6]+" "+mydict['t1235Phone_1'][6:]
        mydict['t1235Phone_2'] = mydict['t1235Phone_2'][:3]+" "+mydict['t1235Phone_2'][3:6]+" "+mydict['t1235Phone_2'][6:]
        mydict['t1235Phone_3'] = mydict['t1235Phone_3'][:3]+" "+mydict['t1235Phone_3'][3:6]+" "+mydict['t1235Phone_3'][6:]
        mydict['t1235Phone_4'] = mydict['t1235Phone_4'][:3]+" "+mydict['t1235Phone_4'][3:6]+" "+mydict['t1235Phone_4'][6:]
        mydict['t1235Phone_5'] = mydict['t1235Phone_5'][:3]+" "+mydict['t1235Phone_5'][3:6]+" "+mydict['t1235Phone_5'][6:]
        mydict['t1235Phone_6'] = mydict['t1235Phone_6'][:3]+" "+mydict['t1235Phone_6'][3:6]+" "+mydict['t1235Phone_6'][6:]
        mydict['t1235Phone_7'] = mydict['t1235Phone_7'][:3]+" "+mydict['t1235Phone_7'][3:6]+" "+mydict['t1235Phone_7'][6:]
        mydict['t1235Phone_8'] = mydict['t1235Phone_8'][:3]+" "+mydict['t1235Phone_8'][3:6]+" "+mydict['t1235Phone_8'][6:]
        mydict['t1235Phone_9'] = mydict['t1235Phone_9'][:3]+" "+mydict['t1235Phone_9'][3:6]+" "+mydict['t1235Phone_9'][6:]
    except:
        pass


#code for t1236
if form_type=="T1236":
    try:
        mydict['fiscalPeriodEnding_1236'] = parse(mydict['fiscalPeriodEnding_1236']).strftime('%Y%m%d')
        #mydict['fiscalPeriodEnding']=" ".join(mydict['fiscalPeriodEnding'])
    except:
        pass

template_pdf = pdfrw.PdfReader(pdf_template)

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'
ANNOT_FORM_button = '/Btn' #added on19June
ANNOT_FORM_type = '/FT' #added on19June
ANNOT_FORM_text = '/Tx' #added on19June


#this code prints all keys-commented out for deployment
'''
for page in template_pdf.pages:
    annotations = page[ANNOT_KEY]
    try:
        for annotation in annotations:
            try:
                if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                    if annotation[ANNOT_FIELD_KEY]:
                        key = annotation[ANNOT_FIELD_KEY][1:-1]
                        print(key)
            except:
                pass
    except:
        pass

'''
#the code above prints all keys-commented out for deployment
data_dict =mydict
#data_dict = {
#    'Charity name': 'Charity name-x',
#    'Year': '2021'
#}

def fill_pdf_1(input_pdf_path, output_pdf_path, data_dict):
    template_pdf = pdfrw.PdfReader(input_pdf_path)
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))
    for page in template_pdf.pages:
        annotations = page[ANNOT_KEY]
        try:
            for annotation in annotations:
                if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                    if annotation[ANNOT_FIELD_KEY]:
                        key = annotation[ANNOT_FIELD_KEY][1:-1]
                        if key in data_dict.keys():
                            if type(data_dict[key]) == bool:
                                if data_dict[key] == True:
                                    annotation.update(pdfrw.PdfDict(
                                        AS=pdfrw.PdfName('Yes')))
                            else:
                                annotation.update(
                                    pdfrw.PdfDict(V='{}'.format(data_dict[key]))
                                )
                                annotation.update(pdfrw.PdfDict(AP=''))
        except:
            pass
    pdfrw.PdfWriter().write(output_pdf_path, template_pdf)

def fill_pdf(input_pdf_path, output_pdf_path, data_dict):
    template_pdf = pdfrw.PdfReader(input_pdf_path)
    for Page in template_pdf.pages:
        if Page[ANNOT_KEY]:
            for annotation in Page[ANNOT_KEY]:
                if annotation[ANNOT_FIELD_KEY] and annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY :
                    key = annotation[ANNOT_FIELD_KEY][1:-1] # Remove parentheses
                    if key in data_dict.keys():
                        if annotation[ANNOT_FORM_type] == ANNOT_FORM_button:
                            # button field i.e. a checkbox
                            annotation.update( pdfrw.PdfDict( V=pdfrw.PdfName(data_dict[key]) , AS=pdfrw.PdfName(data_dict[key]) ))
                        elif annotation[ANNOT_FORM_type] == ANNOT_FORM_text:
                            # regular text field
                            annotation.update( pdfrw.PdfDict( V=data_dict[key], AP=data_dict[key]) )
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))
    pdfrw.PdfWriter().write(output_pdf_path, template_pdf)



fill_pdf(pdf_template, pdf_output, data_dict)

#below coded added on 9Aug
new = 2 # open in a new tab
url = pdf_output #location of output file
webbrowser.open(url,new=new)
