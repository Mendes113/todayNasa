from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# Create a Chrome WebDriver instance
driver = webdriver.Chrome()

# Open a URL
driver.get("https://mendes113.github.io/todayNasa/")
# driver.wait_for_page_to_load(3)
# Close the WebDriver when done
try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "myDynamicElement"))
    )
finally:
    driver.quit()
# driver.quit()