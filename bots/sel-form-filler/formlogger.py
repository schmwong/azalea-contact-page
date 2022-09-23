# Prevent generation of .pyc cache files
import sys
sys.dont_write_bytecode = True

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ChromeOptions
from selenium import webdriver
import time
import logging
from logging_formatter import CsvFormatter
from add_logging_level import addLoggingLevel
# from selenium.webdriver.firefox.options import Options
import traceback


# configure webdriver
options = ChromeOptions()
# options = Options()
################################################
# To run on Linux root without crashing
# options.add_argument('--headless')
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--no-sandbox")
################################################


addLoggingLevel("FNAME", 25, "fname")
addLoggingLevel("EMAIL", 26, "email")
addLoggingLevel("MESSAGE", 27, "message")
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = CsvFormatter()
DuoHandler = logging.StreamHandler()
DuoHandler.setFormatter(formatter)
logger.addHandler(DuoHandler)


class FormLogger:

    def __init__(self, form_url) -> None:
        self.form_url = form_url
        self.browser = webdriver.Chrome(options=options)


    def fillform(self, firstname, email, message):
        try:
            wait = WebDriverWait(self.browser, 6)

            # Launch a new browser instance and load the form
            logger.info("Launching browser")
            logger.info(f"Retrieving form from <{self.form_url}>")
            self.browser.get(self.form_url)
            time.sleep(3)
            wait.until(EC.presence_of_element_located((By.ID, "submit-btn")))

            # Fill the form (press Tab key to trigger a blur event)
            logger.info("Filling form")
            wait.until(EC.element_to_be_clickable((By.ID, "firstname"))).send_keys(firstname, Keys.TAB)
            logger.fname("First Name: " + f"{firstname}")
            wait.until(EC.element_to_be_clickable((By.ID, "email"))).send_keys(email, Keys.TAB)
            logger.email(f"E-mail: {email}")
            wait.until(EC.element_to_be_clickable((By.ID, "messagebox"))).send_keys(message, Keys.TAB)
            logger.message(f"Message: {message}")

            # Submit the form and close the current browser instance
            self.browser.find_element(By.ID, "submit-btn").click()
            logger.info("Submitting form")
            title = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "h1"))).text.strip()
            logger.info("Returned page: " + title)
            logger.info("Form submitted. Closing browser")
            time.sleep(3)
            self.browser.close()
        
        except Exception:
            logger.error("Form could not be loaded. Closing browser\n")
            self.browser.close()
            print(traceback.format_exc())
