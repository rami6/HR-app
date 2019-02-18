# HR-app
[Portfolio] Back-end focused web app. Django REST Framework + simple UI with Vue.js

## Features
User can add/view/edit/delete employees' information depending on their permission.

||Superuser|Regular user|
|--------|:---------:|:----------:|
|Add|○|×|
|View|○|○|
|Edit|○|×|
|Delete|○|×|

### Home

[Superuser]
<img width="1228" alt="screen shot 2019-02-17 at 3 37 52 pm" src="https://user-images.githubusercontent.com/30137645/52921278-3aa22c00-32ca-11e9-93d6-f68826dddf15.png">

[Regular user]
<img width="1214" alt="screen shot 2019-02-17 at 3 36 32 pm" src="https://user-images.githubusercontent.com/30137645/52921236-d5e6d180-32c9-11e9-8f1c-cb5f9a482e43.png">

- Search by name.
- Filter by departments and/or status.
- Only superuser can see "Add employee button" and "Manage departments link".


### Add Employee
[Superuser]

<img width="1193" alt="screen shot 2019-02-17 at 2 53 08 pm" src="https://user-images.githubusercontent.com/30137645/52921066-fb72db80-32c7-11e9-9903-0545412d0ed0.png">

[Regular user]

N/A

- Auto complete field for a job title.
- Jump to a view for managing job titles by clicking the link.


### View and Edit Employee 
[Superuser]

<img width="1175" alt="screen shot 2019-02-17 at 2 47 35 pm" src="https://user-images.githubusercontent.com/30137645/52921478-87870200-32cc-11e9-948d-62e620740485.png">

[Regular user]

<img width="1207" alt="screen shot 2019-02-17 at 5 00 01 pm" src="https://user-images.githubusercontent.com/30137645/52922468-61fef600-32d6-11e9-810d-0471941153c2.png">

- Read only for regular user.

### Manage Departments / Job Titles
[Superuser]

<img width="1126" alt="screen shot 2019-02-17 at 2 54 38 pm" src="https://user-images.githubusercontent.com/30137645/52921548-26136300-32cd-11e9-9898-fb36004741d1.png">

(The view for managing job titles is similar to the manage departments view above.)

[Regular user]

N/A


