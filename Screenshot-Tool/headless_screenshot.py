#AWS for Python
#boto3
import os
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

#Setting the path
PATH = os.path.join('.', 'geckodriver.exe')

#Adding Headless/No browser Screnshots - aka the browser doesnt pop up!!!
options = Options()
options.add_argument("--headless")

#Creating the webdriver
driver = webdriver.Firefox(firefox_options=options)

#Screenshot time
driver.get("https://www.facebook.com")
driver.save_screenshot('FB.png')
driver.quit()
