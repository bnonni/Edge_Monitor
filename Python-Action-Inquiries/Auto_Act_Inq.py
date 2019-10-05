# -*- coding: utf-8 -*-
"""
Created on Mon Feb  5 16:26:43 2018

@author: bryan.nonni
"""

import os
import time
import pandas as pd
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

# setting up options for the webdriver
options = Options()
options.add_argument("--headless")

# creates the webdriver
driver = webdriver.Firefox(firefox_options=options)

# sets the path to the gecko driver
firefox_path = os.path.join('.', 'geckodriver.exe')
#print(firefox_path)


def part_un(file_name):
    #not passing driver in function bc we're only looking at one Driver: FF
    """
    First function: determines if a unique filename has been created and passes that name to omniture_automation
    accessess and runs FF webdriver
    logs into omniture
    runs a report for a specified time period
    """
    print("Accessing & running Firefox . . . Please wait :)")
    print("Visiting your site . . .")
    driver.get('https://sc5.omniture.com/sc15/reports/index.html?a=Report.Standard&r=Report.GetConversions&rp=ec_pri%7C108%3Bec_reset%7C1&ssSession=ac0bcfc43800e14c4634d81dcab40def&jpj=9284192613174#/')
    driver.find_element_by_name("company").send_keys("ToysRUs")
    driver.find_element_by_name("username").send_keys("kfreeberg")
    driver.find_element_by_name("password").send_keys("kellyf")
    driver.find_element_by_id("login_button").click()
    print("Napping . . .")
    time.sleep(20)
    print("Nap Complete . . .")
    driver.find_element_by_id("calendar-widget-content").click()
    driver.find_element_by_name("start").clear()
    driver.find_element_by_name("start").send_keys("08/01/2017")
    driver.find_element_by_name("end").clear()
    today = datetime.strftime(datetime.today(), '%m-%d-%Y')
    driver.find_element_by_name("end").send_keys(today)
    driver.find_element_by_name("run").click()
   # print("Napping . . .")
   # time.sleep(15)
   # print("Nap Complete . . .")
    part_deux()
count = 0
def part_deux():
    
    """
    Second function: reads in CSV
    runs for loop on CSV and pulls Order ID from csv
    feeds OID into report interface on Omniture and searches for order
    """
    data = pd.read_csv('Transaction Inquiries 02052018 (CSV).csv')
    for orderID in data:
        oID = data.loc[count]['Order ID']
        driver.find_element_by_id("search_filter_control_search_input_txt").send_keys(oID)
        driver.find_element_by_id("search_filter_control_go_btn").click()
        print("Napping . . .")
        time.sleep(15)
        print("Nap Complete . . .")
        
        """
        Conditional: statement tests if the response in the report is 'no match'
        if no match exists, clears search box and adds next Oid to field, searches report
        if match exists, drills down into the details of the Oid to determine media partner and amount of sale
        """
        if driver.find_element_by_xpath("//*[contains(text(), 'No data match these criteria. Please verify the segment, metrics, date range and filters.')]"):
            part_trois(count, data)
        else:
            driver.find_element_by_css_selector("td.data_table_text.data_table_drilldown.a.img").click()
            driver.find_element_by_id("context_menu_s01_12_04_id").click()
            driver.implicitly_wait(15)
            driver.save_screenshot(os.path.join(file_name, '{}.png'.format(oID)))

def part_trois(count, data):
    if driver.find_element_by_xpath("//*[contains(text(), 'No data match these criteria. Please verify the segment, metrics, date range and filters.')]"):
        count += 1
        print(count)
        oID = data.loc[count]['Order ID']
        print(oID)
        driver.find_element_by_class_name("clear-search").click()
        driver.find_element_by_id("search_filter_control_search_input_txt").send_keys(oID)
        driver.find_element_by_id("search_filter_control_go_btn").click()
        print("Napping . . .")
        time.sleep(15)
        print("Nap Complete . . .")
    else:
        part_deux(count)
        
"""
Next function: should copy and paste the details of that Oid drilldown into a new csv or current csv next to Oid
"""

file_name = datetime.strftime(datetime.today(), '%Y-%m-%d %h-%m')
if file_name in os.listdir(os.getcwd()):
    pass
    print("File Found . . .")
    part_un(file_name) 
else:
    print("File not found, Creating Now . . .")
    os.mkdir(file_name)
    
    print("File created . . .")
    part_un(file_name) 









