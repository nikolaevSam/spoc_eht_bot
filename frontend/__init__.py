import telebot
import requests
from telebot import types

bot = telebot.TeleBot("7751552042:AAFgqPQZFJvlIIr26wxxxqahCZv1XCzP7yc")

dataBaseLink = 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm?path=%2F04_DB'
sisLink = 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm?path=%2F10_SIS'
modules_url = 'http://localhost:3000/modules'
module_url = 'http://localhost:3000/modules/module'
circuit_url = 'http://localhost:3000/circuits'
modules = requests.get(modules_url)

main_keyboard = types.ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
modules_button = types.KeyboardButton('/modules')
db_button = types.KeyboardButton('/database')
sis_button = types.KeyboardButton('/sis')
info_button = types.KeyboardButton('/info')
main_keyboard.add(modules_button,db_button,sis_button,info_button)

module_keyboard = types.InlineKeyboardMarkup()
for module in modules.json():
    module_keyboard.add(types.InlineKeyboardButton(text=module['name'], callback_data=module['name']))

@bot.message_handler(commands=['start'])
def welcome_handler(message):
    bot.send_message(message.chat.id, 'Welcome to SPOC EHT Bot!', reply_markup=main_keyboard)

@bot.message_handler(commands=['modules'])
def modules_handler(message):
    bot.send_message(message.chat.id, 'LIST TO MODULES:', reply_markup=module_keyboard)

@bot.message_handler(commands=['database'])
def db_handler(message):
    bot.send_message(message.chat.id, f'LINK TO DATABASE:\n{dataBaseLink}')

@bot.message_handler(commands=['sis'])
def sis_handler(message):
    bot.send_message(message.chat.id, f'LINK TO SIS:\n{sisLink}')

@bot.message_handler(commands=['info'])
def info_handler(message):
    bot.send_message(message.chat.id, 'SPOC EHT Team:\nArtem Ponomarev\nemail@ya.ru\nAnton Evstigneev\nemail@ya.ru\nNikolai Nikolaev\nemail@ya.ru')

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
def circuits_handler(message):
    circuit = requests.get(circuit_url, data={'name': f'{message.text}'})
    if circuit.status_code == 404:
        bot.send_message(message.chat.id, 'Enter correct circuits number')
    elif circuit.status_code == 200:
        circuit_data = {
            'iso': circuit.json()['iso'],
            'cwd': circuit.json()['cwd'],
            'layout': circuit.json()['layout'],
            'pcl': circuit.json()['pcl'],
        }
        
        ckt_module = circuit.json()['module']
        ckt_deck = circuit.json()['deck']
        ckt_mb = circuit.json()['mb']
        ckt_mb_msp = circuit.json()['mbmsp']
        ckt_ta = circuit.json()['ta']
        ckt_ta_msp = circuit.json()['tamsp']
        ckt_rtd01 = circuit.json()['rtd01']
        ckt_rtd02 = circuit.json()['rtd02']
        ckt_jb = circuit.json()['jbtag']
        ckt_eht_cable = circuit.json()['ehtcable']
        
        circuit_keyboard = types.InlineKeyboardMarkup()
        ckt_iso_button = types.InlineKeyboardButton(text='ISO', url=circuit_data['iso'])
        ckt_layout_button = types.InlineKeyboardButton(text='LAYOUT', url=circuit_data['layout'])
        ckt_cwd_button = types.InlineKeyboardButton(text='CWD', url=circuit_data['cwd'])
        ckt_pcl_button = types.InlineKeyboardButton(text='CABLE LIST', url=circuit_data['pcl'])
        circuit_keyboard.add(ckt_iso_button)
        circuit_keyboard.add(ckt_layout_button)
        circuit_keyboard.add(ckt_cwd_button, ckt_pcl_button)
        bot.send_message(message.chat.id, circuit.json()['circuit'], reply_markup=circuit_keyboard)
        bot.send_message(message.chat.id, f'MODULE: {ckt_module} (DECK {ckt_deck})\n\nJB: {ckt_jb}\n\nEHT CABLE: {ckt_eht_cable}')
        bot.send_message(message.chat.id, f'MB: {ckt_mb}\n\nMSP: {ckt_mb_msp}')
        bot.send_message(message.chat.id, f'TA: {ckt_ta}\n\nMSP: {ckt_ta_msp}')
        bot.send_message(message.chat.id, f'RTD01: {ckt_rtd01}\n\nRTD02: {ckt_rtd02}')

bot.polling(none_stop=True, interval=0)
