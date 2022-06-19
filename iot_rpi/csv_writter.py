from mail import sendmail
from csv import writer


def append_csv(file_name, data):

    with open(file_name, 'a') as write_obj:
        csv_writer = writer(write_obj)
        csv_writer.writerow(data)

    print("[INFO] Row Updated \n[MSG] File name: {}" .format(file_name))


def sendreport():
    file_name1 = "my_database.csv"
    subject = "Updated Report {}" .format(file_name1)
    path_name = "/home/pi/groot/mspy/{}" .format(file_name1)
    body_message = " Check the attachment below for detailed logs \n File Name: Report {}" .format(
        file_name1)
    sendmail(subject, file_name1, path_name, body_message)
