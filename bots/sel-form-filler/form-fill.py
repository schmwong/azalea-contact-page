# Prevent generation of .pyc cache files
import sys

sys.dont_write_bytecode = True

from formlogger import FormLogger


form_url = "https://schmwong.github.io/azalea-contact-page/mvp/"

"""
Short lists for initial testing, will eventually import from SQL or csv
"""
names = ["Vito", "Eddard"]
emails = ["don@gencopura.co", "ned@stark.nor.wi"]
message = "Hello there"


if __name__ == "__main__":
    for name, email in zip(names, emails):
        form = FormLogger(form_url)
        form.fillform(name, email, message)
