import React, { useContext } from 'react';
import Statusbutton from '../../LayoutManeger/StatusButton'
import { DataContext } from '../../../LocalDB'
import { ClientHandeler } from '../../../LocalDB/ClientDB'
import { isElectron } from 'react-device-detect'

if (isElectron) {
    var { PosPrinter } = window.require('electron').remote.require("electron-pos-printer");
}

const Kot = (Data) => {
    const generator = require('generate-serial-number');
    const kotData = []
    Data.forEach(element => {
        kotData.push([element.Name, element.cartQnt])
    });
    return [
        {
            type: 'text',
            value: 'KOT',
            style: `text-align:center;`,
            css: { "font-weight": "700", "font-size": "18px" }
        }, {
            type: 'barCode',
            value: generator.generate(10),
            style: `text-align:center; justify-items: center; justify-content: center; align-items: center;`,
            position: 'center',
            height: 12,
            width: 1,
            displayValue: true,
            fontsize: 8,
        }, {
            type: 'table',
            style: 'border: 1px solid #00000000',
            tableHeader: ['Item', 'Qnt'],
            tableBody: kotData,

            tableHeaderStyle: 'background-color: #00000000; color: black;',

            tableBodyStyle: 'border: 0.5px solid #00000000; color: black;',

            // tableFooterStyle: 'background-color: #00000000; color: white;',
        }
    ]
}




const ActionButton = () => {
    const { addItem } = useContext(DataContext)
    const { Cart, selectClient } = useContext(ClientHandeler)
    const selectCart = Cart[selectClient._id]
    const Data = { [selectClient._id]: selectCart }
    const option = {
        preview: true,
        width: '170px',
        margin: '0 0 0 0',
        copies: 1,
        printerName: 'XP-80C'
    }
    const SaveCart = () => {
        addItem('Cart', Data).then(() => {
            PosPrinter.print(Kot(selectCart), option)
                .then(() => {console.log('print sucsess'); })
                .catch((error) => {
                    console.error(error);
                });
        })
    }

    return (
        <div>
            <Statusbutton
                label='Print Kot'
                onClick={() => SaveCart()}
            />
            <Statusbutton
                label='Print Bill'
            />
            <Statusbutton
                label='Sattelment'
            // onClick={}
            />
        </div>
    )

}

export default ActionButton;