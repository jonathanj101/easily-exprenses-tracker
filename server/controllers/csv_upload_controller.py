import pandas as pd
from pathlib import Path
from flask import request,  jsonify
from werkzeug.utils import secure_filename

from config import basedir


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
        f"{basedir}/{filename}")
    # print(df)

    # columns name
    names = df['NAME']
    values = df["VALUE"]
    descriptions = df["DESCRIPTIONS"]

    # data to return
    data_to_return = []

    # will come back and refactor this piece of block
    for index in range(len(df)):
        for name in names:
            break
        for value in values:
            break
        for description in descriptions:
            break

        data_to_return.append({
            'name': name,
            'description': description,
            'value': value
        })

    return data_to_return
