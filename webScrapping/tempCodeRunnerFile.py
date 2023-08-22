from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests
from PIL import Image
from io import BytesIO

# Create a Chrome WebDriver instance
driver = webdriver.Chrome()

# Open a URL
driver.get("https://mendes113.github.io/todayNasa/")


    


start_button = driver.find_element(By.ID,"downloadBtn")

    # Click the start button
start_button.click()
print("start button clicked")

