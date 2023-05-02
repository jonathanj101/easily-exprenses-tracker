import pandas as pd
from pathlib import Path
from flask import request,  jsonify
from werkzeug.utils import secure_filename


# def handle_conversion_to_csv():
#     # month and header to skip, just to get the data from pdf files (bank statement.pdf)
#     # and prevent duplicates text

#     # file = request.files['file name']

#     skip_header_lines = [
#         "DATE",
#         "DESCRIPTION",
#         "CATEGORY",
#         "AMOUNT",
#         "BALANCE"
#     ]

#     skip_month_lines = [
#         "Jan",
#         "Feb",
#         "Mar",
#         "Apr",
#         "Jun",
#         "Jul",
#         "Aug",
#         "Sep",
#         "Oct",
#         "Nov",
#         "Dec"
#     ]

#     skip_lines = ['', 'P.O.', 'Box', '60,', 'St.', 'Cloud,', 'MN', '56302', '']

#     page_num_start = ['', 'P.O.', 'Box', '60,',
#                       'St.', 'Cloud,', 'MN', '56302', '']

#     # will come back to rename file
#     rows = []
#     with open("/home/jonathan/Documents/expenses-calculator/server/output.csv", 'wb') as output:
#         # transforming str to byte, so python could read pdf file
#         header = "DATE DESCRIPTION CATEGORY AMOUT BALANCE\n".encode()
#         # print(header)
#         output.write(header)

#         # will come back to rename file after upload
#         with open(
#                 "/home/jonathan/Documents/expenses-calculator/server/statement.pdf", 'rb') as file:
#             fileReader = PyPDF2.PdfReader(file)
#             pageNum = fileReader.pages
#             for page in pageNum:
#                 # print(page)
#                 is_header_lines_past = False
#                 text = page.extract_text()

#                 for line in text.split("\n"):
#                     print(line)
#                     name = line.split(" ")
#                     print(line.split(" "))
#                     print(line.strip())
#                     if is_header_lines_past:
#                         if len(line.split(" ")) > 3:
#                             print(line.split(" ")[2] == "Opening" and line.split(
#                                 " ")[3] == "Balance")
#                             if line.split(" ")[2] == "Opening" and line.split(" ")[3] == "Balance":
#                                 continue

#                             if line.split(" ")[0] == 'Fees':
#                                 # file.close()
#                                 continue

#                             if line.split(" ") == skip_lines:
#                                 continue

#                             output.write(
#                                 "\n".encode()+" ".join(line.split()).encode() + "\n".encode())
#                             continue
#                     if line.split(" ") == skip_header_lines:
#                         is_header_lines_past = True
#                         continue
#                     # is_header_lines_past = False

#                     # continue
#                     # if line.split(" ")[2] == "Opening" and line.split(" ")[3] == "Balance":
#                     #     continue
#                     # else:
#                     #     if line.split(" ")[0] == 'Fees':
#                     #         # file.close()
#                     #         continue
#                     #     output.write(
#                     #         "\n".encode()+" ".join(line.split()).encode())

#                     # do a for loop on skip month lines to check if month
#                     # or list of line contains a month that it's skip_month_lines
#                     # if it is then write line into output file
#                     # print(len(line.split(" ")))
#                     # if line.split(" ")
#                     # if len(line.split(" ")) > 4 and line.split(" ")[2] == "Opening":
#                     # print(line.split(" ")[2] == "Opening" and line.split(
#                     #     " ")[3] == "Balance")
#                     # prevents getting the first line or row with no category and amount
#                     # continue
#                     # if line.split(" ")[2] == "Opening" and line.split(" ")[3] == "Balance":
#                     #     continue
#                     #     # if line.split(" ")[0] == skip_month_lines[0]:
#                     # for item in skip_month_lines:
#                     #     if line.split(" ")[0] == item:
#                     #         if line.split(" ")[3] == "Balance":
#                     #             continue
#                     #         output.write(
#                     #             "\n".encode()+" ".join(line.split()).encode())

#                     #         # if line.split(" ")[2] == "Opening" and line.split(" ")[3] == "Balance"
#                     #         break
#                     # if line.split(" ")[0] == 'Fees':
#                     #     # file.close()
#                     #     continue

#     return jsonify({"data": "contents"})


# def upload_pdf_file():
#     file = request.files['file']

#     if file:
#         file.save(secure_filename(file.filename))
#         return jsonify({"message": "success!"})
#     else:
#         return jsonify({"message": "error"})

def upload_csv_file():
    file = request.files["file"]

    if file:
        try:
            file.save(secure_filename(file.filename))
            try:
                print(f"{Path(__file__).resolve().parent.parent}/{file.filename}")
                with open(f"{Path(__file__).resolve().parent.parent}/{file.filename}", 'r') as f:

                    file_read = read_csv_file(f, file.filename)
                    return jsonify({"message": "success", "data": file_read})

            except FileNotFoundError as error:
                return jsonify({"message": "Error with file! {error}"})

            except IOError as error:
                # print(error)
                return jsonify({"message": f"Error reading file contents! {error}"})
        except:
            return jsonify({"message": "Error while saving file!"})
    return jsonify({"message": "Some error occurred!"})


def read_csv_file(file, filename):
    # print(file)
    df = pd.read_csv(
        f"/home/jonathan/Documents/expenses-calculator/server/{filename}")
    # print(df)

    # columns name
    dates = df["DATE"]
    descriptions = df["DESCRIPTION"]
    categories = df["CATEGORY"]
    amounts = df["AMOUNT"]
    balances = df["BALANCE"]

    data_to_return = []
    # print(date)
    # for index in range(len(df)):
    #     print(df["DATE"][index])

    # will come back and refactor this piece of block
    for index in range(len(df)):
        # print(index)

        for date in dates:
            # print(date)
            break
        for description in descriptions:
            # print(description)
            break
        for category in categories:
            # print(category)
            break
        for amount in amounts:
            # print(amount)
            break
        for balance in balances:
            # print(balance)
            break

        data_to_return.append({
            "date": date,
            "description": description,
            "category": category,
            "amount": amount,
            "balance": balance
        })

    return data_to_return
