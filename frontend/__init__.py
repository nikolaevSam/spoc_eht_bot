import telebot
import requests
from telebot import types
from utils import keyboards
from utils import constants

# modulesUrl = 'http://localhost:3000/modules'

# circuitsUrl = 'http://localhost:3000/circuits'

# modulesRes = requests.get(modulesUrl, data={'name': '3-TMS-003'})
# circuitsRes = requests.get(circuitsUrl, data={'name': '95125'})

bot = telebot.TeleBot("7751552042:AAFgqPQZFJvlIIr26wxxxqahCZv1XCzP7yc")

moduleKeyboard = types.ReplyKeyboardMarkup(row_width=3, resize_keyboard=True)
btn1 = types.KeyboardButton("module")
btn2 = types.KeyboardButton("module")
btn2 = types.KeyboardButton("module")
btn3 = types.KeyboardButton("module")
bt4 = types.KeyboardButton('Back to Menu')
moduleKeyboard.add(btn1,btn2,btn3,bt4)

@bot.message_handler(commands=['start'])
def welcome_handler(message):
    bot.send_message(message.chat.id, 'Welcome to SPOC EHT Bot!!!\nChoose:', reply_markup=keyboards.mainKeyboard)

@bot.message_handler(content_types=['Back to Menu'])
def back_handler(message):
    bot.send_message(message.chat.id, 'Main menu.', reply_markup=keyboards.mainKeyboard)

@bot.message_handler(content_types=['text'])
def choose_handler(message):
    if message.text == 'Back to Menu':
        back_handler(message)
    elif message.text == 'Module':
        bot.send_message(message.chat.id, 'List of Modules:', reply_markup=moduleKeyboard)
    elif message.text == 'DataBase':
        bot.send_message(message.chat.id, f'Link to DataBase:\n{constants.dataBaseLink}')
    elif message.text == 'SIS/SI':
        bot.send_message(message.chat.id, f'Link to SIS nad SI:\n{constants.sisLink}')
    elif message.text == 'Info':
        bot.send_message(message.chat.id, f'{constants.infoText}')

bot.polling(none_stop=True, interval=0)
