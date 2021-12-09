# Developer Test: Build a simple Kanban Board app with Blitz JS 

## Instructions
You will build a blitz.js app (please do not use any other framework)

The goal is to build a simple kanban board for tasks with blitz.js
A mockup of the desired application can be viewed here: https://www.figma.com/file/0xJQoSwac1czDBWqR5rMz4/Simple-Kanban-App?node-id=0%3A1

### Suggetsed Steps:
0. fork this repository
1. Create a new [blitzjs](https://blitzjs.com/) application in a folder called 'app'

 ```bash
$ yarn global add blitz  
$ blitz new app
 ```

2. Generate two models: “Deal” and “Board”

```bash
$ blitz generate all deals
$ blitz generate all board
```

3. Extend the Task data model to match the following schema:

```javascript
>   id         
>   createdAt  
>   updatedAt  
>   title       
> 	description
>   assigned_to
> 	status
>   dueDate
>   Board
```
Please note that “Board” should be a 1-1 relation to the Board model 

4. Extend the Board data model to match the following schema:
```javascript
>   id         
>   createdAt  
>   updatedAt  
>   title       
> 	description
>   Deals
```
Please note that "Deals" should be a 1 to many relation to the Deal model 

5. Create a user and some dummy data for testing (consider using https://blitzjs.com/docs/database-seeds)

6. Use tailwind for styling and update the JavaScript files under app/app/tasks and to match the look and feel of the mockup prototype: https://www.figma.com/file/0xJQoSwac1czDBWqR5rMz4/Simple-Kanban-App?node-id=0%3A1

7. Install react-beautiful-dnd in the project (https://github.com/atlassian/react-beautiful-dnd) 

8. Create a page with a kanban board similar to the one in the mockup ( https://www.figma.com/file/0xJQoSwac1czDBWqR5rMz4/Simple-Kanban-App?node-id=0%3A1) using tailwindcss for styling and react-beautiful-dnd for the drag and drop functionality.

9. Automatically update the status of the deal when the deal is being dropped into another lane on the board
10. commit your code and push to new branch named "final"
