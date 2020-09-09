

export const PrintLayout = (Data) => {
    let layout = []
    if (Data.header) {
        const Header = {
            type: 'text',
            value: Data.header,
            style: `text-align:center;`,
            css: { "font-weight": "700", "font-size": "18px" }
        }
        layout.push(Header)
    }
    if (Data.subHeader) {
        const SubHeader = {
            type: 'text',
            value: Data.subHeader,
            style: `text-align:center;`,
            css: { "font-weight": "300", "font-size": "14px" }
        }
        layout.push(SubHeader)
    }
    if (Data.DateTime) {
        const Datetime = {
            type: 'text',
            value: Data.DateTime,
            style: `text-align:center;`,
            css: { "font-weight": "300", "font-size": "10px" }
        }
        layout.push(Datetime)
    }
    //generator.generate(10)
    if (Data.barCode) {
        const BarCode = {
            type: 'barCode',
            value: Data.barCode,
            style: `text-align:center; justify-items: center; justify-content: center; align-items: center;`,
            position: 'center',
            height: 12,
            width: 1,
            displayValue: true,
            fontsize: 8,
        }
        layout.push(BarCode)
    }
    if (Data.tableHeader && Data.tableBody ) {
        const body = []
        Data.tableBody.forEach(element => {
            body.push([element.Item , element.Qnt])
        });
        const Table = {
            type: 'table',
            style: 'border: 1px solid #00000000',
            tableHeader: Data.tableHeader ,
            tableBody: body ,

            tableHeaderStyle: 'background-color: #00000000; color: black;',

            tableBodyStyle: 'border: 0.5px solid #00000000; color: black;',
        }

        layout.push(Table)
    }

    return layout
}