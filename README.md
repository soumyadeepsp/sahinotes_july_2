# SahiNotes 

## Functionalities - 
1. user should be able to signup/signin using email and password auth.
2. user should be able to signup/signin using google auth.
3. user should be able to verify his/her mobile number.
4. user should be able to reset password using his email.
5. user should be able to reset password using his mobile number if it is verified.
6. user should be able to upload pdf notes in their profile.
7. user should be able to view pdf notes uploaded by another user.
8. user should be able to like their own as well as another user's notes.
9. user should be able to remove their like from a liked notes.
10. user should be ablt to comment on their own as well as another user's notes.
11. user should receive emails while signing up.
12. server should be able to prioritise jobs(won't require APIs).
13. user should be able to logout of the website.
14. share notes via copying URLs(won't require APIs).
15. user should be able to download the pdf notes(won't require APIs).
16. previews of pdf notes should be visible to the user.
17. user should be able to save the pdf notes in their profile using localstorage and database(won't require APIs).


## APIs
1. /users/auth/signup
req - name, email id, password

2. /users/auth/signin
req - email id, password

3. /users/auth/mobile/sendotp
req - mobile

4. /users/auth/mobile/verifyotp
req - otp

5. /users/auth/mobile/deleteotp

6. /users/auth/password_reset

7. /users/auth/password_update
req - new password, confirm password

8. /users/notes/upload
req - name, about, file

9. /users/notes/view/?note_id=note_id
res - name, about, comments, likes, file, author name, preview image

10. /users/likes/like/?note_id=note_id

11. /users/likes/unlike/?note_id=note_id

12. /users/comments/add_comment/?note_id=note_id&type=notes

13. /users/comments/add_comment/?comment_id=comment_id&type=comments

14. /users/emails/new_signup/?email=email

15. /users/auth/logout

16. /users/notes/preview/?note_id=note_id


## Models
1. User - name, email, password, list of liked notes, list of comments, notes, mobile, otp

2. Notes - name, about, file path, preview image path, user id, list of likes, list of first level comments

3. Comments - text, list of child comments, notes id, comment id, type, user id