#from _future_ import print_function
from mailmerge import MailMerge
from datetime import date
import csv
import sys
import os
#import comtypes.client
import pandas as pd

chk_boxes=['col_1510-0','col_1570-0','col_1600-0','col_100-0','col_110-0','col_120-0','col_130-0','col_210-0','col_220-0','col_240-0','col_250-0','col_260-0','col_1510-1','col_1570-1','col_1600-1','col_100-1','col_110-1','col_120-1','col_130-1','col_210-1','col_220-1','col_240-1','col_250-1','col_260-1','f2_isInSecE-0','f2_isInSecE-1']       
#file_path="E:\\Manu\\projects\\Arlene2020\\phase2\\development team\\mail_merge_approach\\final_testing2\\"
file_path="/home/ubuntu/scripts/python/"
filename =file_path+'charity_data_dict.csv'

df=pd.read_csv(filename,names=["labels","vals"])
df["vals"]=df["vals"].astype(str)
#df["vals"].replace({"1":"X    Yes            No","2":".    Yes         X  No"})
#df.replace({"vals":{1:"X    Yes            No",2:".    Yes         X  No"}})

df["chk_box_yn"]=df["labels"].map(str) + "-" + df["vals"].map(str)
for key in df["chk_box_yn"]:
    df.vals[df.vals=="1"]="X    Yes            No"
    df.vals[df.vals=="2"]=".    Yes         X  No"

df=df.drop(["chk_box_yn"], axis = 1)
mydict=df.set_index('labels').to_dict()['vals']
#mydict=pd.Series(df.vals.values,index=df.labels).to_dict()
#mydict=df.to_dict()

#==============================================================================
# with open(filename, mode='r') as infile:
#     reader = csv.reader(infile)
#     mydict = {rows[0]:rows[1] for rows in reader}
# print(mydict)
#==============================================================================

# Define the templates - assumes they are in the same directory as the code
template_1 = file_path+"t3010-20e_auto.docx"

document_1 = MailMerge(template_1)
#tags=document_1.get_merge_fields()
document_1.merge_pages(
        [mydict]
    )
document_1.write(file_path+'t3010-20e_auto_out.docx')

#wdFormatPDF = 17
#in_file = file_path + "t3010-20e_auto_out.docx"
#out_file=file_path + "t3010-20e_auto_out.pdf"
#word = comtypes.client.CreateObject('Word.Application')
#doc = word.Documents.Open(in_file)
#doc.SaveAs(out_file, FileFormat=wdFormatPDF)
#doc.Close()
#word.Quit()
