from flask import Blueprint

from controllers.csv_upload_controller import upload_csv_file  # get_csv_files

csv_upload_bp = Blueprint("csv_upload_bp", __name__)

csv_upload_bp.route("/upload-csv", methods=["POST"])(upload_csv_file)

# csv_upload_bp.route("/get-csv-files", methods=["GET"])(get_csv_files)
