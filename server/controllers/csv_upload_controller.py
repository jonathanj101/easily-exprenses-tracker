import pandas as pd
from pathlib import Path
from flask import request,  jsonify, json
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
        except TypeError as e:
            # print(e)
            return jsonify({"message": "Error while saving file! Please make sure your file contents have columns as follow: NAME, VALUE, DESCRIPTION, DATE"})
    return jsonify({"message": "Some error occurred!"})


def read_csv_file(file, filename):
    # print(file)
    df = pd.read_csv(
        f"{basedir}/{filename}")

    # columns name
    names = df['NAME']
    amounts = df["AMOUNT"]
    descriptions = df["DESCRIPTION"]
    dates = df["DATE"]

    # data to return
    data_to_return = []

    for index in range(len(df)):

        data_to_return.append({
            'name': list(names.values)[index],
            'description': list(descriptions.values)[index],
            'amount': list(amounts.values)[index],
            'date': list(dates.values)[index]
        })

    # numpy or pd returns data as int64 which caused an error when returning data to other server as jsonify can't handle this data type to convert to json, only accepts regular python int data type. hints serialize data

    # below would converts from int64 to regular int data type and return it as string
    data_to_return = json.dumps(data_to_return, indent=2, default=int)

    # json loads would converts string data to regular python data type (in this case dictionary or list)
    return json.loads(data_to_return)
