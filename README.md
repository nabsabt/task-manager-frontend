# Task Manager – Client-side

A basic Task Manager Application with real-time data change notification!

---

## 📋 General Info

| | |
|---|---|
| **Framework** | Angular v22.2 |
| **Socket communication** | ngx-socket-io v4.11.1 |
| **Styling** | Tailwind CSS v4.1.12 |

For responsive navbar/table, my own components were used. Check them here, if want (careful, it's just a playground, do not expect clean-code):

🔗 [navbar-playground](https://github.com/nabsabt/navbar-playground)

---

## 🚀 To Launch the App

1. Pull repo.
2. Run `npm i`.
3. Run `ng serve` or `npx ng serve` (depending on what you use).
4. Enjoy!

---

## 📁 Project Structure

The folder structure does not follow the popular angular-way. Each folder contains components/files, which has similar purposes:

| Folder | Description |
|---|---|
| **core** | Contains singleton services and components, which are being used independent from what page is being loaded at that moment. |
| **login** | Contains the login panel only. |
| **navbar** | Responsive, user-friendly navigation bar, being pulled from my other repo. |
| **tasks** | Task-table, where tasks are being listed, and manage-task, where task editing/deleting/new task creating happens. |

The media content (icons, mostly) is stored in the `/public` folder.

---

## 🤖 AI Disclosure

Code is written without AI, but AI helped me in the followings:

- Styling (what colors to use, button style definitions).
- Configuring the SocketService.
- Configuring the table template (`keyvalue: null` in `@for` directive was not my idea :( ).
- Styling this beautiful README.
