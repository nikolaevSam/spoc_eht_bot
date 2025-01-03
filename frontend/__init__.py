import telebot;
from telebot import types;
from utils import data_base;
from utils import users;

bot = telebot.TeleBot('7751552042:AAFgqPQZFJvlIIr26wxxxqahCZv1XCzP7yc')

@bot.message_handler(commands=['start'])
def handler_start(message):
    bot.send_message(message.chat.id, 'Welcome to SPOC Electrical Heat Tracing bot!')

@bot.message_handler(commands=['help'])
def handler_help(message):
    bot.send_message(message.chat.id, 'SPOC EHT Bot can: \n1.Find EHT circuits information;\n2.Find module documentation.\n\nChoose Module or EHT circuits.')

@bot.message_handler(commands=['module'])
def handler_module(message):
    module_keyboard = types.InlineKeyboardMarkup()
    for i in data_base.module:
        key_info = types.InlineKeyboardButton(text=f"{i}", callback_data='info')
        module_keyboard.add(key_info)
    bot.send_message(message.chat.id, 'List of modules:', reply_markup=module_keyboard)

@bot.message_handler(content_types=['text'])
# def handler_request(message):
#     bot.send_message(message.chat.id, 'asdad')


def handler_circuit(message):
    if message.text == data_base.circuit_data['id']:
        keyboard = types.InlineKeyboardMarkup()
        key_info = types.InlineKeyboardButton(text='Circuit info', callback_data='info')
        keyboard.add(key_info)
        key_iso = types.InlineKeyboardButton(text='ISO', callback_data='iso')
        keyboard.add(key_iso)
        key_cwd = types.InlineKeyboardButton(text='CWD', callback_data='cwd')
        keyboard.add(key_cwd)
        key_layout = types.InlineKeyboardButton(text='LAYOUT', callback_data='layout')
        keyboard.add(key_layout)
        key_sld = types.InlineKeyboardButton(text='PCL', callback_data='pcl')
        keyboard.add(key_sld)
        bot.send_message(message.chat.id, 'Choose information for view:', reply_markup=keyboard)
    else:
        bot.send_message(message.from_user.id, 'Incorrect number of EHT circuit!')

@bot.callback_query_handler(func=lambda call: True)

def callback_worker(call):
    if call.data == 'iso':
        iso_link = data_base.circuit_data['iso']
        bot.send_message(call.message.chat.id, iso_link)
    elif call.data == 'cwd':
        cwd_link = data_base.circuit_data['cwd']
        bot.send_message(call.message.chat.id, cwd_link)
    elif call.data == 'layout':
        layout_link = data_base.circuit_data['layout']
        bot.send_message(call.message.chat.id, layout_link)
    elif call.data == 'pcl':
        pcl_link = data_base.circuit_data['pcl']
        bot.send_message(call.message.chat.id, pcl_link)
    elif call.data == 'info':
        bot.send_message(call.message.chat.id, f"Module: {data_base.circuit_data['module']}\nDECK: {data_base.circuit_data['deck']}\nMarshalling box: {data_base.circuit_data['mb_tag']}\n({data_base.circuit_data['mb_msp_tag']})\nController: {data_base.circuit_data['ngc20_tag']}\n({data_base.circuit_data['ngc20_msp_tag']})\nRTD01: {data_base.circuit_data['rt01_tag']}\nRTD02: {data_base.circuit_data['rt02_tag']}\nJunction box: {data_base.circuit_data['jb_tag']}\nEHT Type: {data_base.circuit_data['eht_type']}")

bot.polling(none_stop=True, interval=0)