import os
import sys
import requests
import PyPDF2
from flask import redirect, url_for, request, abort, jsonify
from werkzeug.utils import secure_filename


def handle_conversion_to_csv():
    # month and header to skip, just to get the data from pdf files (bank statement.pdf)
    # and prevent duplicates text

    # file = request.files['file name']

    skip_header_lines = [
        "DATE",
        "DESCRIPTION",
        "CATEGORY",
        "AMOUNT",
        "BALANCE"
    ]

    skip_month_lines = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    # will come back to rename file

    with open("/home/jonathan/Documents/expenses-calculator/server/output.csv", 'wb') as output:
        # transforming str to byte, so python could read pdf file
        header = "DATE DESCRIPTION CATEGORY AMOUT BALANCE\n".encode()
        # print(header)
        output.write(header)

        # will come back to rename file after upload
        with open(
                "/home/jonathan/Documents/expenses-calculator/server/statement.pdf", 'rb') as file:
            fileReader = PyPDF2.PdfReader(file)
            pageNum = fileReader.pages
            for page in pageNum:
                # print(page)
                text = page.extract_text()

                for line in text.split("\n"):
                    print(line)
                    name = line.split(" ")
                    print(line.split(" "))
                    print(line.strip())

                    if line.split(" ") == skip_header_lines:
                        continue
                    if line.split(" ")[0] == skip_month_lines[0]:
                        output.write(
                            "\n".encode()+" ".join(line.split()).encode())
                        continue

                    if line.split(" ")[0] == 'Fees':
                        # file.close()
                        continue

    return jsonify({"data": "contents"})


def upload_pdf_file():
    file = request.files['file']

    if file:
        file.save(secure_filename(file.filename))
        return jsonify({"message": "success!"})
    else:
        return jsonify({"message": "error"})
