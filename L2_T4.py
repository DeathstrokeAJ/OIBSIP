import tkinter as tk
from tkinter import messagebox

# Dictionary to store registered users' credentials (username: password)
users = {}

def register():
    username = entry_username.get()
    password = entry_password.get()

    if username in users:
        messagebox.showerror("Error", "Username already exists!")
    else:
        users[username] = password
        messagebox.showinfo("Success", "Registration successful! You can now login.")

def login():
    username = entry_username.get()
    password = entry_password.get()

    if username in users and users[username] == password:
        messagebox.showinfo("Success", f"Welcome, {username}! This is a secured page.")
        root.destroy()
    else:
        messagebox.showerror("Error", "Invalid username or password.")

root = tk.Tk()
root.title("Login")

label_username = tk.Label(root, text="Username:")
label_password = tk.Label(root, text="Password:")
entry_username = tk.Entry(root)
entry_password = tk.Entry(root, show="*")  # Show asterisks for password

button_register = tk.Button(root, text="Register", command=register)
button_login = tk.Button(root, text="Login", command=login)

label_username.pack()
entry_username.pack()
label_password.pack()
entry_password.pack()
button_register.pack()
button_login.pack()

root.mainloop()
