# -*- coding: utf-8 -*-
"""
Created on Sun Feb  4 12:59:13 2018

@author: bryan.nonni
"""

import os
import time
from datetime import datetime
from selenium import webdriver

#

# Chrome Location, combines webshots folder to the chrome driver
firefox_path = os.path.join('.', 'geckodriver.exe')
#print(firefox_path)


def google_search_screenshots(screen_folder):
    #not passing driver in function bc we're only looking at one Driver: FF
    """
    """
    driver = webdriver.Firefox()
    print (driver.get_window_size())
    
    driver.set_window_size(1280, 10000)
    print (driver.get_window_size())
    driver.get('https://www.ebates.com')
    time.sleep(5)
    driver.find_element_by_css_selector("a.button.show-join-overlay.f-grn.f-15.trans-bg.trans-color").click()
    driver.find_element_by_name("username").send_keys("bryan.nonni@360i.com")
    pswd = "**********"
    driver.find_element_by_css_selector("a.google-join.blk.w-292").click()
    time.sleep(5)
    
    
    #Google login
    #driver.find_element_by_css_selector("input#identifierId.whsOnd.zHQkBf").send_keys("alphahusky86@gmail.com")
    #driver.find_element_by_css_selector("input.whsOnd.zHQkBf").send_keys("gunn3rC0lt!!")
    #driver.find_element_by_css_selector("span.RveJvd.snByac").click()
    
    driver.find_element_by_css_selector("input.text.validation-required.password").send_keys(pswd)
    
    time.sleep(2)                           
    
    driver.find_element_by_css_selector("input.prox-r.button.reg.ht-36.int.blk.join-button.submit-button.w-140.frt").click()
    driver.implicitly_wait(2)
    
    file_name = datetime.strftime(datetime.today(), '%Y-%m-%d %H-%M-%S')
    driver.save_screenshot(os.path.join(screen_folder, '{}.png'.format(file_name)))
        
    #driver.close()
    
## Checking
data_path = datetime.strftime(datetime.today(), '%Y-%m-%d %H-%M-%S')

if data_path in os.listdir(os.getcwd()):
    pass
else:
    print("File not found, Creating Now . . .")
    os.mkdir(data_path)

    
    google_search_screenshots(data_path)
