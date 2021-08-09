import smtplib
from email.message import EmailMessage
import sys
import os
from twilio.rest import Client

def email_not(subject, body, to):
    user = "anycodetester@gmail.com"
    password = "hordumtggcgworwu"

    msg = EmailMessage()
    msg.set_content(body)
    msg['subject'] = subject
    msg['to'] = to
    msg['from'] = user

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password)
    server.send_message(msg)
    server.quit()

def sms_not(origin, to, body):
    account_sid = "AC539ae71a3a2e1473daf836a0d9a68b39"
    auth_token = "7334946116a8dcbf59b876a2eb4e49e3"
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        from_ = origin,
        to = to,
        body = body
    )

def main(argv):
    email_not(argv[0], argv[1], argv[2])
    
    sms_not("+14154171985", argv[3], argv[2])



if __name__ == '__main__':
    print(sys.argv[1:])
    main(sys.argv[1:])