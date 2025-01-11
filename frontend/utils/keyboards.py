from telebot import types
mainKeyboard = types.ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
moduleButton = types.KeyboardButton("Module")
dataBaseButton = types.KeyboardButton("DataBase")
sisButton = types.KeyboardButton("SIS/SI")
infoButton = types.KeyboardButton("Info")
mainKeyboard.add(moduleButton,dataBaseButton,sisButton,infoButton)