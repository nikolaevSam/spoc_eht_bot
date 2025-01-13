import telebot
import requests
from telebot import types
from utils import keyboards
from utils import constants

bot = telebot.TeleBot("7751552042:AAFgqPQZFJvlIIr26wxxxqahCZv1XCzP7yc")

modules_url = 'http://localhost:3000/modules'
module_url = 'http://localhost:3000/modules/module'
circuit_url = 'http://localhost:3000/circuits'
modules = requests.get(modules_url)

main_keyboard = types.ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
modules_button = types.KeyboardButton("MODULES")
db_button = types.KeyboardButton("DATABASE")
sis_button = types.KeyboardButton("SIS/SI")
info_button = types.KeyboardButton("INFO")
main_keyboard.add(modules_button,db_button,sis_button,info_button)

module_keyboard = types.InlineKeyboardMarkup()
for module in modules.json():
    module_keyboard.add(types.InlineKeyboardButton(text=module['name'], callback_data=module['name']))

@bot.message_handler(commands=['start'])
def welcome_handler(message):
    bot.send_message(message.chat.id, 'Welcome to SPOC EHT Bot!!!\nChoose:', reply_markup=main_keyboard)

@bot.callback_query_handler(func=lambda call:True)
def module_button_handler(call):
    module = requests.get(module_url, data={'name': f'{call.data}'})
    module_data = {
        'name': module.json()['name'],
        'BOM': module.json()['bom'],
        'CALC': module.json()['calculation'],
        'CWDHM': module.json()['cwdHM'],
        'CWDHP': module.json()['cwdHP'],
        'ISO': module.json()['iso'],
        'LAYOUT': module.json()['layout'],
        'PCLHM': module.json()['pclHM'],
        'PCLHP': module.json()['pclHP'],
        'SETLIST': module.json()['setList'],
    }
    module_keyboard = types.InlineKeyboardMarkup()
    bom_button = types.InlineKeyboardButton(text='BOM', url=module_data['BOM'])
    cwdhm_button = types.InlineKeyboardButton(text='CWD HM', url=module_data['CWDHM'])
    cwdhp_button = types.InlineKeyboardButton(text='CWD HP', url=module_data['CWDHP'])
    iso_button = types.InlineKeyboardButton(text='ISO', url=module_data['ISO'])
    layout_button = types.InlineKeyboardButton(text='LAYOUT', url=module_data['LAYOUT'])
    pclhm_button = types.InlineKeyboardButton(text='CABLE LIST HM', url=module_data['PCLHM'])
    pclhp_button = types.InlineKeyboardButton(text='CABLE LIST HP', url=module_data['PCLHP'])
    setlist_button = types.InlineKeyboardButton(text='SETTING LIST', url=module_data['SETLIST'])
    module_keyboard.add(iso_button)
    module_keyboard.add(layout_button)
    module_keyboard.add(pclhp_button, cwdhp_button)
    module_keyboard.add(pclhm_button, cwdhm_button)
    module_keyboard.add(setlist_button, bom_button)
    bot.send_message(call.message.chat.id, module_data['name'], reply_markup=module_keyboard)

@bot.message_handler(content_types=['text'])
def choose_handler(message):
    if message.text == 'MODULES':
        bot.send_message(message.chat.id, 'List of Modules:', reply_markup=module_keyboard)
    elif message.text == 'DATABASE':
        bot.send_message(message.chat.id, f'Link to DataBase:\n{constants.dataBaseLink}')
    elif message.text == 'SIS/SI':
        bot.send_message(message.chat.id, f'Link to SIS nad SI:\n{constants.sisLink}')
    elif message.text == 'INFO':
        bot.send_message(message.chat.id, f'{constants.infoText}')

bot.polling(none_stop=True, interval=0)
