
1) create the app
2) create a git repo
3) setup css
    -add boostrap 3
    -add font awesome
4) add components, at minimum
    -an app component
    -messages component
    -a message component
    -toolbar componenent
5) add basic functionality
    -star and unstar
    -select and unselect
    -read and unread
6) add bulk functionality
    -select and unselect all messages
    -marking messages as read
7) additional
    -add labels
    -delete messages
    -remove labels
    -unread message count
8) Select all button state
    -load messages from the server
    -actions should update server side
9)message composability

###Stories
When a user views the app
1) Then they should see a list of messages with their subjects
2) If the message is read, it should have the read style
3) If the message is unread, it should have the unread
4) If the message is selected, it should have the selected style and the box should be checked
5) If there are labels on a message, they should appear
6) If the message is starred, then the star should be filled in, otherwise it should be empty


#Add API Requests (get/post/patch)
GET ALL - GET http://localhost:8082/api/messages
GET ONE - GET http://localhost:8082/api/messages/:id
ADD ONE - POST http://localhost:8082/api/messages
UPDATE ONE - PATCH http://localhost:8082/api/messages

