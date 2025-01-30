import telebot
import requests
from telebot import types

bot = telebot.TeleBot("7751552042:AAFgqPQZFJvlIIr26wxxxqahCZv1XCzP7yc")

dataBaseLink = 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm?path=%2F04_DB'
sisLink = 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm?path=%2F10_SIS'
modules_url = 'http://localhost:3000/modules'
module_url = 'http://localhost:3000/modules/module'
circuit_url = 'http://localhost:3000/circuits'
users_url = 'http://localhost:3000/users'
sises_url = 'http://localhost:3000/sises'
sis_url = 'http://localhost:3000/sises/sis'
modules = requests.get(modules_url)
sises = requests.get(sises_url)
users = requests.get(users_url)

def arr(req_user):
    array = []
    for user in req_user.json():
        array.append(user['name'])
    return array

users_array = arr(users)

module_keyboard = types.InlineKeyboardMarkup()
for module in modules.json():
    module_data_name = module['name']
    module_keyboard.add(types.InlineKeyboardButton(text=module['name'], callback_data=f'module_{module_data_name}'))

sis_keyboard = types.InlineKeyboardMarkup()
for sis in sises.json():
    sis_data_name = sis['name']
    sis_keyboard.add(types.InlineKeyboardButton(text=sis['name'], callback_data=f'sis_{sis_data_name}'))

@bot.message_handler(func=lambda message: message.from_user.username not in users_array)
def check_access(message):
    bot.send_message(message.chat.id, 'За предоставлением доступа к боту\nобратитесь в SPOC EHT\nEmail: SPOC_Electrical_EHT@thebigdipper.com')

@bot.message_handler(commands=['start'])
def welcome_handler(message):
    start_command = types.BotCommand(command='start', description='\U0001F47EЗапустить бота')
    modules_command = types.BotCommand(command='modules', description='\U0001F916Нажмите для получения списка модулей')
    db_command = types.BotCommand(command='database', description='\U0001F5C2Нажмите для получения ссылки на DataBase')
    sis_command = types.BotCommand(command='sis', description='\U0001F4C4Нажмите для получения ссылки на SIS/SI')
    info_command = types.BotCommand(command='info', description='\U0001F9DFКонтакты SPOC EHT')
    bot.set_my_commands([start_command, modules_command, db_command, sis_command, info_command])
    bot.set_chat_menu_button(message.chat.id, types.MenuButtonCommands("Menu"))
    bot.send_message(message.chat.id, f'Привет @{message.from_user.username}!\U0001F44B\nВсе команды бота доступны в меню. Напиши номер греющей цепи в чат для поиска информации.')

@bot.message_handler(commands=['modules'])
def modules_handler(message):
    bot.send_message(message.chat.id, 'Перечень модулей:', reply_markup=module_keyboard)

@bot.message_handler(commands=['database'])
def db_handler(message):
    bot.send_message(message.chat.id, f'Ссылка на DATABASE:\n{dataBaseLink}')

@bot.message_handler(commands=['sis'])
def sis_handler(message):
    bot.send_message(message.chat.id, 'Перечень SIS:', reply_markup=sis_keyboard)
    bot.send_message(message.chat.id, f'Ссылка на папку с SIS:\n{sisLink}')

@bot.message_handler(commands=['info'])
def info_handler(message):
    bot.send_message(message.chat.id, 'SPOC EHT Team:\nArtem Ponomarev\nemail@ya.ru\nAnton Evstigneev\nemail@ya.ru\nNikolai Nikolaev\nemail@ya.ru')

@bot.callback_query_handler(func=lambda call:call.data.startswith('sis_'))
def sis_button_handler(call):
    sis = requests.get(sis_url, data={'name': f'{call.data[4:]}'})
    sis_name = sis.json()['name']
    sis_description = sis.json()['description']
    bot.send_message(call.message.chat.id, f'{sis_name}\n\nОписание:\n{sis_description}')

@bot.callback_query_handler(func=lambda call:call.data.startswith('module_'))
def module_button_handler(call):
    module = requests.get(module_url, data={'name': f'{call.data[7:]}'})
    module_keyboard = types.InlineKeyboardMarkup()
    bom_button = types.InlineKeyboardButton(text='BOM', url=module.json()["bom"])
    cwdhm_button = types.InlineKeyboardButton(text='CWD HM', url=module.json()["cwdHM"])
    cwdhp_button = types.InlineKeyboardButton(text='CWD HP', url=module.json()["cwdHP"])
    iso_button = types.InlineKeyboardButton(text='ISO', url=module.json()["iso"])
    layout_button = types.InlineKeyboardButton(text='LAYOUT', url=module.json()["layout"])
    pclhm_button = types.InlineKeyboardButton(text='CABLE LIST HM', url=module.json()["pclHM"])
    pclhp_button = types.InlineKeyboardButton(text='CABLE LIST HP', url=module.json()["pclHP"])
    setlist_button = types.InlineKeyboardButton(text='SETTING LIST', url=module.json()["setList"])
    module_keyboard.add(iso_button)
    module_keyboard.add(layout_button)
    module_keyboard.add(pclhp_button, cwdhp_button)
    module_keyboard.add(pclhm_button, cwdhm_button)
    module_keyboard.add(setlist_button, bom_button)
    bot.send_message(call.message.chat.id, f'{module.json()["name"]}', reply_markup=module_keyboard)

@bot.message_handler(content_types=['text'])
def circuits_handler(message):
    circuit = requests.get(circuit_url, data={'circuit': f'EHT3-{message.text}'})
    if circuit.status_code == 404:
        bot.send_message(message.chat.id, 'Введите правильный номер цепи в 5 значном формате!')
    elif circuit.status_code == 200:
        circuit_keyboard = types.InlineKeyboardMarkup()
        ckt_iso_button = types.InlineKeyboardButton(text='ISO', url=f'{circuit.json()["iso"]}')
        ckt_layout_button = types.InlineKeyboardButton(text='LAYOUT', url=f'{circuit.json()["layout"]}')
        ckt_cwd_button = types.InlineKeyboardButton(text='CWD', url=f'{circuit.json()["cwd"]}')
        ckt_pcl_button = types.InlineKeyboardButton(text='CABLE LIST', url=f'{circuit.json()["pcl"]}')
        circuit_keyboard.add(ckt_iso_button)
        circuit_keyboard.add(ckt_layout_button)
        circuit_keyboard.add(ckt_cwd_button, ckt_pcl_button)
        bot.send_message(message.chat.id, f'{circuit.json()["circuit"]}')
        bot.send_message(message.chat.id, f'MODULE: {circuit.json()["module"]} (DECK {circuit.json()["deck"]})\n\nJB: {circuit.json()["jb"]}\n\nEHT CABLE: {circuit.json()["ehtcable"]}')
        bot.send_message(message.chat.id, f'MB: {circuit.json()["mb"]}\n\nMSP: {circuit.json()["mbmsp"]}')
        bot.send_message(message.chat.id, f'TA: {circuit.json()["ta"]}\n\nMSP: {circuit.json()["tamsp"]}')
        bot.send_message(message.chat.id, f'RTD01: {circuit.json()["rtd01"]}\n\nRTD02: {circuit.json()["rtd02"]}')
        bot.send_message(message.chat.id, 'DOCUMENTS:', reply_markup=circuit_keyboard)

bot.polling(none_stop=True, interval=0)
