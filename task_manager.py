import customtkinter as ctk
from tkinter import messagebox

ctk.set_appearance_mode("light")
ctk.set_default_color_theme("green")


class ShoppingListManager(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("🛒 Shopping List Manager")
        self.geometry("480x680")
        self.resizable(False, False)
        self.items = []

        # Header frame
        header = ctk.CTkFrame(self, fg_color="transparent")
        header.pack(fill="x", padx=20, pady=(18, 0))

        ctk.CTkLabel(header, text="🛒 Shopping List", font=ctk.CTkFont(size=24, weight="bold")).pack(side="left")

        self.mode_switch = ctk.CTkSwitch(header, text="Dark Mode", command=self.toggle_mode, onvalue=1, offvalue=0)
        self.mode_switch.pack(side="right")

        # Counter label
        self.counter_label = ctk.CTkLabel(self, text="0 items in your list", font=ctk.CTkFont(size=13), text_color="gray")
        self.counter_label.pack(anchor="w", padx=24, pady=(6, 2))

        # Input frame
        input_frame = ctk.CTkFrame(self, fg_color="transparent")
        input_frame.pack(fill="x", padx=20, pady=(8, 4))

        self.entry = ctk.CTkEntry(input_frame, placeholder_text="Add an item...", height=40, font=ctk.CTkFont(size=14))
        self.entry.pack(side="left", fill="x", expand=True, padx=(0, 8))
        self.entry.bind("<KeyRelease>", self.on_key)
        self.entry.bind("<Return>", lambda e: self.add_item())

        self.qty_entry = ctk.CTkEntry(input_frame, placeholder_text="Qty", width=60, height=40, font=ctk.CTkFont(size=14))
        self.qty_entry.pack(side="left", padx=(0, 8))
        self.qty_entry.insert(0, "1")

        self.add_btn = ctk.CTkButton(input_frame, text="Add", width=70, height=40, command=self.add_item, state="disabled",
                                      font=ctk.CTkFont(size=14, weight="bold"))
        self.add_btn.pack(side="right")

        # Category selector
        cat_frame = ctk.CTkFrame(self, fg_color="transparent")
        cat_frame.pack(fill="x", padx=20, pady=(4, 8))

        ctk.CTkLabel(cat_frame, text="Category:", font=ctk.CTkFont(size=12)).pack(side="left", padx=(4, 6))
        self.category = ctk.CTkOptionMenu(cat_frame, values=["🍎 Fruits", "🥦 Vegetables", "🥛 Dairy", "🍞 Bakery", "🥩 Meat", "🧴 Household", "📦 Other"],
                                           width=150, height=32)
        self.category.set("📦 Other")
        self.category.pack(side="left")

        # Scrollable item list
        self.list_frame = ctk.CTkScrollableFrame(self, height=340)
        self.list_frame.pack(fill="both", expand=True, padx=20, pady=(0, 4))

        # Bottom buttons
        bottom = ctk.CTkFrame(self, fg_color="transparent")
        bottom.pack(fill="x", padx=20, pady=(4, 6))

        self.clear_btn = ctk.CTkButton(bottom, text="🗑 Clear All", fg_color="#e74c3c", hover_color="#c0392b",
                                        command=self.clear_all, state="disabled", width=120)
        self.clear_btn.pack(side="left")

        self.bought_label = ctk.CTkLabel(bottom, text="", font=ctk.CTkFont(size=12), text_color="gray")
        self.bought_label.pack(side="right", padx=8)

        # Feedback label
        self.feedback = ctk.CTkLabel(self, text="", font=ctk.CTkFont(size=12, slant="italic"), text_color="#27ae60")
        self.feedback.pack(pady=(0, 12))

    def on_key(self, event=None):
        text = self.entry.get().strip()
        self.add_btn.configure(state="normal" if text else "disabled")

    def add_item(self):
        name = self.entry.get().strip()
        if not name:
            return

        qty = self.qty_entry.get().strip()
        if not qty.isdigit() or int(qty) < 1:
            self.show_feedback("⚠ Please enter a valid quantity", "#e74c3c")
            return

        cat = self.category.get()
        item = {"name": name, "qty": int(qty), "category": cat, "bought": False}
        self.items.append(item)

        self.entry.delete(0, "end")
        self.qty_entry.delete(0, "end")
        self.qty_entry.insert(0, "1")
        self.add_btn.configure(state="disabled")
        self.show_feedback(f"✅ Added \"{name}\" x{qty}", "#27ae60")
        self.refresh_list()

    def delete_item(self, index):
        name = self.items[index]["name"]
        if messagebox.askyesno("Confirm", f"Remove \"{name}\" from your list?"):
            self.items.pop(index)
            self.show_feedback(f"🗑 Removed \"{name}\"", "#e74c3c")
            self.refresh_list()

    def toggle_bought(self, index):
        self.items[index]["bought"] = not self.items[index]["bought"]
        status = "bought" if self.items[index]["bought"] else "unbought"
        self.show_feedback(f"Marked \"{self.items[index]['name']}\" as {status}", "#2980b9")
        self.refresh_list()

    def clear_all(self):
        if self.items and messagebox.askyesno("Confirm", "Clear entire shopping list?"):
            self.items.clear()
            self.show_feedback("🗑 List cleared", "#e74c3c")
            self.refresh_list()

    def refresh_list(self):
        for widget in self.list_frame.winfo_children():
            widget.destroy()

        if not self.items:
            ctk.CTkLabel(self.list_frame, text="Your shopping list is empty.\nAdd items above to get started!",
                         font=ctk.CTkFont(size=13), text_color="gray").pack(pady=40)
            self.clear_btn.configure(state="disabled")
            self.counter_label.configure(text="0 items in your list")
            self.bought_label.configure(text="")
            return

        self.clear_btn.configure(state="normal")
        total = len(self.items)
        bought = sum(1 for i in self.items if i["bought"])
        self.counter_label.configure(text=f"{total} item{'s' if total != 1 else ''} in your list")
        self.bought_label.configure(text=f"✓ {bought}/{total} bought")

        for idx, item in enumerate(self.items):
            row = ctk.CTkFrame(self.list_frame, corner_radius=8)
            row.pack(fill="x", pady=3, padx=2)

            cb = ctk.CTkCheckBox(row, text="", width=28, command=lambda i=idx: self.toggle_bought(i))
            if item["bought"]:
                cb.select()
            cb.pack(side="left", padx=(8, 4), pady=8)

            name_text = item["name"]
            if item["bought"]:
                name_text = f"✓ {name_text}"

            name_font = ctk.CTkFont(size=14, overstrike=item["bought"])
            color = "gray" if item["bought"] else None

            info_frame = ctk.CTkFrame(row, fg_color="transparent")
            info_frame.pack(side="left", fill="x", expand=True, pady=6)

            ctk.CTkLabel(info_frame, text=name_text, font=name_font,
                         text_color=color if color else ("gray10", "gray90")).pack(anchor="w")
            ctk.CTkLabel(info_frame, text=f"{item['category']}  •  Qty: {item['qty']}",
                         font=ctk.CTkFont(size=11), text_color="gray").pack(anchor="w")

            del_btn = ctk.CTkButton(row, text="✕", width=32, height=32, fg_color="#e74c3c",
                                     hover_color="#c0392b", command=lambda i=idx: self.delete_item(i))
            del_btn.pack(side="right", padx=8, pady=8)

    def toggle_mode(self):
        mode = "dark" if self.mode_switch.get() else "light"
        ctk.set_appearance_mode(mode)
        self.show_feedback(f"Switched to {mode} mode", "#2980b9")

    def show_feedback(self, msg, color="#27ae60"):
        self.feedback.configure(text=msg, text_color=color)
        self.after(3000, lambda: self.feedback.configure(text=""))


if __name__ == "__main__":
    app = ShoppingListManager()
    app.mainloop()
